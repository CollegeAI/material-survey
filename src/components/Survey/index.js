// @flow

import React, { useState } from "react"
import type { SurveyMaterialFormat } from "../../material-survey-format.js.flow"
import SurveyQuestion from "../SurveyQuestion"

export default ({ form }: { form: SurveyMaterialFormat }) => {
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
        />
      ))}
    </div>
  )
}
