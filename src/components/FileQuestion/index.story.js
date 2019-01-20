// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import FileQuestion from "./"

storiesOf("FileQuestion", module)
  .add("Basic", () => (
    <FileQuestion
      onChangeAnswer={action("onChangeAnswer")}
      onFileUpload={() =>
        new Promise(resolve =>
          setTimeout(() => resolve("http://url.com"), 1000)
        )
      }
      question={{
        name: "file-example",
        title: "Upload your resume below",
        type: "file"
      }}
    />
  ))
  .add("Errors", () => (
    <FileQuestion
      onChangeAnswer={action("onChangeAnswer")}
      onFileUpload={() =>
        new Promise((resolve, reject) =>
          setTimeout(() => reject("Request Timed Out"), 1000)
        )
      }
      question={{
        name: "file-example",
        title: "Upload your resume below",
        type: "file"
      }}
    />
  ))
