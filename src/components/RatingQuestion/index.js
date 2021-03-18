// @flow

import type { RatingQuestion } from "../../material-survey-format.js.flow"
import React from "react"
import QuestionContainer from "../QuestionContainer"
import styled from "styled-components"
import QuestionText from "../QuestionText"
import Slider from "@material-ui/core/Slider"
import useQuestionAnswer from "../../hooks/use-question-answer"

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
  const [{ answer, error }, changeAnswer] = useQuestionAnswer(
    question,
    onChangeAnswer,
    question.defaultAnswer || undefined
  )

  const {
    rateValues,
    rankings,
    minRateDescription,
    maxRateDescription,
    midRateDescription
  } = question

  return (
    <QuestionContainer
      question={question}
      answered={answer !== undefined}
      error={error}
    >
      <Slider
        onChange={(e, value) => changeAnswer(value)}
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
        id={question.id?question.id+"Slider":""}
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
