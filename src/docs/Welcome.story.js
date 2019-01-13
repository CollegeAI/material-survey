// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import styled from "styled-components"
import README from "!raw-loader!../../README.md"
import FORMAT from "!raw-loader!../../docs/material-survey-format.md"
import Markdown from "react-markdown"

const Container = styled.div`
  && {
    font-family: Roboto, sans-serif;
    min-height: 100vh;
  }
`

storiesOf("Meet Material Survey", module)
  .add("README.md", () => (
    <Container>
      <Markdown source={README} />
    </Container>
  ))
  .add("FORMAT.md", () => (
    <Container>
      <Markdown source={FORMAT} />
    </Container>
  ))
