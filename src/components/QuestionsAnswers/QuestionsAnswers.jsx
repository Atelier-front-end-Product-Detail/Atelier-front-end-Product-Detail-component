import SearchQuestionsAnswers from './SearchQuestionsAnswers'
import QuestionsAnswersList from './QuestionsAnswersList'
import QuestionModal from './QuestionModal'
import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import axios from 'axios'

const QuestionsAnswers = ({bridge, productId}) => {
  const [dataNum, setDataNum] = useState(2)
  const [data, setData] = useState([])
  const [filtered, setFiltered] = useState([])
  const [isFiltered, setIsFiltered] = useState(false)
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  useEffect(() => {
    bridge.questions(productId)
    .then((results) => {
      setData(results.data.results)
    })
    .catch((err) => {
      throw err;
    })
  },[])



  const handleShowModal = (boolean) => {
    setShowQuestionModal(boolean)
  }

   const showQuestionsButton = () => {
    if(data.length > 4 && dataNum < data.length) {
      return (
        <>
           <QuestionsAnswersList bridge={bridge} data={data} dataNum={dataNum} handleQuestionHelpful={handleQuestionHelpful} handleQuestionReport={handleQuestionReport}/>
        <button type="button" onClick={() => {
              setDataNum(dataNum +2)
            }}>More Questions</button>
        <button type="button" onClick={() => {handleShowModal(true)}} id="question-button">Add a question</button>
        </>
      )
    } else {
      return (
        <>
        <QuestionsAnswersList bridge={bridge} data={data} dataNum={dataNum} handleQuestionHelpful={handleQuestionHelpful} handleQuestionReport={handleQuestionReport}/>
        <button type="button" onClick={() => {handleShowModal(true)}} id="question-button">Add a question</button>
        </>
      )
    }

   }

  const handleSearch = (searchValue) => {
    console.log(searchValue)

    if(searchValue.length >= 3) {
      const filtered = data.filter((entry) => {
            return entry.question_body.toString().toLowerCase().includes(searchValue.toLowerCase())
          })
      setFiltered(filtered)
      setIsFiltered(true)
    } else if (searchValue.length < 3) {
      setIsFiltered(false)
    }
  }

  const handlePostQuestion = (data) => {
    bridge.postQuestion(data)
    .then(() => {
      console.log("Success posting question", data)
      bridge.questions(productId)
      .then((results) => {
        setData(results.data.results)
      })
      .catch((err) => {
        throw err;
      })
    })
    .catch((err) => {
      console.log("Unsuccesful post", err)
    })
  }

  const handleQuestionHelpful = (question_id) => {
    if(localStorage.getItem(question_id)) {
      console.log("Helpful count already updated")
    } else {
      bridge.putQuestionHelpful(question_id)
      .then(() => {
        localStorage.setItem(question_id, "true")
        bridge.questions(productId)
        .then((results) => {
          setData(results.data.results)
        })
        .catch((err) => {
          throw err;
        })
        })
      .catch((err) => {
        throw err;
      })
    }

  }

  const handleQuestionReport = (question_id) => {
    bridge.reportQuestion(question_id)
    .then(() => {
      bridge.questions(productId)
      .then((results) => {
        setData(results.data.results)
      })
      .catch((err) => {
        throw err;
      })
    })
    .catch((err) => {
      throw err
    })
  }

return (
  <div className="questions-answers-overview">
    <h1 data-testid='title'>Questions & Answers</h1>
    <SearchQuestionsAnswers handleSearch={handleSearch}/>
    <QuestionModal handlePostQuestion={handlePostQuestion} handleShowModal={handleShowModal} showQuestionModal={showQuestionModal} />
    {isFiltered ? <QuestionsAnswersList bridge={bridge} data={filtered} handleQuestionHelpful={handleQuestionHelpful} handleQuestionReport={handleQuestionReport}/> :
      <>
      {showQuestionsButton()}
      </>
      }
  </div>
)
}


export default QuestionsAnswers