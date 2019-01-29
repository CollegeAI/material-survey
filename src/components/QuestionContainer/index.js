// @flow

import React, { Fragment, useContext } from "react"
import type { BaseQuestion } from "../../material-survey-format.js.flow"
import QuestionContext from "../QuestionContext"
import CardQuestionContainer from "../CardQuestionContainer"
import FlatQuestionContainer from "../FlatQuestionContainer"

export default function QuestionContainer(props: {
  question: BaseQuestion,
  answered: boolean,
  error?: ?string,
  children: any,
  fadedTitle?: string
}) {
  const { containerStyleType } = useContext(QuestionContext) || {}

  if (containerStyleType === undefined || containerStyleType === "paper") {
    return <CardQuestionContainer {...props} />
  } else if (containerStyleType === "flat") {
    return <FlatQuestionContainer {...props} />
  }
}
