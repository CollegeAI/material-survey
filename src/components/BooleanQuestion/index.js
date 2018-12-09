// @flow

import type { BooleanQuestion } from "../../material-survey-format.js.flow"
import React, { useState } from "react"
import Radio from "@material-ui/core/Radio"
import QuestionContainer from "../QuestionContainer"
import styled from "styled-components"
import QuestionText from "../QuestionText"

const Row = styled.div`
  display: flex;
  align-items: center;
`

const AnswerContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export default ({
  question,
  onChangeAnswer
}: {
  question: BooleanQuestion,
  onChangeAnswer: Function
}) => {
  const [answer, changeAnswer] = useState(question.defaultAnswer || undefined)
  return (
    <QuestionContainer question={question} answered={answer !== undefined}>
      <Row>
        <AnswerContainer
          onClick={() => {
            changeAnswer(true)
            onChangeAnswer(true)
          }}
          style={{ marginRight: 20 }}
        >
          <Radio checked={answer === true} />
          <QuestionText>Yes</QuestionText>
        </AnswerContainer>
        <AnswerContainer
          onClick={() => {
            changeAnswer(false)
            onChangeAnswer(false)
          }}
        >
          <Radio checked={answer === false} />
          <QuestionText>No</QuestionText>
        </AnswerContainer>
      </Row>
    </QuestionContainer>
  )
}
