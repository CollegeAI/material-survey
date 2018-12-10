// @flow

import type { RadioGroupQuestion } from "../../material-survey-format.js.flow"
import React, { useState } from "react"
import Radio from "@material-ui/core/Radio"
import QuestionContainer from "../QuestionContainer"
import styled from "styled-components"
import QuestionText from "../QuestionText"

const RadioItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export default ({
  question,
  onChangeAnswer
}: {
  question: RadioGroupQuestion,
  onChangeAnswer: Function
}) => {
  const [answer, changeAnswer] = useState(question.defaultAnswer || undefined)
  const choices = question.choices.map(c =>
    typeof c === "string" ? { text: c, value: c } : c
  )
  return (
    <QuestionContainer question={question} answered={answer !== undefined}>
      {choices.map(({ value, text }) => {
        const onChange = () => {
          changeAnswer(value)
          onChangeAnswer(value)
        }
        return (
          <RadioItem key={value}>
            <Radio onChange={onChange} checked={answer === value} />
            <QuestionText onClick={onChange}>{text}</QuestionText>
          </RadioItem>
        )
      })}
    </QuestionContainer>
  )
}
