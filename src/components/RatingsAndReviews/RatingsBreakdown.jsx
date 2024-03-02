import React from 'react';
// import '../../../dist/RatingsBreakdown.css'


const RatingsBreakdown =  (props) => {

  // console.log("METADATA: ", props.reviewsMeta)
  let metaData = props.reviewsMeta

  //use Object.values to create an array of values. Call .reduce on array with accum set to 0.
  let totalReviews
  let averageRating
  let percentRecommend

  if (metaData.ratings){
    //calculate total reviews
    totalReviews = Object.values(metaData.ratings).reduce((acc, eachRating)=>{return(acc + Number(eachRating))}, 0);

    //calculate averae rating
    let sum = 0
    for (var key in metaData.ratings) {
      sum += key*metaData.ratings[key]
      averageRating = (sum/totalReviews).toFixed(1)
    }

    //calculate percent recommend
    percentRecommend = ((metaData.recommended.true/totalReviews).toFixed(2))*100
  }

  // console.log("totalReviews: ", totalReviews)
  // console.log("averageRating: ", averageRating)
  // console.log("percentRecommend: ", percentRecommend)
  // console.log(metaData.characteristics)

  return (
    <div className="RatingsBreakdownContainer">
      {!isNaN(averageRating) ?
        <>
        <div className="RR-AverageRating">{averageRating}</div>
        <div>{totalReviews} reviews</div>
        </>
        :
        null
      }

      <div>
        {/* map over metaData.ratings and return RatingBar component with data passed in. Reverse order. */}
        {metaData.ratings && Object.entries(metaData.ratings).map(([rating, count])=>{
          return <RatingBar key={rating} rating={rating} count={count} totalReviews={totalReviews}/>
        }).reverse()
        }
      </div>

      <div>{`${percentRecommend}% of people recommend this product`}</div>



      {metaData.characteristics && Object.entries(metaData.characteristics).map(([description, object])=>{
          return <CharacteristicBar key={description} description={description} rating={object.value}/>
        })
      }

    </div>
  )
}

const RatingBar =  (props) => {

  return (
    <div className="RatingsBarContainer">
      <div>{`${props.rating} star`} </div>

      <div className="RatingsBar">
        <div
          className="RatingsBarFill"
          style={{
            width: `${100*props.count/props.totalReviews}%`
          }}
        ></div>
      </div>

      <div className="RatingsCount">{props.count}</div>
    </div>
  )
}



const CharacteristicBar =  (props) => {

  return (
    <div className="CharacteristicBarContainer">
      {props.description}
      <div className="RatingsBar">
        <div> </div>
      </div>





    </div>

  )
}

export default RatingsBreakdown;