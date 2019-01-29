// @flow

import React, { useState } from "react"
import type { Question } from "../material-survey-format.js.flow"
import checkValidator from "./validators.js"

export default (
  question: Question,
  onChangeAnswer: Function,
  backupAnswer: any
) => {
  const { validators = [], defaultAnswer = backupAnswer } = question
  const [state, changeState] = useState({
    answer: defaultAnswer,
    error: null
  })

  return [
    state,
    (newAnswer: any) => {
      for (const validator of validators) {
        if (!checkValidator(validator, newAnswer)) {
          changeState({
            answer: newAnswer,
            error: validator.text || "Invalid input, please correct!"
          })
          return
        }
      }
      const isNumeric = validators.map(v => v.type).includes("numeric")
      if (typeof newAnswer === "string" && isNumeric) {
        onChangeAnswer(parseFloat(newAnswer))
      } else {
        onChangeAnswer(newAnswer)
      }
      changeState({ answer: newAnswer, error: null })
    }
  ]
}
