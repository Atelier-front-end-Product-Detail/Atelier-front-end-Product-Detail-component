/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function AnswerModal({
  showAnswerModal, setAnswerModal, handleAnswerSubmit, productName, question,
}) {
  const [answerData, setAnswerData] = useState({
    body: '',
    name: '',
    email: '',
    photos: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAnswerData(((previousAnswerData) => ({
      ...previousAnswerData,
      [name]: value,
    })));
  };

  // const convertBase64 = (file) => new Promise((resolve, reject) => {
  //   console.log(file);
  //   const fileReader = new FileReader();

  //   fileReader.onloadend = () => {
  //     const base64String = fileReader.result;
  //     resolve(base64String.toString());
  //   };

  //   fileReader.onerror = (err) => {
  //     reject(err);
  //   };
  //   fileReader.readAsDataURL(file);
  // });

  const photoUpload = (e) => {
    const photos = [];

    for (let i = 0; i < e.target.files.length; i += 1) {
      const file = URL.createObjectURL(e.target.files[i]);
      photos.push(file);
      // photos.push(convertBase64(e.target.files[i]));
      // const blobURL = convertBase64(e.target.files[i]);
      // photos.push(blobURL)
      // const reader = new FileReader();
      // reader.onload = () => {
      //   const base64String = reader.result;
      //   console.log(base64String);

      // // photos.push(reader.readAsDataURL(e.target.files[i]));
      // console.log(reader.result);

      // URL.revokeObjectURL(photos);
    }
    setAnswerData((prevValue) => ({
      ...prevValue,
      photos,
    }));
    console.log(photos);
  };
  const handleClassName = showAnswerModal ? 'answer-modal-display' : 'answer-modal-display-none';

  return (
    <div className={handleClassName}>
      <form
        className="answer-form"
        name="answerForm"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="x-button">
          <button type="button" onClick={() => { setAnswerModal(!showAnswerModal); }}>x</button>
        </div>
        <h1>
          {productName}
          :
          {' '}
          {question}
        </h1>
        <label htmlFor="answer-a">
          Enter a answer *
          <textarea name="body" type="text" onChange={handleChange} required maxLength="1000" data-testid="answer-body" value={answerData.body} />
        </label>
        <label htmlFor="username-a">
          Username *
          <input maxLength="60" placeholder="Example: jackson11!" required name="name" type="text" value={answerData.name} onChange={handleChange} data-testid="answer-user" />
        </label>
        <p>For privacy reasons, do not use your full name or email address</p>
        <label htmlFor="email-a">
          Email *
          <input name="email" type="email" required onChange={handleChange} maxLength="60" value={answerData.email} data-testid="answer-email" />
        </label>
        <p>For authentication reasons, you will not be emailed</p>
        <label htmlFor="photos-a">
          Upload photos
          <input type="file" onChange={photoUpload} name="photos" multiple />
        </label>
        <button
          data-testid="answer-submit"
          type="submit"
          onClick={() => {
            if (answerData.photos.length > 5) {
              alert('You can only upload a maximum of 5 files!');
            } else if (answerData.body === '') {
              alert('You must enter the following: Enter your Answer');
            } else if (answerData.name === '') {
              alert('You must enter the following: Name');
            } else if (answerData.email === '' || !answerData.email.includes('@')) {
              alert('You must enter the following: Email');
            } else {
              handleAnswerSubmit(answerData);
              setAnswerModal(!showAnswerModal);
              // setAnswerData({
              //   body: '',
              //   name: '',
              //   email: '',
              //   photos: []
              // })
            }
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

AnswerModal.propTypes = {
  showAnswerModal: PropTypes.bool,
  setAnswerModal: PropTypes.func,
  handleAnswerSubmit: PropTypes.func,
  productName: PropTypes.string,
  question: PropTypes.string,
};

AnswerModal.defaultProps = {
  showAnswerModal: '',
  setAnswerModal: '',
  handleAnswerSubmit: '',
  productName: '',
  question: '',
};

export default AnswerModal;
