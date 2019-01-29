// @flow

import React, { useState, useEffect } from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import CardQuestionContainer from "./"

const AnimatedQuestionQuestionContainer = () => {
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
    <CardQuestionContainer
      question={{
        title: "What is your favorite flavor of ice cream?",
        name: "favorite-ice-cream",
        description: "e.g. chocolate, vanilla, rocky road",
        isRequired: true
      }}
      answered={answered}
    >
      Some Question Content
    </CardQuestionContainer>
  )
}

storiesOf("CardQuestionContainer", module)
  .add("Basic", () => (
    <CardQuestionContainer
      question={{
        title: "What is your favorite flavor of ice cream?",
        name: "favorite-ice-cream",
        description: "e.g. chocolate, vanilla, rocky road"
      }}
      answered
    >
      Some Question Content
    </CardQuestionContainer>
  ))
  .add("Required", () => (
    <CardQuestionContainer
      question={{
        title: "What is your favorite flavor of ice cream?",
        name: "favorite-ice-cream",
        description: "e.g. chocolate, vanilla, rocky road",
        isRequired: true
      }}
    >
      Some Question Content
    </CardQuestionContainer>
  ))
  .add("Animate Answered", () => <AnimatedQuestionQuestionContainer />)
