// @flow

import React, { useState, useRef } from "react"
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
import evaluateExpression from "surveyjs-expression-eval"
import validateQuestion from "../../hooks/use-question-answer/validators.js"
import QuestionContext from "../QuestionContext"

const scrollToElement = idOrElm => {
  const elm =
    typeof idOrElm === "string" ? document.getElementById(idOrElm) : idOrElm
  if (elm) {
    elm.scrollIntoView({ block: "start", behavior: "smooth" })
  }
}

const SurveyActions = styled.div`
  display: flex;
  justify-content: space-between;
`

export default function Survey({
  form,
  onFileUpload,
  onFinish,
  autocompleteRequest,
  defaultAnswers = {}
}: {
  form: SurveyMaterialFormat,
  autocompleteRequest?: AutocompleteRequestFunction,
  onFileUpload?: File => Promise<string>,
  onFinish: Object => any,
  defaultAnswers?: Object
}) {
  const [currentPage, setCurrentPage] = useState(0)
  const [answerMap, setAnswerMap] = useState(defaultAnswers)
  const [failingQuestions, changeFailingQuestions] = useState([])
  const surveyDiv = useRef(null)

  const questions = form.questions || form.pages[currentPage].elements
  const visibleQuestions = questions.filter(q =>
    q.visibleIf === undefined
      ? true
      : evaluateExpression(q.visibleIf, answerMap)
  )

  let firstPage, lastPage
  if (form.questions) {
    // single page survey
    firstPage = true
    lastPage = true
  } else {
    firstPage = currentPage === 0
    lastPage = currentPage === form.pages.length - 1
  }

  const validatePage = () => {
    const fqs: Array<{
      question: Object,
      text: string
    }> = []
    for (const question of visibleQuestions) {
      if (question.isRequired && answerMap[question.name] === undefined) {
        fqs.push({
          question,
          text: "This question is required!"
        })
        continue
      }
      if (answerMap[question.name] !== undefined) {
        const failingValidator = (question.validators || []).find(
          v => !validateQuestion(v, answerMap[question.name], answerMap)
        )
        if (failingValidator) {
          fqs.push({
            question,
            text: failingValidator.text
          })
          continue
        }
      }
    }

    changeFailingQuestions(fqs)

    if (fqs.length > 0) {
      return fqs[0]
    } else {
      return {}
    }
  }

  // TODO complex survey validator logic
  const pageComplete = true

  return (
    <div ref={surveyDiv}>
      {visibleQuestions.map(q => (
        <QuestionContext.Provider
          key={q.name}
          value={{
            error: (
              failingQuestions.find(fq => fq.question.name === q.name) || {}
            ).text
          }}
        >
          <SurveyQuestion
            question={{ ...q, defaultAnswer: answerMap[q.name] }}
            onFileUpload={onFileUpload}
            onChangeAnswer={(newAnswer: any) => {
              setAnswerMap({
                ...answerMap,
                [q.name]: newAnswer
              })
            }}
            autocompleteRequest={autocompleteRequest}
          />
        </QuestionContext.Provider>
      ))}
      <SurveyActions>
        <Button
          disabled={firstPage}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <BackIcon />
          Prev
        </Button>
        <Button
          onClick={() => {
            const { question: failingQuestion, text } = validatePage()
            if (failingQuestion) {
              scrollToElement(failingQuestion.name)
            } else {
              onFinish(answerMap)
            }
          }}
          disabled={!lastPage}
        >
          <CompleteIcon style={{ marginRight: 4 }} />
          Complete
        </Button>
        <Button
          onClick={() => {
            const { question: failingQuestion, text } = validatePage()
            if (failingQuestion) {
              scrollToElement(failingQuestion.name)
            } else {
              scrollToElement(surveyDiv.current)
              setCurrentPage(currentPage + 1)
            }
          }}
          disabled={!pageComplete || lastPage}
        >
          Next
          <NextIcon />
        </Button>
      </SurveyActions>
    </div>
  )
}
