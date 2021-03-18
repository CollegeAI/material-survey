// @flow

import type { DropdownQuestion } from "../../material-survey-format.js.flow"
import React from "react"
import useQuestionAnswer from "../../hooks/use-question-answer"
import QuestionContainer from "../QuestionContainer"
import Dropdown from "./Dropdown"

export default ({
  question,
  onChangeAnswer
}: {
  question: DropdownQuestion,
  onChangeAnswer: Function
}) => {
  const multiple = question.type === "multiple-dropdown"
  const [{ answer, error }, changeAnswer] = useQuestionAnswer(
    question,
    onChangeAnswer,
    multiple ? [] : undefined
  )
  return (
    <QuestionContainer
      question={question}
      answered={answer !== undefined}
      error={error}
    >
      <Dropdown
        id={question.id?question.id:""}
        answer={answer}
        multiple={multiple}
        choices={question.choices}
        changeAnswer={changeAnswer}
      />
    </QuestionContainer>
  )
}
