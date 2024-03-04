import React, {useState, useEffect} from 'react';

const QuestionModal = ({handleShowModal, showQuestionModal, handlePostQuestion}) => {
  const handleClassName = showQuestionModal ? "modal-display" : "modal-display-none"

  const [questionData, setQuestionData] = useState({
    body: '',
    name: '',
    email: '',
    product_id: 40344
  })

  const handleChange = (e) => {
    const {name, value} = e.target

    setQuestionData((previousQuestionData => ({
      ...previousQuestionData,
      [name]: value
    })))

    console.log(questionData)
  }
  return (
    <>
    <div className={handleClassName}>
    <form className="question-form">
      <label>Enter your question</label><input type="text" onChange={handleChange} name="body"></input>
      <label>Username</label><input type="text" onChange={handleChange} name="name" ></input>
      <label>Email</label><input type="text" onChange={handleChange} name="email"></input><br></br>
      <button onClick={() => {
        handlePostQuestion(questionData)
      handleShowModal(false)
    }} type="button">Submit question</button>
    </form>
    </div>
    </>
  )
}

export default QuestionModal