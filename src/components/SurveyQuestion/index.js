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

export default ({ question }: { question: SurveyQuestion }) => {
  switch (question.type) {
    case "slider": {
      return <SliderQuestion question={question} />
    }
    case "radiogroup": {
      return <RadiogroupQuestion question={question} />
    }
    case "multiline-text":
    case "text": {
      return <TextQuestion question={question} />
    }
    case "dropdown":
    case "multiple-dropdown": {
      return <DropboxQuestion question={question} />
    }
    case "checkbox": {
      return <CheckboxQuestion question={question} />
    }
    case "us-region":
    case "multiple-us-region":
    case "us-state":
    case "multiple-us-state": {
      return <USRegionQuestion question={question} />
    }
    case "boolean": {
      return <BooleanQuestion question={question} />
    }
  }
}
