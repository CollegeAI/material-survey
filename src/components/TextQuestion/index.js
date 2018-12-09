// @flow

import type { TextQuestion } from "../../material-survey-format.js.flow"
import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import QuestionContainer from "../QuestionContainer"
import styled from "styled-components"
import QuestionText from "../QuestionText"

export default ({
  question,
  onChangeAnswer
}: {
  question: TextQuestion,
  onChangeAnswer: Function
}) => {
  const [answer, changeAnswer] = useState(question.defaultAnswer || "")

  return (
    <QuestionContainer question={question} answered={answer !== ""}>
      <TextField
        style={{ width: "100%" }}
        value={answer}
        multiline={question.type === "multiline-text"}
        onChange={e => {
          changeAnswer(e.target.value)
          onChangeAnswer(e.target.value)
        }}
      />
    </QuestionContainer>
  )
}
