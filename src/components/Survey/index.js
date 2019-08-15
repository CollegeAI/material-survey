// @flow

import React, { useState, useRef, useMemo } from "react"
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
  justify-content: ${({ onlyOnePage }) =>
    !onlyOnePage ? "space-between" : "space-around"};
`

type Props = {
  form: SurveyMaterialFormat,
  variant?: "flat" | "paper",
  autocompleteRequest?: AutocompleteRequestFunction,
  onFileUpload?: File => Promise<string>,
  noActions?: boolean,
  completeText?: any,
  onFinish?: Object => any,
  onQuestionChange?: (
    questionId: string,
    newValue: any,
    answers: Object
  ) => any,
  defaultAnswers?: Object
}

export default function Survey({
  form,
  onFileUpload,
  noActions,
  completeText,
  variant = "paper",
  onFinish = () => null,
  autocompleteRequest,
  onQuestionChange = () => null,
  defaultAnswers = {}
}: Props) {
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

  const onlyOnePage = firstPage && lastPage

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
            ).text,
            containerStyleType: variant
          }}
        >
          <SurveyQuestion
            question={{ ...q, defaultAnswer: defaultAnswers[q.name] }}
            onFileUpload={onFileUpload}
            onChangeAnswer={(newAnswer: any) => {
              const newAnswerMap = {
                ...answerMap,
                [q.name]: newAnswer
              }
              setAnswerMap(newAnswerMap)
              onQuestionChange(q.name, newAnswer, newAnswerMap)
            }}
            autocompleteRequest={autocompleteRequest}
          />
        </QuestionContext.Provider>
      ))}
      {!noActions && (
        <SurveyActions onlyOnePage={onlyOnePage}>
          {!onlyOnePage && (
            <Button
              disabled={firstPage}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <BackIcon />
              Prev
            </Button>
          )}
          <Button
            onClick={() => {
              const { question: failingQuestion, text } = validatePage()
              if (failingQuestion) {
                scrollToElement(failingQuestion.name)
              } else {
                onFinish(answerMap)
              }
            }}
            disabled={!lastPage || !pageComplete}
          >
            {completeText ? (
              completeText
            ) : (
              <>
                <CompleteIcon style={{ marginRight: 4 }} />
                Complete
              </>
            )}
          </Button>
          {!onlyOnePage && (
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
          )}
        </SurveyActions>
      )}
    </div>
  )
}
