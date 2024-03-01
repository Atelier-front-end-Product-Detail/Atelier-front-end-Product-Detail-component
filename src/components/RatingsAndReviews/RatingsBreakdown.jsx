import React from 'react';


const RatingsBreakdown =  (props) => {

  console.log("METADATA: ", props.reviewsMeta)
  let metaData = props.reviewsMeta

  //use Object.values to create an array of values. Call .reduce on array with accum set to 0.
  let totalReviews
  let averageRating
  let sum = 0
  let fiveStarCount
  let fourStarCount
  let threeStarCount
  let twoStarCount
  let oneStarCount
  let percentRecommend



  if (metaData.ratings){
    //
    totalReviews = Object.values(metaData.ratings).reduce((acc, eachRating)=>{return(acc + Number(eachRating))}, 0);

    for (var key in metaData.ratings) {
      sum += key*metaData.ratings[key]
      averageRating = (sum/totalReviews).toFixed(1)
    }

    fiveStarCount = metaData.ratings['5']
    fourStarCount = metaData.ratings['4']
    threeStarCount = metaData.ratings['3']
    twoStarCount = metaData.ratings['2']
    oneStarCount = metaData.ratings['1']

    percentRecommend = ((metaData.recommended.true/totalReviews).toFixed(2))*100
  }


  console.log("totalReviews: ", totalReviews)
  console.log("averageRating: ", averageRating)
  console.log("fiveStarCount: ", fiveStarCount)
  console.log("fourStarCount: ", fourStarCount)
  console.log("threeStarCount: ", threeStarCount)
  console.log("twoStarCount: ", twoStarCount)
  console.log("oneStarCount: ", oneStarCount)
  console.log("percentRecommend: ", percentRecommend)



  return (
    <div style={{border: "2px solid black", width: "30vw"}}>
      {!isNaN(averageRating) ?
        <div>{averageRating}</div>
        :
        null
      }
      <div>
        <RatingBar/>
        <RatingBar/>
        <RatingBar/>
        <RatingBar/>
        <RatingBar/>
      </div>
      {`${percentRecommend}% of people recommend`}
      <CharacteristicBar/>
    </div>
  )
}

const RatingBar =  () => {

  return (
    <div
      style={{
        border: "2px solid red",
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >

      <div>RatingBar </div>

      <div
        style={{
          width: '90%',
          display: 'flex',
          alignItems: 'center',
          height: '5px',
          backgroundColor: '#D3D3D3',
          borderRadius: '8px',
          margin: '5px'
        }}
      >

        <div
          style={{
            width: '25%',
            height: '100%',
            backgroundColor: '#009900'
          }}
        >
        </div>

      </div>



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