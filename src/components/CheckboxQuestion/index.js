// @flow

import type { CheckboxQuestion as CheckboxQuestionType } from "../../material-survey-format.js.flow"
import React from "react"
import Checkbox from "@material-ui/core/Checkbox"
import QuestionContainer from "../QuestionContainer"
import Button from "@material-ui/core/Button"
import styled from "styled-components"
import QuestionText from "../QuestionText"
import useQuestionAnswer from "../../hooks/use-question-answer"
import TextField from "@material-ui/core/TextField"

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
            let newAnswer = answer.includes(value)
              ? answer.filter(a => a !== value)
              : answer.concat([value])
            if (!question.hasOther) newAnswer = newAnswer.sort()
            changeAnswer(newAnswer)
          }
          return (
            <CheckboxItem
              role="button"
              onClick={onChange}
              key={value}
            >
              <Checkbox
                tabIndex={-1}
                checked={answer.includes(value)}
                id={question.id?question.id+text:""}
              />
              <QuestionText>{text}</QuestionText>
            </CheckboxItem>
          )
        })}
      {question.hasOther &&
        answer
          .concat(null)
          .filter(
            a => !question.choices.some(c => c === a || (c || {}).value === a)
          )
          .map((otherValue, i) => (
            <CheckboxItem
              role="button"
            >
              <Checkbox
                tabIndex={-1}
                onClick={() => {
                  if (otherValue !== null) {
                    changeAnswer(answer.filter(a => a !== otherValue))
                  } else {
                    changeAnswer([
                      ...answer.slice(0, i),
                      "",
                      ...answer.slice(i + 1)
                    ])
                  }
                }}
                checked={otherValue !== null}
              />
              <TextField
                value={otherValue || ""}
                onChange={e => {
                  changeAnswer([
                    ...answer.slice(0, i),
                    e.target.value,
                    ...answer.slice(i + 1)
                  ])
                }}
              />
            </CheckboxItem>
          ))}
    </QuestionContainer>
  )
}
