import React, {useState, useEffect} from 'react';

const RelatedProductCard = ({product_id, bridge, setProductId}) => {

  const [productInfo, setProductInfo] = useState({});
  const [productStyles, setProductStyles] = useState([{}]);
  const [defaultStyle, setDefaultStyle] = useState({});
  const [productPhotos, setProductPhotos] = useState('');
  const [productPhotoIndex, setProductPhotoIndex] = useState(0);
  const [productReviews, setProductReviews] = useState(0);

  const imageNotFound = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

  // HELPER FUNCTIONS
  const incrementPhotoIndex = (e) => {
    e.stopPropagation();
    if (defaultStyle.photos) {
      const range = defaultStyle.photos.length - 1;
      if (productPhotoIndex < range) {setProductPhotoIndex(productPhotoIndex + 1)}
      else {setProductPhotoIndex(0)}
    }
  };

  const decrementPhotoIndex = (e) => {
    e.stopPropagation();
    if (defaultStyle.photos) {
      const range = defaultStyle.photos.length - 1;
      if (productPhotoIndex > 0) {setProductPhotoIndex(productPhotoIndex - 1)}
      else {setProductPhotoIndex(range)}
    }
  };

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
    if (defaultStyle.photos) {
      const thumbnailUrl = defaultStyle.photos[productPhotoIndex].thumbnail_url;
      if (thumbnailUrl) {
        setProductPhotos(thumbnailUrl);
      }
    } else {
      setProductPhotos(imageNotFound);
    }
  }, [defaultStyle, productPhotoIndex]);

  return (
    <div className='related_product_card' onClick={() => setProductId(product_id)}>
    <button type='button' onClick={(e) => decrementPhotoIndex(e)}>prev pic</button>
      <button type='button' onClick={(e) => incrementPhotoIndex(e)}>next pic</button><br/>
      <img src={productPhotos} className='product_card_image' alt='product image' onError={(e) => e.currentTarget.src = imageNotFound}></img>
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