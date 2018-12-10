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
      resolve([
        {
          value: info.zip,
          label: `${info.zip} (${info.city}, ${info.state})`
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
      type: "autocomplete"
    }}
    onChangeAnswer={action("onChangeAnswer")}
    autocompleteRequest={zipCodeAutocompleteRequest}
  />
))
