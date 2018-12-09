// @flow

import React from "react"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import type { BaseQuestion } from "../../material-survey-format.js.flow"
import CheckIcon from "@material-ui/icons/CheckCircle"
import { green, grey } from "@material-ui/core/colors"
import styled from "styled-components"
import QuestionText from "../QuestionText"

const AnimatedIcon = styled.div`
  transition: 300ms transform, 300ms opacity;
`

export default ({
  question,
  answered,
  children
}: {
  question: BaseQuestion,
  answered: boolean,
  children: any
}) => {
  return (
    <Card style={{ position: "relative" }}>
      <CardHeader
        style={{ paddingRight: 40 }}
        title={question.title}
        subheader={question.description}
      />
      <CardContent>{children}</CardContent>
      {!answered && question.isRequired && (
        <div style={{ position: "absolute", right: 26, top: 14 }}>
          <QuestionText
            style={{ fontSize: 36, fontWeight: 800, color: grey[600] }}
          >
            *
          </QuestionText>
        </div>
      )}
      <div style={{ position: "absolute", right: 16, top: 16 }}>
        <AnimatedIcon
          style={
            !answered
              ? { transform: "rotate(-45deg) scale(0.8)", opacity: 0 }
              : { transform: "rotate(8deg)", opacity: 1 }
          }
        >
          <CheckIcon style={{ width: 36, height: 36, color: green[600] }} />
        </AnimatedIcon>
      </div>
    </Card>
  )
}