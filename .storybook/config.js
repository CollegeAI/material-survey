import React from "react"
import { configure, addDecorator } from "@storybook/react"
import { withInfo } from "@storybook/addon-info"

addDecorator(withInfo({ inline: true, header: false }))
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
