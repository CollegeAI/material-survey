// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import RadiogroupQuestion from "./"

storiesOf("RadiogroupQuestion", module).add("Basic", () => (
  <RadiogroupQuestion
    question={{
      name: "radiogroup-example",
      title: "What's the best syrup?",
      type: "radiogroup",
      choices: ["Maple Syrup", "Corn Syrup", "Cough Syrup"]
    }}
  />
))
