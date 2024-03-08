import React, {useState, useEffect} from 'react';

const AnswerModal = ({showAnswerModal, setAnswerModal, handleAnswerSubmit, productName, question}) => {
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

    for(let i = 0; i < e.target.files.length; i++) {
      photos.push(URL.createObjectURL(e.target.files[i]))
      URL.revokeObjectURL(photos)
      setAnswerData(prevValue => ({
        ...prevValue,
        photos: photos
      }))
    }

  }
  const handleClassName = showAnswerModal ? "answer-modal-display" : "answer-modal-display-none"

  // const answerFormValidation = () => {
  //   const body = document.forms.answerForm.body.value
  //   const name = document.forms.answerForm.name.value
  //   const email = document.forms.answerForm.email.value

  //   console.log(body, name, email)

  //   if(body === '') {
  //     window.alert("Please enter a answer");
  //     body.focus()
  //     return false
  //   }
  //   if(name === '') {
  //     window.alert('Please enter in your username')
  //     name.focus()
  //     return false
  //   }
  //   if(email === '' || !email.includes('@')) {
  //     window.alert('Please enter a valid email address')
  //     email.focus()
  //     return false
  //   }

  //   return true
  // }

  // const validate = () => {
  //   if(answerFormValidation() === true) {
  //     handleAnswerSubmit(answerData);
  //     setAnswerModal(!showAnswerModal)
  //   } else {
  //     console.log("form not validated")
  //   }
  // }
  return (
    <>
      <div className={handleClassName}>
        <form className="answer-form" name="answerForm" onSubmit={(e) => {
          e.preventDefault()}}>
        <div className="x-button">
          <button onClick={() => {setAnswerModal(!showAnswerModal)}}>x</button></div>
          <h1>{productName}: {question}</h1>
          <label>Enter a answer *</label>
          <textarea name="body" type="text" onChange={handleChange} required maxLength="1000" value={answerData.body}></textarea>
          <label>Username *</label>
          <input maxLength="60" placeholder="Example: jackson11!" required name="name" type="text" value={answerData.name}onChange={handleChange}></input>
          <p>For privacy reasons, do not use your full name or email address</p>
          <label>Email *</label>
          <input name="email" type="email" required onChange={handleChange} maxLength="60" value={answerData.email}></input>
          <p>For authentication reasons, you will not be emailed</p>
          <label>Upload photos</label>
          <input type="file" onChange={photoUpload} name="photos" multiple></input>
          <button type="submit" onClick={() => {
            if(answerData.photos.length > 3) {
              alert('You can only upload a maximum of 5 files!')
            } else if (answerData.body === ''){
              alert('You must enter the following: Enter your Answer')
            } else if (answerData.name === ''){
              alert('You must enter the following: Name')
            } else if(answerData.email === '' || !answerData.email.includes('@')){
              alert('You must enter the following: Email')
            } else {
              handleAnswerSubmit(answerData);
            setAnswerModal(!showAnswerModal)
            console.log(answerData)
            // setAnswerData({
            //   body: '',
            //   name: '',
            //   email: '',
            //   photos: []
            // })
            }
          }}>Submit</button>
        </form>
      </div>
    </>
  )
}

export default AnswerModal