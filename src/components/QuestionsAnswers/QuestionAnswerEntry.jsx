import React, {useState, useEffect} from 'react';
import AnswerModal from './AnswerModal'


const QuestionAnswerEntry = ({bridge, question, handleQuestionHelpful, handleQuestionReport}) => {
  const [answersData, setAnswersData] = useState([])
  const [showAnswerModal, setAnswerModal] = useState(false)

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

  const handleAnswerSubmit = (data) => {
    bridge.postAnswer(question.question_id, data)
    .then(() => {
      console.log("Successful post to question")
    })
    .catch((err) => {
      throw err;
    })

    bridge.answers(question.question_id)
    .then((results) => {
      setAnswersData(results.data)
    })
    .catch((err) => {
      throw err;
    })
  }

  const handleAnswerReport = (answer_id) => {
    bridge.reportAnswer(answer_id)
      .then(() => {

        console.log("succesful report", answer_id)
    })
    .catch((err) => {
      throw err;
    })
    bridge.answers(question.question_id)
      .then((results) => {
        setAnswersData(results.data)
        console.log(results.data)
      })
      .catch((err) => {
        throw err;
      })
  }

  const handleAnswerHelpful = (answer_id) => {
    bridge.putAnswerHelpful(answer_id)
    .then(() => {
      bridge.answers(question.question_id)
      .then((results) => {
        setAnswersData(results.data)
      })
      .catch((err) => {
        throw err;
      })
    })
    .catch((err) => {
      throw err;
    })
  }

  const getTime = () => {
    const time = new Date();
    return (time.getHours() + ':' + time.getMinutes() + ':', time.getSeconds()).toString()
  }
  const handleInteraction = (element, widget, time) => {
    console.log(getTime())
  }


  return (
    <div className="questions-answers-container">
      <AnswerModal showAnswerModal={showAnswerModal} setAnswerModal={setAnswerModal} handleAnswerSubmit={handleAnswerSubmit}/>
              <div className="question-container">
              <div className="question-title-container">
                <p className="question-title" onClick={() => {
                  handleInteraction()
                }}>Q: {question.question_body}</p>
              </div>

              <div className="question-helpful-container">
                <p className="helpful-question" onClick={() => {
                  handleQuestionHelpful(question.question_id)
                }}>Helpful? YES ({question.question_helpfulness}) </p>
                <p className="helpful-question-add-answer" onClick={() => {
                  setAnswerModal(!showAnswerModal)
                }}> Add Answer</p>
                <p className="helpful-question-report" onClick={() => {
                  handleQuestionReport(question.question_id)
                }}>Report</p>
              </div>
            </div>
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
              <p className="helpful-answer" onClick={() => {
                handleAnswerHelpful(answer.answer_id)
              }}>Helpful? ({answer.helpfulness})</p>
              <p onClick={() => {
                handleAnswerReport(answer.answer_id)
              }}>Report</p>
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