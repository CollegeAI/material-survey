// @flow

import React, { useState, useEffect } from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import QuestionContainer from "./"

const AnimatedQuestionContainer = () => {
  const [answered, changeAnswer] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      changeAnswer(true)
      setTimeout(() => {
        changeAnswer(false)
      }, 1000)
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  })
  return (
    <QuestionContainer
      question={{
        title: "What is your favorite flavor of ice cream?",
        name: "favorite-ice-cream",
        description: "e.g. chocolate, vanilla, rocky road",
        isRequired: true
      }}
      answered={answered}
    >
      Some Question Content
    </QuestionContainer>
  )
}

storiesOf("QuestionContainer", module)
  .add("Basic", () => (
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
  .add("Required", () => (
    <QuestionContainer
      question={{
        title: "What is your favorite flavor of ice cream?",
        name: "favorite-ice-cream",
        description: "e.g. chocolate, vanilla, rocky road",
        isRequired: true
      }}
    >
      Some Question Content
    </QuestionContainer>
  ))
  .add("Animate Answered", () => <AnimatedQuestionContainer />)
