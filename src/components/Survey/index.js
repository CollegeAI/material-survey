// @flow

import React, { useState } from "react"
import type {
  SurveyMaterialFormat,
  AutocompleteRequestFunction
} from "../../material-survey-format.js.flow"
import SurveyQuestion from "../SurveyQuestion"

export default ({
  form,
  autocompleteRequest
}: {
  form: SurveyMaterialFormat,
  autocompleteRequest?: AutocompleteRequestFunction
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
    </div>
  )
}
