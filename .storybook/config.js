import { configure } from "@storybook/react"
import { setConfig } from "react-hot-loader"

setConfig({ pureSFC: true })

// automatically import all files ending in *.stories.js
const req = require.context("../src", true, /.story.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
