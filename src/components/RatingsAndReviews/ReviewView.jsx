import React from 'react';

const ReviewView = () => {

  return (
    <div>
      ReviewView
      <SortReview/>
      <ReviewList/>
      <AddReview/>
    </div>
  )
}

const SortReview = () => {
  return (
    <div>
      SortReview
    </div>
  )
}

const ReviewList = () => {
  return (
    <div>
      <ReviewTile/>
    </div>
  )
}

const ReviewTile = () => {
  return (
    <div>
      ReviewTile
    </div>
  )
}

const AddReview = () => {
  return (
    <div>
      AddReview
    </div>
  )
}


export default ReviewView


