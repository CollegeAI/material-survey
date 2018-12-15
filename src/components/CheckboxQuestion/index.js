// @flow

import type { CheckboxQuestion as CheckboxQuestionType } from "../../material-survey-format.js.flow"
import React from "react"
import Checkbox from "@material-ui/core/Checkbox"
import QuestionContainer from "../QuestionContainer"
import Button from "@material-ui/core/Button"
import styled from "styled-components"
import QuestionText from "../QuestionText"
import useQuestionAnswer from "../../hooks/use-question-answer"

const CheckboxItem = styled(Button)`
  && {
    display: flex;
    padding: 0;
    padding-right: 20px;
    text-transform: none;
    margin-top: 1px;
  }
`

export default function CheckboxQuestion({
  question,
  onChangeAnswer
}: {
  question: CheckboxQuestionType,
  onChangeAnswer: Function
}) {
  const [{ answer, error }, changeAnswer] = useQuestionAnswer(
    question,
    onChangeAnswer,
    []
  )
  return (
    <QuestionContainer
      question={question}
      answered={answer.length > 0}
      error={error}
    >
      {question.choices
        .map(choice =>
          typeof choice === "string" ? { value: choice, text: choice } : choice
        )
        .map(({ value, text }) => {
          const onChange = () => {
            const newAnswer = (answer.includes(value)
              ? answer.filter(a => a !== value)
              : answer.concat([value])
            ).sort()
            changeAnswer(newAnswer)
          }
          return (
            <CheckboxItem onClick={onChange} key={value}>
              <Checkbox tabIndex={-1} checked={answer.includes(value)} />
              <QuestionText>{text}</QuestionText>
            </CheckboxItem>
          )
        })}
    </QuestionContainer>
  )
}
