// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { zipCodeAutocompleteRequest } from "../APIAutocompleteQuestion/index.story.js"
import allQuestionsSurvey from "./all-question-types.sample.js"
import workaroundInterview from "./workaround-interview.sample.js"

import Survey from "./"

storiesOf("Survey", module)
  .add("All Question Types", () => (
    <Survey
      form={allQuestionsSurvey}
      autocompleteRequest={zipCodeAutocompleteRequest}
      onFinish={action("onFinish")}
    />
  ))
  .add("WorkAround Interview", () => (
    <Survey
      form={workaroundInterview}
      autocompleteRequest={zipCodeAutocompleteRequest}
      onFileUpload={() => Promise.resolve("http://path.to/file")}
      onFinish={action("onFinish")}
    />
  ))
  .add("WorkAround Interview with Preloaded Answers", () => (
    <Survey
      form={workaroundInterview}
      autocompleteRequest={zipCodeAutocompleteRequest}
      onFileUpload={() => Promise.resolve("http://path.to/file")}
      onFinish={action("onFinish")}
    />
  ))
