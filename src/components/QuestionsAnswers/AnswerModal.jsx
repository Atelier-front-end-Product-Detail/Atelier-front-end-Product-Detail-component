import React, {useState, useEffect} from 'react';

const AnswerModal = ({showAnswerModal, setAnswerModal, handleAnswerSubmit}) => {
  const [answerData, setAnswerData] = useState({
    body: '',
    name: '',
    email: '',
    photos: []
  })

  const handleChange = (e) => {
    const {name, value} = e.target

    setAnswerData((previousAnswerData => ({
      ...previousAnswerData,
      [name]: value
    })))
  }

  const photoUpload = (e) => {
    let photos = []
    photos.push(URL.createObjectURL(e.target.files[0]))

    setAnswerData(prevValue => ({
      ...prevValue,
      photos: photos
    }))
  }
  const handleClassName = showAnswerModal ? "answer-modal-display" : "answer-modal-display-none"
  return (
    <>
      <div className={handleClassName}>
        <div className="answer-form">
        <div className="x-button"><button onClick={() => {setAnswerModal(!showAnswerModal)}}>x</button></div>
          <label>Enter a answer</label>
          <input name="body" type="text" onChange={handleChange}></input>
          <label>Username</label>
          <input name="name" type="text" onChange={handleChange}></input>
          <label>Email</label>
          <input name="email" type="text" onChange={handleChange}></input>
          <label>Upload photos</label>
          <input type="file" onChange={photoUpload} name="photos"></input>
          <button onClick={() => {
            handleAnswerSubmit(answerData);
            setAnswerModal(!showAnswerModal)
          }}>Submit</button>
        </div>
      </div>
    </>
  )
}

export default AnswerModal