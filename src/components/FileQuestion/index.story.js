// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import FileQuestion from "./"

storiesOf("FileQuestion", module).add("Basic", () => (
  <FileQuestion
    onChangeAnswer={action("onChangeAnswer")}
    onFileUpload={async () => "http://url.com"}
    question={{
      name: "file-example",
      title: "Upload your resume below",
      type: "file"
    }}
  />
))
