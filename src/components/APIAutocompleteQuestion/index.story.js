// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import zipcodes from "zipcodes"

import APIAutocompleteQuestion from "./"

export const zipCodeAutocompleteRequest = (
  requestUrl: string,
  value: string
) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const info = zipcodes.lookup(value)
      if (!info) return resolve([])
      resolve([
        {
          value: info.zip,
          label: info.zip,
          subLabel: `${info.city}, ${info.state}`
        }
      ])
    }, 300)
  })
}

storiesOf("APIAutocompleteQuestion", module).add("Basic", () => (
  <APIAutocompleteQuestion
    question={{
      name: "autocomplete-example",
      title: "What is your zip code?",
      requestUrl: "/zipcodes",
      type: "autocomplete",
      placeholder: "Type your full zip code (e.g. 14420)"
    }}
    onChangeAnswer={action("onChangeAnswer")}
    autocompleteRequest={zipCodeAutocompleteRequest}
  />
))
