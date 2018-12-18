// @flow

import type { RadioGroupQuestion as RadioGroupQuestionType } from "../../material-survey-format.js.flow"
import React, { useState } from "react"
import useQuestionAnswer from "../../hooks/use-question-answer"
import Radio from "@material-ui/core/Radio"
import QuestionContainer from "../QuestionContainer"
import Button from "@material-ui/core/Button"
import styled from "styled-components"
import QuestionText from "../QuestionText"
import TextField from "@material-ui/core/TextField"

const RadioItem = styled(Button)`
  && {
    display: flex;
    margin-top: 1px;
    padding: 0;
    padding-right: 20px;
    text-transform: none;
  }
`

const RadioItemNoRipple = styled.div`
  && {
    display: flex;
    margin-top: 1px;
    padding: 0;
    padding-right: 20px;
    align-items: center;
    input {
      font-size: 14px;
      font-weight: 500;
    }
  }
`

export default function RadioGroupQuestion({
  question,
  onChangeAnswer
}: {
  question: RadioGroupQuestionType,
  onChangeAnswer: Function
}) {
  const [{ answer, error }, changeAnswer] = useQuestionAnswer(
    question,
    onChangeAnswer,
    question.defaultAnswer || undefined
  )
  const [otherText, changeOtherText] = useState(
    question.choices.some(c => c === answer || (c || {}).value === answer)
      ? ""
      : answer
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
      {question.hasOther && (
        <RadioItemNoRipple tabIndex={-1}>
          <Radio
            checked={answer === otherText}
            onClick={() => changeAnswer(otherText)}
          />
          <TextField
            // inputProps={{ style: { fontSize: 8 } }}
            value={otherText}
            onChange={e => {
              if (answer === otherText) {
                changeOtherText(e.target.value)
                changeAnswer(e.target.value)
              } else {
                changeOtherText(e.target.value)
              }
            }}
          />
        </RadioItemNoRipple>
      )}
    </QuestionContainer>
  )
}
