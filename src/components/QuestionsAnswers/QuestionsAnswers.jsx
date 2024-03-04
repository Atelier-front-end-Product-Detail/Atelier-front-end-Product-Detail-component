import SearchQuestionsAnswers from './SearchQuestionsAnswers'
import QuestionsAnswersList from './QuestionsAnswersList'
import QuestionModal from './QuestionModal'
import React, {useState, useEffect} from 'react';


const QuestionsAnswers = ({bridge}) => {
  const [dataNum, setDataNum] = useState(2)
  const [data, setData] = useState([])
  const [filtered, setFiltered] = useState([])
  const [isFiltered, setIsFiltered] = useState(false)
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  useEffect(() => {
    bridge.questions(40344)
    .then((results) => {
      setData(results.data.results)
      // console.log(results.data)
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
           <QuestionsAnswersList bridge={bridge} data={data} dataNum={dataNum}/>
        <button type="button" onClick={() => {
              setDataNum(dataNum +2)
            }}>More Questions</button>
        <button type="button" onClick={() => {handleShowModal(true)}}>Add a question</button>
        </>
      )
    } else {
      return (
        <>
        <QuestionsAnswersList bridge={bridge} data={data} dataNum={dataNum}/>
        <button type="button" onClick={() => {handleShowModal(true)}}>Add a question</button>
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
    console.log(data)
    bridge.postQuestion(data)
    .then(() => {
      console.log("Success posting question")
    })
    .catch((err) => {
      throw err;
      console.log(err)
    })

    bridge.questions(40344)
    .then((results) => {
      setData(results.data.results)
    })
    .catch((err) => {
      throw err;
    })
  }

return (
  <div className="questions-answers-overview">
    <h1>Questions & Answers</h1>
    <SearchQuestionsAnswers handleSearch={handleSearch}/>
    <QuestionModal handlePostQuestion={handlePostQuestion} handleShowModal={handleShowModal} showQuestionModal={showQuestionModal} />
    {isFiltered ? <QuestionsAnswersList bridge={bridge} data={filtered}/> :
      <>
      {showQuestionsButton()}
      </>
      }
  </div>
)
}

export default QuestionsAnswers