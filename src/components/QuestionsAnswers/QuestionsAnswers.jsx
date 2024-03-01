import SearchQuestionsAnswers from './SearchQuestionsAnswers.jsx'
import QuestionsAnswersList from './QuestionsAnswersList.jsx'
import React, {useState, useEffect} from 'react';


const QuestionsAnswers = ({bridge}) => {
return (
  <>
    <SearchQuestionsAnswers />
    <QuestionsAnswersList bridge={bridge}/>
  </>
)
}

export default QuestionsAnswers