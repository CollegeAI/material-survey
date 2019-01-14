import React from "react"
import { configure, addDecorator } from "@storybook/react"
import { withInfo } from "@storybook/addon-info"
import { withPrettierSource } from "storybook-addon-prettier-source"

addDecorator(
  // withInfo({
  //   inline: true,
  //   source: true,
  //   header: false,
  //   maxPropsIntoLine: 20,
  //   maxPropsObjectKeys: 20,
  //   maxPropArrayLength: 20,
  //   maxPropStringLength: 500
  // })
  (story, context) => withPrettierSource()(story)(context)
)
addDecorator(storyFn => (
  <div
    style={{
      display: "block",
      justifyContent: "center",
      minHeight: "100vh",
      textAlign: "center",
      backgroundColor: "#f8f8f8"
    }}
  >
    <div
      style={{
        display: "inline-block",
        textAlign: "left",
        width: "100%",
        maxWidth: 800
      }}
    >
      {storyFn()}
    </div>
  </div>
))

// automatically import all files ending in *.stories.js
const req = require.context("../src", true, /.story.js$/)
function loadStories() {
  require("../src/docs/Welcome.story.js")
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
