import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import QuestionAnswerEntry from './QuestionAnswerEntry';

function QuestionsAnswersList({
  data, bridge, dataNum, handleQuestionHelpful, handleQuestionReport, productName, isFiltered,
}) {
  const [questionsData, setQuestionData] = useState([]);

  useEffect(() => {
    setQuestionData(data);
  });

  const questionsMap = (object) => {
    const questionsArr = [];

    Object.keys(object).forEach((key) => {
      questionsArr.push(object[key]);
    });

    return questionsArr;
  };

  return (
    <div>
      {isFiltered ? (
        <div className="questions-answers-list">
          {questionsMap(questionsData).map((question) => (
            <QuestionAnswerEntry
              productName={productName}
              key={question.question_id}
              bridge={bridge}
              question={question}
              handleQuestionHelpful={handleQuestionHelpful}
              handleQuestionReport={handleQuestionReport}
            />
          ))}
        </div>
      ) : (
        <div className="questions-answers-list">
          {questionsMap(questionsData).slice(0, dataNum).map((question) => (
            <QuestionAnswerEntry
              productName={productName}
              key={question.question_id}
              bridge={bridge}
              question={question}
              handleQuestionHelpful={handleQuestionHelpful}
              handleQuestionReport={handleQuestionReport}
            />
          ))}
        </div>
      )}
    </div>

  );
}

QuestionsAnswersList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  bridge: PropTypes.objectOf(PropTypes.func),
  dataNum: PropTypes.number,
  handleQuestionHelpful: PropTypes.func,
  handleQuestionReport: PropTypes.func,
  productName: PropTypes.string,
};

QuestionsAnswersList.defaultProps = {
  data: '',
  bridge: '',
  dataNum: '',
  handleQuestionHelpful: '',
  handleQuestionReport: '',
  productName: '',
};

export default QuestionsAnswersList;
