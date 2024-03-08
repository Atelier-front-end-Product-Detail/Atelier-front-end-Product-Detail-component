import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';
import './AddReviewModal.css';

function AddReviewModal({
  handleShowModal, showAddReviewModal, handleAddReview, productId, reviewsMeta,
}) {
  const handleClassName = showAddReviewModal ? 'AddReviewModal-display' : 'AddReviewModal-display-none';

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

  // console.log('Classname: ', handleClassName);
  // console.log('showAddReviewModal: ', showAddReviewModal);
  // console.log('reviewData: ', reviewData);

  return (
    <div className={handleClassName}>

      <form className="review-form">
        <h4>Write Your Review</h4>
        <h6>About the "product name"</h6>

        <label> Overall rating* </label>
        <div>
          <StarRating
            interactive="true"
            onRatingChange={(rating) => {
              setReviewData({ ...reviewData, rating });
            }}
          />
          <p>selected rating:  </p>
        </div>

        <label>Do you recommend this product?* </label>
        <div>
          <label>
            <input
              type="radio"
              name="recommendation"
              value="true"
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

        <div>
          <label>Review summary</label>
          <input
            type="text"
            placeholder="Example: Best purchase ever!"
            onChange={((event) => {
              setReviewData({ ...reviewData, summary: event.target.value });
            })}
            maxLength={60}
          />
          <p>{`${reviewData.summary.length}/60 characters`}</p>
        </div>

        <div>
          <label>Review body*</label>
          <textarea
            placeholder="Why did you like the product or not?"
            onChange={((event) => {
              setReviewData({ ...reviewData, body: event.target.value });
            })}
          />
          <p>
            {reviewData.body.length < 50
              ? `Minimum required characters left: ${50 - reviewData.body.length}`
              : 'Minimum reached'}
          </p>
        </div>

        <div>
          <label>What is your nickname?*</label>
          <input
            type="text"
            placeholder="Example: nickname!"
            onChange={((event) => {
              setReviewData({ ...reviewData, name: event.target.value });
            })}
          />
          <p>For privacy reasons, do not use your full name or email address</p>

        </div>

        <div>
          <label>Your email*</label>
          <input
            type="email"
            required
            placeholder="Example: email@email.com"
            onChange={((event) => {
              setReviewData({ ...reviewData, email: event.target.value });
            })}
          />
          <p>For authentication reasons, you will not be emailed</p>
        </div>

        {reviewData.photos.length > 0 && (
        <div>
          <p>Photos:</p>
          <ul>
            {reviewData.photos.map((photo, index) => (
              <li key={index}>
                <img src={photo} alt={`Upload ${index + 1}`} />
              </li>
            ))}
          </ul>
        </div>
        )}

        {reviewData.photos.length < 5 && (
        <div>
          <label>Add Photo</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoChange}
          />
        </div>
        )}

        <div>
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
          onClick={() => {
            handleAddReview(reviewData);
            handleShowModal(false);
          }}
          type="button"
        >
          Submit Review
        </button>

        <button
          onClick={() => {
            handleShowModal(false);
          }}
          type="button"
        >
          CLOSE WINDOW
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
      <label>{title}</label>
      <div>
        {radioValues.map((value) => (
          <label key={value}>
            <input
              type="radio"
              name={title}
              value={value}
              onChange={() => handleChange(value)}
            />
            {value}
          </label>
        ))}
      </div>
      <div>
        <p>
          {`Meaning: ${selectedValue ? getMeaning(selectedValue, title) : 'None selected'}`}
        </p>
      </div>
    </div>
  );
}

export default AddReviewModal;
