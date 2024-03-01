import React, {useState, useEffect} from 'react';


const QuestionAnswerEntry = ({body}) => {

  useEffect(() => {
    answersMap(body)
  }, [])


  const answersMap = (object) => {
    return Object.keys(object.answers).map((item, i) => (
        <div >
          <p>A: {object.answers[item].body}</p>
          <p>by {object.answers[item].answerer_name}, {object.answers[item].question_date}</p>
          <p>Helpful? ({object.answers[item].helpfulness})</p>
        </div>
    ))


  }
  return (
    <div>
    <h3>Q: {body.question_body}</h3>
    <p>Helpful? YES</p>
    <p>Add Answer</p>
    <div>
      {answersMap(body)}
    </div>
  </div>
  )
}

export default QuestionAnswerEntry