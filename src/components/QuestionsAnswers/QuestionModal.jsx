import React, { useState } from 'react';

function QuestionModal({ handleShowModal, showQuestionModal, handlePostQuestion, productId }) {
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
          Enter your question
          <textarea maxLength="1000" type="text" onChange={handleChange} name="body" required value={questionData.body} data-testid="question-body"/>
        </label>
        <label htmlFor="username-q">
          Username
          <input maxLength="60" type="text" onChange={handleChange} name="name" placeholder="Example: jackson11!" required value={questionData.name} />
        </label>
        <label htmlFor="email-q">
          Email
          <input type="email" maxLength="60" onChange={handleChange} name="email" placeholder="Why did you like the product or not?" required value={questionData.email} />
        </label>
        <p>For authentication reasons, you will not be emailed</p>
        <br />
        <button
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
      </form>
    </div>
  );
}

export default QuestionModal;
