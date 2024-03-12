import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';
import './AddReviewModal.css';

function AddReviewModal({
  handleShowModal, showAddReviewModal, handleAddReview, productId, reviewsMeta, productName,
}) {
  const handleClassName = showAddReviewModal ? 'AddReviewModal-display' : 'AddReviewModal-display-none';

  // console.log("ADDREVIEW PRODUCT ID: ", productId)

  const [reviewData, setReviewData] = useState({
    // SEE G-LEARN API
    product_id: productId,
    rating: null,
    summary: '',
    body: '',
    recommend: null,
    name: '',
    email: '',
    photos: [],
    characteristics: {},
  });

  const [isRatingSelected, setIsRatingSelected] = useState(false);

  const ratingDescriptions = {
    1: 'Poor',
    2: 'Fair',
    3: 'Average',
    4: 'Good',
    5: 'Great',
  };

  const getRatingDescription = (rating) => ratingDescriptions[rating];

  // console.log('PHOTOS: ', reviewData.photos);
  const handleCharacteristicChange = (value, id) => {
    setReviewData({ ...reviewData, characteristics: { ...reviewData.characteristics, [id]: value } });
  };

  const handlePhotoChange = (event) => {
    const selectedPhotos = event.target.files;
    const maxPhotos = 5;
    const photoURLs = [];

    for (let i = 0; i < selectedPhotos.length; i++) {
      if (i < maxPhotos - reviewData.photos.length) {
        const photo = selectedPhotos[i];
        const photoURL = URL.createObjectURL(photo);
        photoURLs.push(photoURL);
      }
    }

    if (reviewData.photos.length + selectedPhotos.length <= maxPhotos) {
      setReviewData({ ...reviewData, photos: [...reviewData.photos, ...photoURLs] });
    } else {
      console.log('Exceeded maximum number of photos!');
    }
  };

  const onSubmitClick = (e) => {
    e.preventDefault();

    if (!isRatingSelected) {
      console.log('Please select a rating before submitting.');
      return;
    }

    if (reviewData.body.length < 50) {
      console.log('Review body under 50');
      return;
    }
    handleAddReview(reviewData);
    handleShowModal(false);
    setReviewData({
      product_id: productId,
      rating: null,
      summary: '',
      body: '',
      recommend: null,
      name: '',
      email: '',
      photos: [],
      characteristics: {},
    });
  };

  // console.log('Classname: ', handleClassName);
  // console.log('showAddReviewModal: ', showAddReviewModal);
  // console.log('reviewData: ', reviewData);

  return (
    <div className={handleClassName}>

      <form
        className="review-form"
        onSubmit={onSubmitClick}
      >
        <p className="title">Write Your Review</p>
        <p className="subtitle">
          About the {productName}
        </p>

        <label htmlFor="overallRating"> Overall rating:* </label>
        <div className="review-rating">
          <StarRating
            id="overallRating"
            aria-labelledby="overallRating"
            interactive="true"
            onRatingChange={(rating) => {
              setReviewData({ ...reviewData, rating, product_id: productId });
              setIsRatingSelected(true);
            }}
          />
          <div className="rating-description">
            {getRatingDescription(reviewData.rating)}
          </div>
        </div>

        <label >Do you recommend this product?* </label>
        <div className="review-rating">
          <label htmlFor="recommendYes">
            <input
              id="recommendYes"
              type="radio"
              name="recommendation"
              value="true"
              required
              onChange={(() => {
                setReviewData({ ...reviewData, recommend: true });
              })}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="recommendation"
              value="false"
              onChange={((value) => {
                setReviewData({ ...reviewData, recommend: false });
              })}
            />
            No
          </label>
        </div>

        <div className="review-element">
          <label htmlFor="summary">Review summary:*</label>
          <textarea
            id="summary"
            type="text"
            required
            placeholder="Enter review summary here"
            onChange={((event) => {
              setReviewData({ ...reviewData, summary: event.target.value });
            })}
            maxLength={60}
          />
          <p className="review-undertext ">{`${reviewData.summary.length}/60 characters`}</p>
        </div>

        <div className="review-element">
          <label htmlFor="reviewBody">Review body:*</label>
          <textarea
            id="reviewBody"
            placeholder="Enter review here"
            required
            onChange={((event) => {
              setReviewData({ ...reviewData, body: event.target.value });
            })}
            maxLength={1000}
          />
          <p className="review-undertext ">
            {reviewData.body.length < 50
              ? `Minimum required characters left: ${50 - reviewData.body.length}`
              : 'Minimum reached'}
          </p>
        </div>

        <div className="review-element">
          <label htmlFor="nickname">What is your nickname?*</label>
          <input
            id="nickname"
            type="text"
            required
            placeholder="Enter nickname here"
            onChange={((event) => {
              setReviewData({ ...reviewData, name: event.target.value });
            })}
          />
          <p className="review-undertext ">For privacy reasons, do not use your full name or email address</p>

        </div>

        <div className="review-element">
          <label htmlFor="email">Your email:*</label>
          <input
            id="email"
            type="email"
            required
            placeholder="email@email.com"
            onChange={((event) => {
              setReviewData({ ...reviewData, email: event.target.value });
            })}
          />
          <p className="review-undertext ">For authentication reasons, you will not be emailed</p>
        </div>

        {reviewData.photos.length > 0 && (
        <div className="review-rating">
          <p>Photos:</p>
          <div>
            {reviewData.photos.map((photo, index) => (
              <span key={index}>
                <img src={photo} alt={`Upload ${index + 1}`} />
              </span>
            ))}
          </div>
        </div>
        )}

        {reviewData.photos.length < 5 && (
        <div className="review-element">
          <label>Add Photos:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoChange}
          />
        </div>
        )}

        <div className="review-element">
          {reviewsMeta.characteristics && Object.entries(reviewsMeta.characteristics).map(([key, details]) => (
            <CharacteristicInput
              key={key}
              title={key}
              id={details.id}
              onChange={handleCharacteristicChange}
            />
          ))}
        </div>

        <button
          type="submit"
        >
          Submit Review
        </button>

        {!isRatingSelected && (
        <div style={{ color: 'red' }}>*Please select a star rating before submitting.</div>
        )}

        <button
          className="close-button"
          onClick={() => {
            handleShowModal(false);
          }}
          type="button"
        >
          X
        </button>

      </form>

    </div>
  );
}

