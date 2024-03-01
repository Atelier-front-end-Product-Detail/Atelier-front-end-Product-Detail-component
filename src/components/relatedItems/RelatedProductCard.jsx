import React, {useState, useEffect} from 'react';

const RelatedProductCard = ({product_id, bridge, setProductId}) => {

  // Product States
  const [productInfo, setProductInfo] = useState({});
  const [productStyles, setProductStyles] = useState([{}]);
  const [defaultStyle, setDefaultStyle] = useState({});
  const [productPhotos, setProductPhotos] = useState('');
  const [productReviews, setProductReviews] = useState(0);

  // SET INITIAL STATES
  useEffect(() => {
    bridge.productInformation(product_id)
    .then(results => setProductInfo(results.data))
    .catch(error => console.log(`Error: ${error}`));
    bridge.productStyles(product_id)
    .then(results => setProductStyles(results.data.results))
    .catch(error => console.log(`Error: ${error}`));
    bridge.reviewsMeta(product_id)
    .then(results => {
      let result = 0;
      for (let key in results.data.ratings) {
        result += (key * parseInt(results.data.ratings[key]));
      }
      result /= Object.values(results.data.ratings).reduce((acc, curVal) => acc + parseInt(curVal), 0);
      return result;
    })
    .then(results => setProductReviews(results))
    .catch(error => console.log(`Error: ${error}`));
  }, [product_id]);

  // SET DERIVITAVE STATES
  useEffect(() => {
    let newDefaultStyle = productStyles.filter(style => style['default?'] === true)[0] || {};
    if (JSON.stringify(newDefaultStyle) === '{}' && productStyles.length) {newDefaultStyle = productStyles[0]} ;
    setDefaultStyle(newDefaultStyle);
  }, [productStyles]);

  useEffect(() => {
    if (defaultStyle.photos && defaultStyle.photos.length > 0) {
      const thumbnailUrl = defaultStyle.photos[0].thumbnail_url;
      if (thumbnailUrl) {
        setProductPhotos(thumbnailUrl);
      }
    } else {
      setProductPhotos('https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg');
    }
  }, [defaultStyle]);

  return (
    <div className='related_product_card' onClick={() => setProductId(product_id)}>
      <img src={productPhotos} className='product_card_image' alt='product image'></img>
      <p className='product_card_category'>{productInfo.category}</p>
      <span className='product_card_name'>{productInfo.name}:   </span>
      <span className='product_card_extra_text'>{productInfo.slogan}</span>
      {(defaultStyle.sale_price && defaultStyle.sale_price !== null) ?
        (<p className='product_card_sale_price'>
          Price: {defaultStyle.sale_price}
        </p>)
      :
        (<p className='product_card_price'>
          Price: {productInfo.default_price}
        </p>)
      }
      <p className='product_card_reviews'>Reviews: {productReviews}</p>
    </div>
  )
};

export default RelatedProductCard;