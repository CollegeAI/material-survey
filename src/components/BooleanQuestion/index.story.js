// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import BooleanQuestion from "./"

storiesOf("BooleanQuestion", module).add("Basic", () => (
  <BooleanQuestion
    onChangeAnswer={action("onChangeAnswer")}
    question={{
      name: "boolean-example",
      title: "Do you think we should legalize mayonaise?",
      type: "boolean"
    }}
  />
))