const characteristicsMeanings = {
  Size: {
    1: 'A size too small',
    2: '½ a size too small',
    3: 'Perfect',
    4: '½ a size too big',
    5: 'A size too big',
  },
  Width: {
    1: 'Too narrow',
    2: 'Slightly narrow',
    3: 'Perfect',
    4: 'Slightly wide',
    5: 'Too wide',
  },
  Comfort: {
    1: 'Uncomfortable',
    2: 'Slightly uncomfortable',
    3: 'Ok',
    4: 'Comfortable',
    5: 'Perfect',
  },
  Quality: {
    1: 'Poor',
    2: 'Below average',
    3: 'What I expected',
    4: 'Pretty great',
    5: 'Perfect',
  },
  Length: {
    1: 'Runs short',
    2: 'Runs slightly short',
    3: 'Perfect',
    4: 'Runs slightly long',
    5: 'Runs long',
  },
  Fit: {
    1: 'Runs tight',
    2: 'Runs slightly tight',
    3: 'Perfect',
    4: 'Runs slightly long',
    5: 'Runs long',
  },
};

const getMeaning = (value, characteristic) => {
  const meanings = characteristicsMeanings[characteristic] || {};
  return meanings[value] || 'None selected';
};

function CharacteristicInput({ title, id, onChange }) {
  const [selectedValue, setSelectedValue] = useState(null);

  const radioValues = [1, 2, 3, 4, 5];

  const handleChange = (value) => {
    setSelectedValue(value);
    onChange(value, id);
  };

  return (
    <div>
      <label>
        {title}
        :
      </label>
      <div>
        {radioValues.map((value) => (
          <label key={value}>
            <input
              type="radio"
              name={title}
              required
              value={value}
              onChange={() => handleChange(value)}
            />
            {value}
          </label>
        ))}
      </div>
      <div>
        <p className="review-undertext ">
          {`Meaning: ${selectedValue ? getMeaning(selectedValue, title) : 'None selected'}`}
        </p>
      </div>
    </div>
  );
}

export default AddReviewModal;
