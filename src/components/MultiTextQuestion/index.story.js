// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import MultiTextQuestion from "./"

storiesOf("MultiTextQuestion", module).add("Basic", () => (
  <MultiTextQuestion
    onChangeAnswer={action("onChangeAnswer")}
    question={{
      name: "multipletext-example",
      title: "What are your SAT scores?",
      type: "multipletext",
      title: "Enter your TOEFL iBT scores",
      items: [
        {
          name: "math",
          title: "Math Score"
        },
        {
          name: "reading",
          title: "Reading Score"
        },
        {
          name: "writing",
          title: "Writing Score"
        }
      ],
      validators: [
        {
          type: "numeric",
          minValue: 0,
          maxValue: 800
        }
      ]
    }}
  />
))
