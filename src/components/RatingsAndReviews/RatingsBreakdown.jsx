import React from 'react';


const RatingsBreakdown =  (props) => {

  console.log("METADATA: ", props.reviewsMeta.ratings)

  //use Object.values to create an array of values. Call .reduce on array with accum set to 0.
  let totalReviews
  if (props.reviewsMeta.ratings){
    totalReviews = Object.values(props.reviewsMeta.ratings).reduce((acc, eachRating)=>{return(acc + Number(eachRating))}, 0);
  }
  console.log("totalReviews: ", totalReviews)

  //sum all key*value pair divided by total reviews
  let sum = 0
  if (props.reviewsMeta.ratings){
    for (var key in props.reviewsMeta.ratings) {
      sum += key*props.reviewsMeta.ratings[key]
    }
  }
  let averageRating = (sum/totalReviews).toFixed(1)
  console.log("averageRating: ", averageRating)



  return (
    <div>
      {!isNaN(averageRating) ? <div>{averageRating}</div> : null}
      <RatingBar/>
      <CharacteristicBar/>
    </div>
  )
}

const RatingBar =  () => {


  return (
    <div>
      RatingBar
    </div>

  )
}



const CharacteristicBar =  () => {

  return (
    <div>
      CharacteristicBar
    </div>

  )
}

export default RatingsBreakdown;