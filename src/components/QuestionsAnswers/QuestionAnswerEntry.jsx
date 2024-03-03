import React, {useState, useEffect} from 'react';


const QuestionAnswerEntry = ({bridge, question}) => {
  const [answersData, setAnswersData] = useState([])


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

  // // const answersMap = (object) => {
  // //   return Object.keys(object.answers).map((item, i) => (
  // //       <div >
  // //         <p>A: {object.answers[item].body}</p>
  // //         <p>by {object.answers[item].answerer_name}, {object.answers[item].question_date}</p>
  // //         <p>Helpful? ({object.answers[item].helpfulness})</p>
  // //       </div>
  // //   ))


  // // }
  return (
    <div className="questions-answers-container">
      <div className="question-container">
        <div className="question-title-container">
          <p className="question-title">Q: {question.question_body}</p>
        </div>
        <div className="question-helpful-container">
          <p className="helpful-question">Helpful? YES ({question.question_helpfulness}) </p>
          <p className="helpful-question-add-answer"> Add Answer</p>
        </div>
      </div>
    <div>
      {answersMap(answersData).map((answer) => {
        return (
          <div className="answer-container">
            <div className="answer-a-container">
              <p className="answer-A">A: </p>
              <p>{answer.body}</p>
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