// @flow

import React, { Fragment, useContext } from "react"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import type { BaseQuestion } from "../../material-survey-format.js.flow"
import CheckIcon from "@material-ui/icons/CheckCircle"
import { green, grey, red } from "@material-ui/core/colors"
import styled from "styled-components"
import QuestionText from "../QuestionText"
import QuestionContext from "../QuestionContext"

const AnimatedIcon = styled.div`
  transition: 300ms transform, 300ms opacity;
`

const FadedTitle = styled.span`
  opacity: 0.6;
`

const ErrorText = styled.div`
  color: ${red[500]};
`

export default function CardQuestionContainer({
  question,
  answered,
  children,
  error: valueError,
  fadedTitle
}: {
  question: BaseQuestion,
  answered: boolean,
  error?: ?string,
  children: any,
  fadedTitle?: string
}) {
  return (
    <QuestionContext.Consumer>
      {({ error: contextError, noCheckmarks } = {}) => {
        const error = valueError ? (
          <div>
            {valueError}
            <br />
            {contextError}
          </div>
        ) : (
          contextError
        )
        return (
          <Card id={question.name} style={{ position: "relative", margin: 20 }}>
            <CardHeader
              style={{ paddingRight: 40 }}
              title={
                <span>
                  {question.title || question.name}
                  {fadedTitle && <FadedTitle> {fadedTitle}</FadedTitle>}
                </span>
              }
              subheader={
                <span>
                  {question.description}
                  {error && <ErrorText>{error}</ErrorText>}
                </span>
              }
            />
            <CardContent style={{ overflowX: "hidden" }}>
              {children}
            </CardContent>
            {!answered && question.isRequired && (
              <div style={{ position: "absolute", right: 26, top: 14 }}>
                <QuestionText
                  style={{ fontSize: 36, fontWeight: 800, color: grey[600] }}
                >
                  *
                </QuestionText>
              </div>
            )}
            {!noCheckmarks && (
              <div style={{ position: "absolute", right: 16, top: 16 }}>
                <AnimatedIcon
                  style={
                    !answered
                      ? { transform: "rotate(-45deg) scale(0.8)", opacity: 0 }
                      : { transform: "rotate(8deg)", opacity: 1 }
                  }
                >
                  <CheckIcon
                    style={{ width: 36, height: 36, color: green[600] }}
                  />
                </AnimatedIcon>
              </div>
            )}
          </Card>
        )
      }}
    </QuestionContext.Consumer>
  )
}
