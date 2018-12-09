// @flow

import type { CheckboxQuestion } from "../../material-survey-format.js.flow"
import React, { useState } from "react"
import Checkbox from "@material-ui/core/Checkbox"
import QuestionContainer from "../QuestionContainer"
import styled from "styled-components"
import QuestionText from "../QuestionText"

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
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
            <CheckboxItem key={value}>
              <Checkbox onChange={onChange} checked={answer.includes(value)} />
              <QuestionText onClick={onChange}>{text}</QuestionText>
            </CheckboxItem>
          )
        })}
    </QuestionContainer>
  )
}
