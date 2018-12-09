// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import ChoiceRankerQuestion from "./"

storiesOf("ChoiceRankerQuestion", module).add("Basic", () => (
  <ChoiceRankerQuestion
    question={{
      name: "choice-ranker-example",
      title: "What is your favorite color?",
      type: "choice-ranker",
      choices: ["Yellow", "Orange", "Blue", "Purple", "Green", "Black"],
      choicesAtOnce: 4,
      trials: 3
    }}
  />
))
