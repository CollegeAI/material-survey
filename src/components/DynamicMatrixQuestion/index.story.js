// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import DynamicMatrixQuestion from "./"

storiesOf("DynamicMatrixQuestion", module).add("Basic", () => (
  <DynamicMatrixQuestion
    onChangeAnswer={action("onChangeAnswer")}
    question={{
      type: "matrixdynamic",
      name: "other_languages",
      title: "What other Languages do you speak?",
      columns: [
        {
          title: "Language",
          name: "language",
          cellType: "dropdown",
          choices: ["Spanish", "English", "French"]
        },
        {
          title: "Level",
          name: "level",
          cellType: "checkbox",
          choices: ["Beginner", "Intermediate", "Advanced"]
        }
      ],
      choices: ["English", "Japanese", "French", "Spanish", "Danish", "German"]
    }}
  />
))
