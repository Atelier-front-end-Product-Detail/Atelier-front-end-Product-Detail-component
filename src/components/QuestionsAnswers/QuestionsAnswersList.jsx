import QuestionAnswerEntry from './QuestionAnswerEntry.jsx'
import React, {useState, useEffect} from 'react';

const QuestionsAnswersList = ({data, bridge}) => {
  const [questionsData, setQuestionData] = useState([])

  useEffect(() => {
    setQuestionData(data)
  })

  const questionsMap = (object) => {
    let questionsArr = []

    for(let key in object) {
      questionsArr.push(object[key])
    }

    questionsArr.sort((a, b) => {
      return b.question_helpfulness - a.question_helpfulness
    })
    return questionsArr
  }


  return (
    <div className="questions-answers-list">
      {questionsMap(questionsData).map((question) => {
        return (
          <QuestionAnswerEntry key={question.question_id} bridge={bridge} question={question} />
        )
      })}
    </div>
  )
}

export default QuestionsAnswersList