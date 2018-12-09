// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import TextQuestion from "./"

storiesOf("TextQuestion", module)
  .add("Basic", () => (
    <TextQuestion
      question={{
        name: "text-example",
        title: "Do you think we should legalize mayonaise?",
        type: "text"
      }}
    />
  ))
  .add("Multiline", () => (
    <TextQuestion
      question={{
        name: "multiline-text-example",
        title: "Do you think we should legalize mayonaise?",
        type: "multiline-text"
      }}
    />
  ))
