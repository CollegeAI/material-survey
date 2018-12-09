// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import USRegionQuestion from "./"

storiesOf("USRegionQuestion", module)
  .add("Single Region", () => (
    <USRegionQuestion
      question={{
        type: "us-region",
        title: "Where would you like to live?",
        name: "preferred-us-region"
      }}
    />
  ))
  .add("Multiple Region Selection", () => (
    <USRegionQuestion
      question={{
        type: "multiple-us-region",
        title: "What places would you like to live?",
        name: "preferred-us-regions"
      }}
    />
  ))
  .add("US State", () => (
    <USRegionQuestion
      question={{
        type: "us-state",
        title: "What place would you like to live?",
        name: "preferred-us-regions"
      }}
    />
  ))
  .add("Multiple US State", () => (
    <USRegionQuestion
      question={{
        type: "multiple-us-state",
        title: "What places would you like to live?",
        name: "preferred-us-regions"
      }}
    />
  ))
