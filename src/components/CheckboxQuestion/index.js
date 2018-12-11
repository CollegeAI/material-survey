// @flow

import type { CheckboxQuestion } from "../../material-survey-format.js.flow"
import React, { useState } from "react"
import Checkbox from "@material-ui/core/Checkbox"
import QuestionContainer from "../QuestionContainer"
import Button from "@material-ui/core/Button"
import styled from "styled-components"
import QuestionText from "../QuestionText"

const CheckboxItem = styled(Button)`
  && {
    display: flex;
    padding: 0;
    padding-right: 20px;
    text-transform: none;
    margin-top: 1px;
  }
`

export default ({
  question,
  onChangeAnswer
}: {
  question: CheckboxQuestion,
  onChangeAnswer: Function
}) => {
  const [answer, changeAnswer] = useState(question.defaultAnswer || [])
  return (
    <QuestionContainer question={question} answered={answer.length > 0}>
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
            onChangeAnswer(newAnswer)
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
