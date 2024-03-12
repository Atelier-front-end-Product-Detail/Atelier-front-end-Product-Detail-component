import React, { useState, useEffect } from 'react';
import AnswerModal from './AnswerModal';

function QuestionAnswerEntry({
  bridge, question, handleQuestionHelpful, handleQuestionReport, productName,
}) {
  const [answersData, setAnswersData] = useState([]);
  const [showAnswerModal, setAnswerModal] = useState(false);
  const [showAnswers, setShowAnswers] = useState(2);

  useEffect(() => {
    bridge.answers(question.question_id)
      .then((results) => {
        setAnswersData(results.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const answersMap = (object) => {
    const answersArr = [];

    for (const key in object) {
      if (key === 'results') {
        for (const nestedKey in object[key]) {
          answersArr.push(object[key][nestedKey]);
        }
      }
    }

    answersArr.sort((a, b) => b.helpfulness - a.helpfulness);
    return answersArr;
  };

  const handleAnswerSubmit = (data) => {
    bridge.postAnswer(question.question_id, data)
      .then(() => {
        bridge.answers(question.question_id)
          .then((results) => {
            setAnswersData(results.data);
          })
          .catch((err) => {
            throw err;
          });
        console.log('Successful post to question');
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleAnswerReport = (answerid) => {
    bridge.reportAnswer(answerid)
      .then(() => {
        bridge.answers(question.question_id)
          .then((results) => {
            setAnswersData(results.data);
            console.log(results.data);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleAnswerHelpful = (answerid) => {
    if (localStorage.getItem(answerid)) {
      console.log('Answer helpful count already updated');
    } else {
      bridge.putAnswerHelpful(answerid)
        .then(() => {
          localStorage.setItem(answerid, 'true');
          bridge.answers(question.question_id)
            .then((results) => {
              setAnswersData(results.data);
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

  const getTime = () => {
    const time = new Date();
    return (`${time.getHours()}:${time.getMinutes()}:`, time.getSeconds()).toString();
  };

  const showMoreAnswers = () => {
    if (answersMap(answersData).length > 2 && showAnswers < answersMap(answersData).length) {
      return (
        <div>
          {answersMap(answersData).slice(0, showAnswers).map((answer) => (
            <div key={answer.answer_id} className="answer-container">
              <div className="answer-a-container">
                <p className="answer-A">A: </p>
                <p className="answer-body">{answer.body}</p>
              </div>
              <div className="answer-helpful-container">
                <p className="helpful-answer-info">
                  by
                  {answer.answerer_name}
                  ,
                  {new Date(answer.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p
                  data-testid="helpful-answer-put"
                  className="helpful-answer"
                  onClick={() => {
                    handleAnswerHelpful(answer.answer_id);
                  }}
                >
                  Helpful? (
                  {answer.helpfulness}
                  )
                </p>
                <p
                  data-testid="answer-report"
                  className="helpful-answer-report"
                  onClick={() => {
                    handleAnswerReport(answer.answer_id);
                  }}
                >
                  Report
                </p>
              </div>
              {answer.photos.map((photo) => (
                <img
                  key={photo.id}
                  src={photo.url}
                  className="answer-photo"
                  alt="img"
                />
              ))}
              <div />
            </div>
          ))}
          <p className="answers-button" onClick={() => { setShowAnswers(showAnswers + 2); }}>Load More answers</p>
        </div>
      );
    }
    return (
      <div>
        {answersMap(answersData).map((answer) => (
          <div key={answer.answer_id} className="answer-container">
            <div className="answer-a-container">
              <p className="answer-A">A: </p>
              <p className="answer-body">{answer.body}</p>
            </div>
            <div className="answer-helpful-container">
              <p className="helpful-answer-info">
                by
                {answer.answerer_name}
                ,
                {new Date(answer.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p
                data-testid="answer-helpful-inc"
                className="helpful-answer"
                onClick={() => {
                  handleAnswerHelpful(answer.answer_id);
                }}
              >
                Helpful? (
                {answer.helpfulness}
                )
              </p>
              <p
                data-testid="report-answer"
                className="helpful-answer-report"
                onClick={() => {
                  handleAnswerReport(answer.answer_id);
                }}
              >
                Report
              </p>
            </div>
            {answer.photos.map((photo) => (
              <img key={photo.id} src={photo.url} className="answer-photo" />
            ))}
            <div />
          </div>
        ))}
      </div>
    );
  };
  // const handleInteraction = (data) => {
  //   bridge.QAInteractionLog(data)
  //   .then(() => {
  //     console.log("interaction logged")
  //   })
  //   .catch((err) => {
  //     throw err;
  //   })
  //   console.log(data)
  // }

  // const date = () => {
  //   const today = new Date();

  //   return (today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()).toString();
  // }

  return (
    <div className="questions-answers-container">
      <AnswerModal showAnswerModal={showAnswerModal} productName={productName} setAnswerModal={setAnswerModal} handleAnswerSubmit={handleAnswerSubmit} question={question.question_body} />
      <div className="question-container">
        <div className="question-title-container">
          <p className="question-title">
            Q:
            {question.question_body}
          </p>
        </div>

        <div className="question-helpful-container">
          <p
            data-testid="helpful-count-inc"
            className="helpful-question"
            onClick={() => {
              handleQuestionHelpful(question.question_id);
            }}
          >
            Helpful? YES (
            {question.question_helpfulness}
            )
          </p>
          <p
            data-testid="helpful-question-add-answer"
            className="helpful-question-add-answer"
            onClick={() => {
              setAnswerModal(!showAnswerModal);
            }}
          >
            {' '}
            Add Answer
          </p>
          <p
            data-testid="question-report"
            className="helpful-question-report"
            onClick={() => {
              handleQuestionReport(question.question_id);
            }}
          >
            Report
          </p>
        </div>
      </div>
      {showMoreAnswers()}
    </div>
  );
}

export default QuestionAnswerEntry;
