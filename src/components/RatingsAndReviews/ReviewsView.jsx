import React from 'react';

const ReviewsView = () => {

  return (
    <div>
      ReviewsView
      <SortReviews/>
      <ReviewsList/>
      <AddReview/>
    </div>
  )
}

const SortReviews = () => {
  return (
    <div>
      SortReview
    </div>
  )
}

const ReviewsList = () => {
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


export default ReviewsView


