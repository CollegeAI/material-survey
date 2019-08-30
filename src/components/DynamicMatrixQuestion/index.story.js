// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import range from "lodash/range"
import { zipCodeAutocompleteRequest } from "../APIAutocompleteQuestion/index.story"

import DynamicMatrixQuestion from "./"

storiesOf("DynamicMatrixQuestion", module)
  .add("Preloaded", () => (
    <DynamicMatrixQuestion
      onChangeAnswer={action("onChangeAnswer")}
      defaultAnswer={[
        { language: "English", level: "Intermediate" },
        { language: "Spanish", level: "Beginner" }
      ]}
      question={{
        type: "matrixdynamic",
        name: "other_languages",
        title: "What other Languages do you speak?",
        columns: [
          {
            title: "Language",
            name: "language",
            cellType: "text"
          },
          {
            title: "Level",
            name: "level",
            cellType: "dropdown",
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
  .add("Text Type (Crowded)", () => (
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
          },
          {
            title: "Text Lorem Ipsum 3",
            name: "text3",
            cellType: "text"
          },
          {
            title: "This is the Text 4",
            name: "text4",
            cellType: "text"
          },
          {
            title: "Text Confusing Text Text 5",
            name: "text5",
            cellType: "text"
          },
          {
            title: "Long Text Text 6",
            name: "text6",
            cellType: "text"
          },
          {
            title: "Text Additional Text 7",
            name: "text7",
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
