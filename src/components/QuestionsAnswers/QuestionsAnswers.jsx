/* eslint-disable no-console */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import SearchQuestionsAnswers from './SearchQuestionsAnswers';
import QuestionsAnswersList from './QuestionsAnswersList';
import QuestionModal from './QuestionModal';

function QuestionsAnswers({ bridge, productId, productName }) {
  const [dataNum, setDataNum] = useState(4);
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  useEffect(() => {
    bridge.questions(productId)
      .then((results) => {
        setData(results.data.results);
      })
      .catch((err) => {
        throw err;
      });
  }, [productId]);

  const handleShowModal = (boolean) => {
    setShowQuestionModal(boolean);
  };
  const handleQuestionHelpful = (questionid) => {
    if (localStorage.getItem(questionid)) {
      console.log('Helpful count already updated');
    } else {
      bridge.putQuestionHelpful(questionid)
        .then(() => {
          localStorage.setItem(questionid, 'true');
          bridge.questions(productId)
            .then((results) => {
              setData(results.data.results);
            })
            .catch((err) => {
              throw err;
            });
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const handleQuestionReport = (questionid) => {
    bridge.reportQuestion(questionid)
      .then(() => {
        bridge.questions(productId)
          .then((results) => {
            setData(results.data.results);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  };

  const showQuestionsButton = () => {
    if (data.length > 4 && dataNum < data.length) {
      return (
        <>
          <QuestionsAnswersList
            bridge={bridge}
            data={data}
            dataNum={dataNum}
            productName={productName}
            handleQuestionHelpful={handleQuestionHelpful}
            handleQuestionReport={handleQuestionReport}
          />
          <button
            id="question-button"
            type="button"
            name="add-question-button"
            onClick={() => {
              setDataNum(dataNum + 4);
            }}
          >
            More Questions
          </button>
          <button type="button" onClick={() => { handleShowModal(true); }} data-testid="add-questions-button" name="add-question-button" id="add-question-button">Add a question &#43;</button>
        </>
      );
    }
    return (
      <>
        <QuestionsAnswersList
          productName={productName}
          bridge={bridge}
          data={data}
          dataNum={dataNum}
          handleQuestionHelpful={handleQuestionHelpful}
          handleQuestionReport={handleQuestionReport}
        />
        <button type="button" onClick={() => { handleShowModal(true); }} id="add-question-button" data-testid="add-questions-button">Add a question &#43;</button>
      </>
    );
  };

  const handleSearch = (searchValue) => {
    console.log(searchValue);

    if (searchValue.length >= 3) {
      const filteredData = data.filter(
        (entry) => entry.question_body
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase()),
      );
      setFiltered(filteredData);
      setIsFiltered(true);
    } else if (searchValue.length < 3) {
      setIsFiltered(false);
    }
  };

  const handlePostQuestion = (entry) => {
    bridge.postQuestion(entry)
      .then(() => {
        bridge.questions(productId)
          .then((results) => {
            setData(results.data.results);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  };

  return !data ? (
    <div className="questions-answers-overview">
      There are no questions for this product
    </div>
  ) : (
    <div className="questions-answers-overview">
      <h1 data-testid="title">Questions & Answers</h1>
      <SearchQuestionsAnswers handleSearch={handleSearch} />
      <QuestionModal
        productId={productId}
        handlePostQuestion={handlePostQuestion}
        handleShowModal={handleShowModal}
        showQuestionModal={showQuestionModal}
      />
      {isFiltered ? (
        <QuestionsAnswersList
          productName={productName}
          bridge={bridge}
          data={filtered}
          handleQuestionHelpful={handleQuestionHelpful}
          handleQuestionReport={handleQuestionReport}
        />
      )
        : (
          <>
            {showQuestionsButton()}
          </>
        )}
    </div>
  );
}
QuestionsAnswers.propTypes = {
  bridge: PropTypes.objectOf(PropTypes.func),
  productId: PropTypes.number,
  productName: PropTypes.string,
};

QuestionsAnswers.defaultProps = {
  bridge: '',
  productId: '',
  productName: '',
};

export default QuestionsAnswers;
