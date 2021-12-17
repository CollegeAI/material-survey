// @flow

import type { BooleanQuestion as BooleanQuestionType } from "../../material-survey-format.js.flow"
import React, { useState } from "react"
import useQuestionAnswer from "../../hooks/use-question-answer"
import Radio from "@mui/material/Radio"
import Button from "@mui/material/Button"
import QuestionContainer from "../QuestionContainer"
import styled from "styled-components"
import QuestionText from "../QuestionText"

const Row = styled.div`
  display: flex;
  align-items: center;
`

const AnswerContainer = styled(Button)`
  && {
    padding: 0;
    padding-right: 20px;
    text-transform: none;
  }
`

export default function BooleanQuestion({
  question,
  onChangeAnswer
}: {
  question: BooleanQuestionType,
  onChangeAnswer: Function
}) {
  const [{ answer, error }, changeAnswer] = useQuestionAnswer(
    question,
    onChangeAnswer
  )
  return (
    <QuestionContainer
      error={error}
      question={question}
      answered={answer !== undefined}
    >
      <Row>
        <AnswerContainer
          onClick={() => changeAnswer(true)}
          style={{ marginRight: 20 }}
          role="button"
        >
          <Radio checked={answer === true} id={question.id?question.id+"Yes":""} />
          <QuestionText>Yes</QuestionText>
        </AnswerContainer>
        <AnswerContainer
          role="button"
          onClick={() => changeAnswer(false)}
        >
          <Radio checked={answer === false} id={question.id?question.id+"No":""}/>
          <QuestionText>No</QuestionText>
        </AnswerContainer>
      </Row>
    </QuestionContainer>
  )
}
