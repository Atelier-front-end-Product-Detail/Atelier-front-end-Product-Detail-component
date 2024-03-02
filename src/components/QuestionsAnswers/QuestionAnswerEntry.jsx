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
    <div>
    <h3>Q: {question.question_body}</h3>
    <p>Helpful? YES</p>
    <p>Add Answer</p>
    <div>
      {answersMap(answersData).map((answer) => {
        return (
          <div>
            <p>A: {answer.body}</p>
            <p>by {answer.answerer_name}, {answer.question_date}</p>
            <p>Helpful? ({answer.helpfulness})</p>
          </div>
        )
      })}
    </div>
  </div>
  )
}

export default QuestionAnswerEntry