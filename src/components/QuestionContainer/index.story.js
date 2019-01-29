// @flow

import React, { useState, useEffect } from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import QuestionContainer from "./"
import QuestionContext from "../QuestionContext"

const QuestionContainerFlat = () => (
  <QuestionContext.Provider value={{ containerStyleType: "flat" }}>
    <QuestionContainer
      question={{
        title: "What is your favorite flavor of ice cream?",
        name: "favorite-ice-cream",
        description: "e.g. chocolate, vanilla, rocky road"
      }}
      answered
    >
      Some Question Content
    </QuestionContainer>
  </QuestionContext.Provider>
)

storiesOf("QuestionContainer", module)
  .add("Paper", () => (
    <QuestionContainer
      question={{
        title: "What is your favorite flavor of ice cream?",
        name: "favorite-ice-cream",
        description: "e.g. chocolate, vanilla, rocky road"
      }}
      answered
    >
      Some Question Content
    </QuestionContainer>
  ))
  .add("Flat", () => (
    <div
      style={{
        margin: 10,
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: 4
      }}
    >
      <QuestionContainerFlat />
      <QuestionContainerFlat />
      <QuestionContainerFlat />
    </div>
  ))
