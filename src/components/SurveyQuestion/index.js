// @flow

import React, { useState } from "react"
import type { SurveyQuestion } from "../../material-survey-format.js.flow"

import SliderQuestion from "../SliderQuestion"
import RadiogroupQuestion from "../RadiogroupQuestion"
import RatingQuestion from "../RatingQuestion"
import DropdownQuestion from "../DropdownQuestion"
import ChoiceRankerQuestion from "../ChoiceRankerQuestion"
import BooleanQuestion from "../BooleanQuestion"
import TextQuestion from "../TextQuestion"
import USRegionQuestion from "../USRegionQuestion"
import CheckboxQuestion from "../CheckboxQuestion"

export default ({
  question,
  onChangeAnswer
}: {
  question: SurveyQuestion,
  onChangeAnswer: Function
}) => {
  switch (question.type) {
    case "slider": {
      return (
        <SliderQuestion question={question} onChangeAnswer={onChangeAnswer} />
      )
    }
    case "radiogroup": {
      return (
        <RadiogroupQuestion
          question={question}
          onChangeAnswer={onChangeAnswer}
        />
      )
    }
    case "multiline-text":
    case "text": {
      return (
        <TextQuestion question={question} onChangeAnswer={onChangeAnswer} />
      )
    }
    case "dropdown":
    case "multiple-dropdown": {
      return (
        <DropdownQuestion question={question} onChangeAnswer={onChangeAnswer} />
      )
    }
    case "checkbox": {
      return (
        <CheckboxQuestion question={question} onChangeAnswer={onChangeAnswer} />
      )
    }
    case "us-region":
    case "multiple-us-region":
    case "us-state":
    case "multiple-us-state": {
      return (
        <USRegionQuestion question={question} onChangeAnswer={onChangeAnswer} />
      )
    }
    case "boolean": {
      return (
        <BooleanQuestion question={question} onChangeAnswer={onChangeAnswer} />
      )
    }
    case "choiceranker": {
      return (
        <ChoiceRankerQuestion
          question={question}
          onChangeAnswer={onChangeAnswer}
        />
      )
    }
    case "rating": {
      return (
        <RatingQuestion question={question} onChangeAnswer={onChangeAnswer} />
      )
    }
  }
}
