// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import SurveyQuestion from "./"

storiesOf("SurveyQuestion", module).add("Slider", () => (
  <SurveyQuestion
    question={{
      type: "slider",
      title: "What was your middle school GPA?",
      name: "slider-example",
      min: 1,
      max: 4,
      step: 0.1
    }}
    onChangeAnswer={action("onChangeAnswer")}
  />
))
