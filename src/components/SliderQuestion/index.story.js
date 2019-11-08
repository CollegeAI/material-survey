// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import SliderQuestion from "./"

storiesOf("SliderQuestion", module).add("Basic", () => (
  <SliderQuestion
    onChangeAnswer={action("onChangeAnswer")}
    question={{
      name: "slider-example",
      title: "What was your GPA in middle school?",
      type: "slider",
      min: 0,
      max: 5,
      step: 0.5
    }}
  />
))
