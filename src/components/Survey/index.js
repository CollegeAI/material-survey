// @flow

import React, { useState } from "react"
import type {
  SurveyMaterialFormat,
  AutocompleteRequestFunction
} from "../../material-survey-format.js.flow"
import SurveyQuestion from "../SurveyQuestion"
import Button from "@material-ui/core/Button"
import BackIcon from "@material-ui/icons/KeyboardArrowLeft"
import NextIcon from "@material-ui/icons/KeyboardArrowRight"
import CompleteIcon from "@material-ui/icons/Check"
import styled from "styled-components"

const SurveyActions = styled.div`
  display: flex;
  justify-content: space-between;
`

export default ({
  form,
  onFinish,
  autocompleteRequest
}: {
  form: SurveyMaterialFormat,
  autocompleteRequest?: AutocompleteRequestFunction,
  onFinish: Object => any
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [answerMap, setAnswerMap] = useState()
  const setAnswer = (name: string, value: any) => {
    setAnswerMap({
      ...answerMap,
      [name]: value
    })
  }

  const questions = form.questions || form.pages[currentPage].elements

  let firstPage, lastPage
  if (form.questions) {
    // single page survey
    firstPage = true
    lastPage = true
  } else {
    firstPage = currentPage === 0
    lastPage = currentPage === form.pages.length - 1
  }

  // TODO complex survey validator logic
  const pageComplete = true

  return (
    <div>
      {questions.map(q => (
        <SurveyQuestion
          key={q.name}
          question={q}
          onChangeAnswer={(newAnswer: any) => {
            setAnswer(q.name, newAnswer)
          }}
          autocompleteRequest={autocompleteRequest}
        />
      ))}
      <SurveyActions>
        <Button
          disabled={firstPage}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <BackIcon />
          Prev
        </Button>
        <Button onClick={() => onFinish(answerMap)} disabled={!lastPage}>
          <CompleteIcon style={{ marginRight: 4 }} />
          Complete
        </Button>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={!pageComplete || lastPage}
        >
          Next
          <NextIcon />
        </Button>
      </SurveyActions>
    </div>
  )
}
