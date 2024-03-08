import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import QuestionsAnswers from '../components/QuestionsAnswers/QuestionsAnswers';
import '@testing-library/jest-dom';

describe('QuestionsAndAnswers', () => {
  let mockBridge;
  beforeEach(() => {
    jest.clearAllMocks();
    mockBridge = {
      questions: jest.fn().mockResolvedValue({data: {product_id: '40344', results: [{question_id: 645237, question_body: "Is this jacket durable?", question_date: "2023-02-23T00:00:00.000Z", asker_name: "afg",
      question_helpfulness: 35,
      reported: false,
      answers: {}
  }]}}),
    answers: jest.fn().mockResolvedValue({data:{
      "question": "647180",
      "page": 1,
      "count": 5,
      "results": [
          {
              "answer_id": 5993649,
              "body": "111 colors. ",
              "date": "2023-12-02T00:00:00.000Z",
              "answerer_name": "Mallory",
              "helpfulness": 3,
              "photos": []
          },
          {
              "answer_id": 5993648,
              "body": "test adding an answer",
              "date": "2023-12-02T00:00:00.000Z",
              "answerer_name": "mal",
              "helpfulness": 0,
              "photos": []
          },
          {
              "answer_id": 5993650,
              "body": "another test",
              "date": "2023-12-02T00:00:00.000Z",
              "answerer_name": "mal",
              "helpfulness": 0,
              "photos": []
          }
      ]
  }})
    }
  })


it('QuestionsAnswers component exists', async() => {
    const { findByText, getByTestId } = await act(async() => render(
      <QuestionsAnswers bridge={mockBridge}/>
    ))

  expect(screen.getByTestId('title').textContent).toEqual('Questions & Answers')

})

it('')


})