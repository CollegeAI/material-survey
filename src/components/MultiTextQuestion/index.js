// @flow

import type { BooleanQuestion } from "../../material-survey-format.js.flow"
import React, { useState } from "react"
import Radio from "@material-ui/core/Radio"
import Button from "@material-ui/core/Button"
import QuestionContainer from "../QuestionContainer"
import styled from "styled-components"
import QuestionText from "../QuestionText"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import { grey } from "@material-ui/core/colors"
import useQuestionAnswer from "../../hooks/use-question-answer"

const Row = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 10px;
`

const Label = styled(Typography)`
  && {
    width: 120px;
    padding-right: 8px;
    font-weight: bold;
    color: ${grey[800]};
  }
`

export default ({
  question,
  onChangeAnswer
}: {
  question: BooleanQuestion,
  onChangeAnswer: Function
}) => {
  const [{ answer, error }, changeAnswer] = useQuestionAnswer(
    question,
    onChangeAnswer,
    {}
  )
  return (
    <QuestionContainer
      question={question}
      error={error}
      answered={answer !== undefined}
    >
      {question.items.map(item => (
        <Row key={item.name}>
          <Label>{item.title}</Label>
          <TextField
            style={{ flexGrow: 1 }}
            value={answer[item.name] || ""}
            onChange={e =>
              changeAnswer({ ...answer, [item.name]: e.target.value })
            }
          />
        </Row>
      ))}
    </QuestionContainer>
  )
}
