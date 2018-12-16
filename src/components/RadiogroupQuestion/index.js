// @flow

import type { RadioGroupQuestion } from "../../material-survey-format.js.flow"
import React, { useState } from "react"
import useQuestionAnswer from "../../hooks/use-question-answer"
import Radio from "@material-ui/core/Radio"
import QuestionContainer from "../QuestionContainer"
import Button from "@material-ui/core/Button"
import styled from "styled-components"
import QuestionText from "../QuestionText"

const RadioItem = styled(Button)`
  && {
    display: flex;
    margin-top: 1px;
    padding: 0;
    padding-right: 20px;
    text-transform: none;
  }
`

export default ({
  question,
  onChangeAnswer
}: {
  question: RadioGroupQuestion,
  onChangeAnswer: Function
}) => {
  const [{ answer, error }, changeAnswer] = useQuestionAnswer(
    question,
    onChangeAnswer,
    question.defaultAnswer || undefined
  )
  const choices = question.choices.map(c =>
    typeof c === "string" ? { text: c, value: c } : c
  )

  return (
    <QuestionContainer
      question={question}
      answered={answer !== undefined}
      error={error}
    >
      {choices.map(({ value, text }) => (
        <RadioItem onClick={() => changeAnswer(value)} key={value}>
          <Radio tabIndex={-1} checked={answer === value} />
          <QuestionText>{text}</QuestionText>
        </RadioItem>
      ))}
    </QuestionContainer>
  )
}
