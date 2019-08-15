// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { zipCodeAutocompleteRequest } from "../APIAutocompleteQuestion/index.story.js"
import allQuestionsSurvey from "./all-question-types.sample.js"
import workaroundInterview from "./workaround-interview.sample.js"
import validatorsSurvey from "./validators.sample.js"
import { questionList as collegeaiSurvey } from "./collegeai-survey.sample.js"

import Survey from "./"

storiesOf("Survey", module)
  .add("All Question Types", () => (
    <Survey
      form={allQuestionsSurvey}
      autocompleteRequest={zipCodeAutocompleteRequest}
      onFinish={action("onFinish")}
    />
  ))
  .add("Override Default Answers", () => (
    <Survey
      form={allQuestionsSurvey}
      autocompleteRequest={zipCodeAutocompleteRequest}
      onFinish={action("onFinish")}
      defaultAnswers={{
        "brown-bear": ["Brown Bear", "Grizzly Bear"],
        "dropdown-feeling": "It's great!",
        "like-boolean": true,
        "mouse-size": 4,
        "global-warming": 3,
        "preferred-us-region": "far-west",
        "sauce-ranking": {
          Alfredo: 0,
          Ketchup: 2,
          Marinara: 3,
          Ranch: 1
        },
        "strongest-bear": "Grizzly Bear",
        "text-feeling": "Good",
        "zip-code": "14420"
      }}
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
  .add("WorkAround Interview Flat", () => (
    <Survey
      variant="flat"
      form={workaroundInterview}
      autocompleteRequest={zipCodeAutocompleteRequest}
      onFileUpload={() => Promise.resolve("http://path.to/file")}
      onFinish={action("onFinish")}
    />
  ))
  .add("CollegeAI Survey", () => (
    <Survey
      form={{ questions: collegeaiSurvey }}
      autocompleteRequest={zipCodeAutocompleteRequest}
      onFileUpload={() => Promise.resolve("http://path.to/file")}
      onFinish={action("onFinish")}
    />
  ))
  .add("CollegeAI Survey Flat", () => (
    <Survey
      variant="flat"
      form={{ questions: collegeaiSurvey }}
      autocompleteRequest={zipCodeAutocompleteRequest}
      onFileUpload={() => Promise.resolve("http://path.to/file")}
      onFinish={action("onFinish")}
    />
  ))
  .add("Using Validators", () => (
    <Survey form={validatorsSurvey} onFinish={action("onFinish")} />
  ))
