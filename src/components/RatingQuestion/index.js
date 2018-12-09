// @flow

import type { RatingQuestion } from "../../material-survey-format.js.flow"
import React, { useState } from "react"
import QuestionContainer from "../QuestionContainer"
import styled from "styled-components"
import QuestionText from "../QuestionText"
import Slider from "@material-ui/lab/Slider"

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
`

export default ({
  question,
  onChangeAnswer
}: {
  question: RatingQuestion,
  onChangeAnswer: Function
}) => {
  const [answer, changeAnswer] = useState(question.defaultAnswer || undefined)
  return (
    <QuestionContainer question={question} answered={answer !== undefined}>
      <Slider
        onChange={(e, value) => {
          changeAnswer(value)
        }}
        style={{ opacity: answer === undefined ? 0.5 : 1 }}
        value={answer === undefined ? 2 : answer}
        min={0}
        max={question.rankings - 1 || 4}
        step={1}
      />
      <Row>
        <QuestionText>{question.minRateDescription}</QuestionText>
        {question.midRateDescription && (
          <QuestionText>{question.midRateDescription}</QuestionText>
        )}
        <QuestionText>{question.maxRateDescription}</QuestionText>
      </Row>
    </QuestionContainer>
  )
}
