/* eslint-disable no-alert */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function QuestionModal({
  handleShowModal, showQuestionModal, handlePostQuestion, productId,
}) {
  const handleClassName = showQuestionModal ? 'modal-display' : 'modal-display-none';

  const [questionData, setQuestionData] = useState({
    body: '',
    name: '',
    email: '',
    productid: productId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setQuestionData(((previousQuestionData) => ({
      ...previousQuestionData,
      [name]: value,
    })));
  };
  return (
    <div className={handleClassName}>
      <form className="question-form" onSubmit={(e) => { e.preventDefault(); }}>
        <div className="x-button"><button type="button" onClick={() => { handleShowModal(false); }}>x</button></div>
        <label htmlFor="question-enter">
          Enter your question *
          <br />
          <textarea maxLength="1000" type="text" onChange={handleChange} name="body" required value={questionData.body} data-testid="question-body" />
        </label>
        <label htmlFor="username-q">
          Username *
          <br />
          <input maxLength="60" type="text" onChange={handleChange} name="name" placeholder="Example: jackson11!" required value={questionData.name} />
        </label>
        <label htmlFor="email-q">
          Email *
          <br />
          <input type="email" maxLength="60" onChange={handleChange} name="email" placeholder="Why did you like the product or not?" required value={questionData.email} />
        </label>
        <p>For authentication reasons, you will not be emailed</p>
        <br />
        <div className="question-button">
          <button
            className="question-submit-bttn"
            onClick={() => {
              if (questionData.name === '') {
                alert('You must enter the following: ');
              }
              handlePostQuestion(questionData);
              handleShowModal(false);
              setQuestionData({
                body: '',
                name: '',
                email: '',
                productid: '40346',
              });
            }}
            type="button"
            data-testid="submit-questions-bttn"
          >
            Submit question
          </button>
        </div>
      </form>
    </div>
  );
}

QuestionModal.propTypes = {
  handleShowModal: PropTypes.func,
  showQuestionModal: PropTypes.bool,
  handlePostQuestion: PropTypes.func,
  productId: PropTypes.number,
};

QuestionModal.defaultProps = {
  handleShowModal: '',
  showQuestionModal: '',
  handlePostQuestion: '',
  productId: '',
};

export default QuestionModal;
