// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import RatingQuestion from "./"

storiesOf("RatingQuestion", module).add("Basic", () => (
  <RatingQuestion
    question={{
      name: "rating-example",
      title: "How important is a college's reputation?",
      type: "rating",
      minRateDescription: "Least Important",
      midRateDescription: "Important",
      maxRateDescription: "Most Important"
    }}
  />
))
