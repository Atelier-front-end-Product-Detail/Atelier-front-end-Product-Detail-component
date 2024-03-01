import QuestionAnswerEntry from './QuestionAnswerEntry.jsx'
import React, {useState, useEffect} from 'react';

const QuestionsAnswersList = ({bridge}) => {
  const [questionsAnswersData, setQuestionsAnswersData] = useState([])
  useEffect(() => {
    bridge.questionsAnswers(40344)
    .then((results) => {
      setQuestionsAnswersData(results.data)
      // console.log(results.data)
    })
  }, [])

  const questionsMap = (object) => {
    for(let key in object) {
      if(key === 'results') {
        for(let nestedKey in object[key]) {
          return(
            <QuestionAnswerEntry body={object[key][nestedKey]}/>
          )
        }
      }
    }
  }
  return (
    <div className="QuestionAnswersList">
      {questionsMap(questionsAnswersData)}
    </div>
  )
}

export default QuestionsAnswersList