// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import range from "lodash/range"
import { zipCodeAutocompleteRequest } from "../APIAutocompleteQuestion/index.story"

import DynamicMatrixQuestion from "./"

storiesOf("DynamicMatrixQuestion", module)
  .add("Basic", () => (
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
        ]
      }}
    />
  ))
  .add("Text Type Columns", () => (
    <DynamicMatrixQuestion
      onChangeAnswer={action("onChangeAnswer")}
      question={{
        type: "matrixdynamic",
        name: "something",
        title: "What is the text?",
        columns: [
          {
            title: "Text",
            name: "text",
            cellType: "text"
          },
          {
            title: "Text 2",
            name: "text2",
            cellType: "text"
          }
        ]
      }}
    />
  ))
  .add("Many-Choice Dropdown", () => (
    <DynamicMatrixQuestion
      onChangeAnswer={action("onChangeAnswer")}
      question={{
        type: "matrixdynamic",
        name: "something",
        title: "What is your favorite number combo?",
        columns: [
          {
            title: "Number 1",
            name: "num1",
            cellType: "dropdown",
            choices: range(100).map(a => a.toString())
          },
          {
            title: "Number 2",
            name: "num2",
            cellType: "dropdown",
            choices: range(100).map(a => a.toString())
          }
        ]
      }}
    />
  ))
  .add("Autocomplete Dropdown", () => (
    <DynamicMatrixQuestion
      onChangeAnswer={action("onChangeAnswer")}
      autocompleteRequest={zipCodeAutocompleteRequest}
      question={{
        type: "matrixdynamic",
        name: "something",
        title: "Some personal information about where you live...",
        columns: [
          {
            title: "Home Zip Code",
            name: "home_zipcode",
            cellType: "autocomplete",
            requestUrl: "/zipcode"
          },
          {
            title: "Work Zip Code",
            name: "work_zipcode",
            cellType: "autocomplete",
            requestUrl: "/zipcode"
          }
        ]
      }}
    />
  ))
