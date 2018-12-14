// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import styled from "styled-components"
import README from "!raw-loader!../../README.md"
import Markdown from "react-markdown"

const Container = styled.div`
  && {
    font-family: Roboto, sans-serif;
    min-height: 100vh;
  }
`

storiesOf("_ Meet Material Survey", module).add("Basic", () => (
  <Container>
    <Markdown source={README} />
  </Container>
))
