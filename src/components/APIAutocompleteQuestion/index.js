// @flow

import type {
  APIAutocompleteQuestion,
  AutocompleteRequestFunction
} from "../../material-survey-format.js.flow"
import React, { useState } from "react"
import Radio from "@material-ui/core/Radio"
import QuestionContainer from "../QuestionContainer"
import styled from "styled-components"
import QuestionText from "../QuestionText"
import AsyncDropdown from "../AsyncDropdown"

const Row = styled.div`
  display: flex;
  align-items: center;
`

const AnswerContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export default ({
  question,
  onChangeAnswer,
  autocompleteRequest
}: {
  question: APIAutocompleteQuestion,
  onChangeAnswer: Function,
  autocompleteRequest: AutocompleteRequestFunction
}) => {
  const [answer, changeAnswer] = useState(question.defaultAnswer || undefined)
  return (
    <QuestionContainer question={question} answered={answer !== undefined}>
      <AsyncDropdown
        answer={answer}
        requestUrl={question.requestUrl}
        autocompleteRequest={autocompleteRequest}
        onChange={onChangeAnswer}
      />
    </QuestionContainer>
  )
}
