import React, { useState, useEffect } from 'react';
import QuestionAnswerEntry from './QuestionAnswerEntry';

function QuestionsAnswersList({
  data, bridge, dataNum, handleQuestionHelpful, handleQuestionReport, productName,
}) {
  const [questionsData, setQuestionData] = useState([]);

  useEffect(() => {
    setQuestionData(data);
  });

  const questionsMap = (object) => {
    const questionsArr = [];

    for (const key in object) {
      questionsArr.push(object[key]);
    }

    questionsArr.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
    return questionsArr;
  };

  return (
    <div className="questions-answers-list">
      {questionsMap(questionsData).slice(0, dataNum).map((question) => (
        <QuestionAnswerEntry productName={productName} key={question.question_id} bridge={bridge} question={question} handleQuestionHelpful={handleQuestionHelpful} handleQuestionReport={handleQuestionReport} />
      ))}
    </div>
  );
}

export default QuestionsAnswersList;
