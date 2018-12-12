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
  padding-top: 10px;
`

export default ({
  question,
  onChangeAnswer
}: {
  question: RatingQuestion,
  onChangeAnswer: Function
}) => {
  const [answer, changeAnswer] = useState(question.defaultAnswer || undefined)
  const {
    rateValues,
    rankings,
    minRateDescription,
    maxRateDescription,
    midRateDescription
  } = question

  return (
    <QuestionContainer question={question} answered={answer !== undefined}>
      <Slider
        onChange={(e, value) => {
          changeAnswer(value)
        }}
        style={{ opacity: answer === undefined ? 0.5 : 1, marginTop: 10 }}
        value={
          answer === undefined
            ? rateValues
              ? rateValues[Math.floor(rateValues.length / 2)]
              : 2
            : answer
        }
        min={0}
        max={rankings - 1 || rateValues ? rateValues[rateValues.length - 1] : 4}
        step={1}
      />
      {rateValues ? (
        <Row>
          {rateValues.map(r => (
            <QuestionText key={r}>{r}</QuestionText>
          ))}
        </Row>
      ) : (
        <Row>
          <QuestionText>{minRateDescription}</QuestionText>
          {midRateDescription && (
            <QuestionText>{midRateDescription}</QuestionText>
          )}
          <QuestionText>{maxRateDescription}</QuestionText>
        </Row>
      )}
    </QuestionContainer>
  )
}
