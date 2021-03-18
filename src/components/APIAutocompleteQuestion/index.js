// @flow

import type {
  APIAutocompleteQuestion as APIAutocompleteQuestionType,
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

const APIAutocompleteQuestion = ({
  question,
  onChangeAnswer,
  autocompleteRequest
}: {
  question: APIAutocompleteQuestionType,
  onChangeAnswer: Function,
  autocompleteRequest: AutocompleteRequestFunction
}) => {
  const [answer, changeAnswer] = useState(question.defaultAnswer || undefined)
  return (
    <QuestionContainer question={question} answered={answer !== undefined}>
      <AsyncDropdown
        id={question.id?question.id:""}
        answer={answer}
        placeholder={question.placeholder}
        requestUrl={question.requestUrl}
        autocompleteRequest={autocompleteRequest}
        onChange={onChangeAnswer}
      />
    </QuestionContainer>
  )
}

export default APIAutocompleteQuestion
