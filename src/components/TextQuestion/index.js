// @flow

import type { TextQuestion } from "../../material-survey-format.js.flow"
import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import QuestionContainer from "../QuestionContainer"
import styled from "styled-components"
import QuestionText from "../QuestionText"
import useQuestionAnswer from "../../hooks/use-question-answer"

export default ({
  question,
  onChangeAnswer
}: {
  question: TextQuestion,
  onChangeAnswer: Function
}) => {
  const [{ answer, error }, changeAnswer] = useQuestionAnswer(
    question,
    onChangeAnswer,
    ""
  )

  return (
    <QuestionContainer
      question={question}
      error={error}
      answered={answer !== ""}
    >
      <TextField
        style={{ width: "100%" }}
        value={answer}
        multiline={question.type === "multiline-text"}
        onChange={e => changeAnswer(e.target.value)}
      />
    </QuestionContainer>
  )
}
