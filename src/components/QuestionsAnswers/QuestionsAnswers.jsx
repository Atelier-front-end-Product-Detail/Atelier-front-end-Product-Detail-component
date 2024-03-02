import SearchQuestionsAnswers from './SearchQuestionsAnswers.jsx'
import QuestionsAnswersList from './QuestionsAnswersList.jsx'
import React, {useState, useEffect} from 'react';


const QuestionsAnswers = ({bridge}) => {
  const [data, setData] = useState([])
  const [filtered, setFiltered] = useState([])
  useEffect(() => {
    bridge.questions(40344)
    .then((results) => {
      setData(results.data.results)

    })
    .catch((err) => {
      throw err;
    })
  },[])

  const handleSearch = (searchValue) => {
    console.log(searchValue)
    const filtered = data.filter((entry) => {
      entry.question_body.toString().toLowerCase().includes(searchValue.toLowerCase())
    })

    console.log(filtered)
  }

return (
  <>
    <SearchQuestionsAnswers handleSearch={handleSearch}/>
    <QuestionsAnswersList bridge={bridge} data={data}/>
  </>
)
}

export default QuestionsAnswers