import React, {useState, useEffect} from 'react';

const QuestionModal = ({handleShowModal, showQuestionModal, handlePostQuestion}) => {
  const handleClassName = showQuestionModal ? "modal-display" : "modal-display-none"

  const [questionData, setQuestionData] = useState({
    body: '',
    name: '',
    email: '',
    productid: "40346"
  })

  const handleChange = (e) => {
    const {name, value} = e.target

    setQuestionData((previousQuestionData => ({
      ...previousQuestionData,
      [name]: value
    })))

  }
  return (
    <>
    <div className={handleClassName}>
    <form className="question-form" onSubmit={(e) => {e.preventDefault()}}>
        <div className="x-button"><button onClick={() => {handleShowModal(false)}}>x</button></div>
      <label>Enter your question</label><input maxLength="1000" type="text" onChange={handleChange} name="body" required value={questionData.body}></input>
      <label>Username</label><input maxLength="60" type="text" onChange={handleChange} name="name" placeholder="Example: jackson11!" required value={questionData.name}></input>
      <label>Email</label><input type="email" maxLength="60" onChange={handleChange} name="email" placeholder="Why did you like the product or not?" required value={questionData.email}></input><p>For authentication reasons, you will not be emailed</p><br></br>
      <button onClick={() => {
        handlePostQuestion(questionData);
      handleShowModal(false);
      setQuestionData({
        body: '',
        name: '',
        email: '',
        productid: "40346"
      })
    }} type="button">Submit question</button>
    </form>
    </div>
    </>
  )
}

export default QuestionModal