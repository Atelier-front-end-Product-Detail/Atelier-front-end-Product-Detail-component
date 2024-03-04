import React, {useState, useEffect} from 'react';


const QuestionAnswerEntry = ({bridge, question}) => {
  const [answersData, setAnswersData] = useState([])
  const [addAnswer, setAddAnswer] = useState(false)
  const [answerInput, setAnswerInput] = useState({
    body: '',
    name: '',
    email: '',
    photos: []
  })

  const handleFileUpload = (e) => {
    setFile(URL.createObjectURL(e.target.files))
  }

const addAnswerForm = () => {
  switch(addAnswer) {
    case false:
      return
      <div className="question-container">
        <div className="question-title-container">
          <p className="question-title">Q: {question.question_body}</p>
        </div>

        <div className="question-helpful-container">
          <p className="helpful-question">Helpful? YES ({question.question_helpfulness}) </p>
          <p className="helpful-question-add-answer" onClick={handleAddAnswer}> Add Answer</p>
        </div>
      </div>
    case true:
      return
        <div className="question-container">
          <div className="question-title-container">
            <p className="question-title">Q: {question.question_body}</p>
          </div>
          <form className="add-form">
            <p>Product Name Placeholder: {question.question_body}</p>
            <label>Enter your answer:
              <input name="body" type="text"></input>
            </label>
            <label>Enter your username
              <input type="text" placeholder="Example. jack543!" name="name"></input>
              <p>For privacy reasons, do not use your full name or email address” will appear</p>
            </label>
            <label>Enter your email
              <input name="email" type="text" placeholder="Example: jack@email.com"></input>
            </label>
            <label>Upload photos
              <input type="file"></input>
            </label>
            <button type="button">Submit</button>
          </form>
          <div className="question-helpful-container">
            <p className="helpful-question">Helpful? YES ({question.question_helpfulness}) </p>
            <p className="helpful-question-add-answer" onClick={handleAddAnswer}> Add Answer</p>
          </div>
        </div>
  }
}

  useEffect(() => {
    bridge.answers(question.question_id)
    .then((results) => {
      setAnswersData(results.data)
    })
    .catch((err) => {
      throw err;
    })
  }, [])

  const answersMap = (object) => {
    let answersArr = []

    for(let key in object) {
      if(key === 'results') {
        for(let nestedKey in object[key]) {
          answersArr.push(object[key][nestedKey])
        }
      }
    }

    answersArr.sort((a, b) => {
      return b.helpfulness - a.helpfulness
    })
    return answersArr

  }

  const handleAddAnswer = (e) => {
    const {name, value} = e.target
  }

  return (
    <div className="questions-answers-container">
      {addAnswer ? <div className="question-container">
          <div className="question-title-container">
            <p className="question-title">Q: {question.question_body}</p>
          </div>
          <form className="add-form">
            <p>Product Name Placeholder: {question.question_body}</p>
            <label>Enter your answer:
              <input name="body" type="text"></input>
            </label>
            <label>Enter your username
              <input type="text" placeholder="Example. jack543!" name="name"></input>
              <p>For privacy reasons, do not use your full name or email address” will appear</p>
            </label>
            <label>Enter your email
              <input name="email" type="text" placeholder="Example: jack@email.com"></input>
            </label>
            <label>Upload photos
              <input type="file"></input>
            </label>
            <button type="button" onClick={() => {
              setAddAnswer(!addAnswer)
            }}>Submit</button>
          </form>
          <div className="question-helpful-container">
            <p className="helpful-question">Helpful? YES ({question.question_helpfulness}) </p>
          </div>
        </div> :
              <div className="question-container">
              <div className="question-title-container">
                <p className="question-title">Q: {question.question_body}</p>
              </div>

              <div className="question-helpful-container">
                <p className="helpful-question">Helpful? YES ({question.question_helpfulness}) </p>
                <p className="helpful-question-add-answer" onClick={() => {
                  setAddAnswer(!addAnswer)
                }}> Add Answer</p>
              </div>
            </div>
    }
    <div>
      {answersMap(answersData).map((answer) => {
        return (
          <div key={answer.answer_id} className="answer-container">
            <div className="answer-a-container">
              <p className="answer-A">A: </p>
              <p className="answer-body">{answer.body}</p>
            </div>
            <div className="answer-helpful-container">
              <p className="helpful-answer-info">by {answer.answerer_name}, {answer.date}</p>
              <p className="helpful-answer">Helpful? ({answer.helpfulness})</p>
              <p>Report</p>
            </div>
            <div>
            </div>
          </div>
        )
      })}
    </div>
  </div>
  )
}

export default QuestionAnswerEntry