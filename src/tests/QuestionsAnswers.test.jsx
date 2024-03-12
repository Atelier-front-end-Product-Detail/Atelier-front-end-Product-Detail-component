import React from 'react';
import {
  render, fireEvent, screen, waitFor, act, cleanup,
} from '@testing-library/react';
import QuestionsAnswers from '../components/QuestionsAnswers/QuestionsAnswers';
import '@testing-library/jest-dom';

describe('QuestionsAndAnswers', () => {
  afterEach(cleanup);
  let mockBridge;
  beforeEach(() => {
    jest.clearAllMocks();
    mockBridge = {
      questions: jest.fn().mockResolvedValue({
        data: {
          product_id: '40344',
          results: [{
            question_id: 645237,
            question_body: 'Is this jacket durable?',
            question_date: '2023-02-23T00:00:00.000Z',
            asker_name: 'afg',
            question_helpfulness: 35,
            reported: false,
            answers: {
              5993737: {
                id: 5993737,
                body: 'DAIRY QUEENS',
                date: '2024-03-08T00:00:00.000Z',
                answerer_name: 'da queens',
                helpfulness: 3,
                photos: [],
              },
              5993744: {
                id: 5993744,
                body: 'BeAgLEs',
                date: '2024-03-08T00:00:00.000Z',
                answerer_name: 'beagles',
                helpfulness: 3,
                photos: [
                  'blob:http://localhost:3000/d43f3142-b340-4690-8fdc-31adc0b74de5',
                ],
              },
              5993756: {
                id: 5993756,
                body: 'mt rushmore',
                date: '2024-03-09T00:00:00.000Z',
                answerer_name: 'president man',
                helpfulness: 0,
                photos: [],
              },
            },
          }],
        },
      }),
      answers: jest.fn().mockResolvedValue({
        data: {
          question: '647180',
          page: 1,
          count: 5,
          results: [
            {
              answer_id: 5993649,
              body: '111 colors. ',
              date: '2023-12-02T00:00:00.000Z',
              answerer_name: 'Mallory',
              helpfulness: 3,
              photos: [],
            },
            {
              answer_id: 5993648,
              body: 'test adding an answer',
              date: '2023-12-02T00:00:00.000Z',
              answerer_name: 'mal',
              helpfulness: 0,
              photos: [],
            },
            {
              answer_id: 5993650,
              body: 'another test',
              date: '2023-12-02T00:00:00.000Z',
              answerer_name: 'mal',
              helpfulness: 0,
              photos: [],
            },
          ],
        },
      }),
      postQuestion: jest.fn().mockImplementation(() => Promise.resolve()),
      putQuestionHelpful: jest.fn().mockImplementation(() => Promise.resolve()),
      reportQuestion: jest.fn().mockImplementation(() => Promise.resolve()),
      postAnswer: jest.fn().mockImplementation(() => Promise.resolve()),
      reportAnswer: jest.fn().mockImplementation(() => Promise.resolve()),
      putAnswerHelpful: jest.fn().mockImplementation(() => Promise.resolve()),
    };
  });

  it('QuestionsAnswers component exists', async () => {
    const { findByText, queryByTestId } = await act(async () => render(
      <QuestionsAnswers bridge={mockBridge} />,
    ));
    expect(screen.queryByTestId('title').textContent).toEqual('Questions & Answers');
  });

  it('should filter data on search', async () => {
    const handleSearch = jest.fn();
    const { findByText, queryByTestId } = await act(async () => render(
      <QuestionsAnswers bridge={mockBridge} />,
    ));
    const searchInput = screen.queryByTestId('search');
    fireEvent.change(searchInput, { target: { value: 'a' } });
    expect(searchInput.value).toEqual('a');
  });

  it('should post a question', async () => {
    const { alert } = window;
    window.alert = jest.fn(() => ({}));
    const { findByText, queryByTestId } = await act(async () => render(
      <QuestionsAnswers bridge={mockBridge} />,
    ));
    const addQuestion = screen.queryByTestId('add-questions-button');
    const submitQuestion = screen.queryByTestId('submit-questions-bttn');
    fireEvent.click(addQuestion);
    waitFor(() => expect(findByText('Enter your question')).toBeInTheDocument());
    fireEvent.change(queryByTestId('question-body'), { target: { value: 'TEST' } });
    fireEvent.click(submitQuestion);
    expect(mockBridge.postQuestion).toBeCalled();
    window.alert = alert;
  });

  it('should post an answer', async () => {
    const { alert } = window;
    window.alert = jest.fn(() => ({}));
    const { findByText, queryByTestId, getByText } = await act(async () => render(
      <QuestionsAnswers bridge={mockBridge} />,
    ));
    const postAnswerBttn = screen.queryByTestId('helpful-question-add-answer');
    const submitAnswer = screen.queryByTestId('answer-submit');
    fireEvent.click(postAnswerBttn);
    expect(getByText('Enter a answer *')).toBeInTheDocument();
    fireEvent.change(queryByTestId('answer-body'), { target: { value: 'TEST' } });
    fireEvent.change(queryByTestId('answer-user'), { target: { value: 'TEST' } });
    fireEvent.change(queryByTestId('answer-email'), { target: { value: 'TEST@gmail.com' } });

    fireEvent.click(submitAnswer);
    expect(mockBridge.postAnswer).toBeCalled();
    window.alert = alert;
  });

  it('should report a question', async () => {
    const {
      findByText, queryAllByTestId, getByText, getByRole,
    } = await act(async () => render(
      <QuestionsAnswers bridge={mockBridge} />,
    ));
    const reportbttn = screen.queryAllByTestId('question-report')[0];
    fireEvent.click(reportbttn);
    expect(mockBridge.reportQuestion).toBeCalled();
  });

  it('should update helpful count for question', async () => {
    const {
      findByText, queryAllByTestId,
    } = await act(async () => render(
      <QuestionsAnswers bridge={mockBridge} />,
    ));
    const helpfulBttn = screen.queryAllByTestId('helpful-count-inc')[0];
    fireEvent.click(helpfulBttn);
    expect(mockBridge.putQuestionHelpful).toBeCalled();
  });

  it('should report an answer', async () => {
    const {
      findByText, queryAllByTestId, queryByTestId, queryAllByText,
    } = await act(async () => render(
      <QuestionsAnswers bridge={mockBridge} />,
    ));
    const reportAnswer = screen.queryAllByTestId('answer-report')[0];
    fireEvent.click(reportAnswer);
    expect(mockBridge.reportAnswer).toBeCalled();
  });

  it('should update helpfulcount for answer', async () => {
    await act(async () => render(
      <QuestionsAnswers bridge={mockBridge} />,

    ));
    const answer = await screen.findByText('111 colors.');
    expect(answer).toBeInTheDocument();
    const helpfulbttn = screen.queryAllByTestId('helpful-answer-put')[0];
    fireEvent.click(helpfulbttn);
    expect(mockBridge.putAnswerHelpful).toBeCalled();
  });
});
