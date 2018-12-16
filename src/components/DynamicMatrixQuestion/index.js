// @flow

import type { DynamicMatrixQuestion } from "../../material-survey-format.js.flow"
import React, { useState } from "react"
import Radio from "@material-ui/core/Radio"
import Button from "@material-ui/core/Button"
import QuestionContainer from "../QuestionContainer"
import styled from "styled-components"
import QuestionText from "../QuestionText"
import useQuestionAnswer from "../../hooks/use-question-answer"
import Dropdown from "../DropdownQuestion/Dropdown"
import Checkbox from "@material-ui/core/Checkbox"
import Delete from "@material-ui/icons/Delete"
import TextField from "@material-ui/core/TextField"

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const Col = styled.div`
  && {
    font-family: Roboto, sans-serif;
    flex: 1;
    flex-wrap: wrap;
    justify-content: center;
  }
`

const HeaderCol = styled(Col)`
  font-weight: bold;
`

const LastCol = styled(Col)`
  && {
    margin-left: 4px;
    width: 100px;
    flex: 0;
  }
`

const CheckboxButton = styled(Button)`
  && {
    align-items: center;
    padding-left: 12px;
    padding-right: 12px;
    margin-left: 2px;
    margin-right: 2px;
  }
  .checkbox {
    padding-left: 0;
    padding-top: 4px;
    padding-bottom: 4px;
  }
  .text {
    text-transform: none;
  }
`

export default ({
  question,
  onChangeAnswer
}: {
  question: DynamicMatrixQuestion,
  onChangeAnswer: Function
}) => {
  const [{ answer, error }, changeAnswer] = (useQuestionAnswer(
    question,
    onChangeAnswer,
    []
  ): [{ answer: Array<{ [string]: any }>, error: string }, Function])
  const answerWithBlank = answer.concat([{}])
  return (
    <QuestionContainer question={question} answered={answer.length > 0}>
      <Row>
        {question.columns.map(({ title, name }) => (
          <HeaderCol key={name}>{title || name}</HeaderCol>
        ))}
        <LastCol>
          <Button style={{ opacity: 0 }} disabled>
            <Delete />
          </Button>
        </LastCol>
      </Row>
      {answerWithBlank.map((a, i) => (
        <Row key={i}>
          {question.columns.map(
            ({ name, cellType, choices = question.choices }) => {
              const changeRowAnswer = newAnswer => {
                changeAnswer([
                  ...answer.slice(0, i),
                  { ...a, [name]: newAnswer },
                  ...answer.slice(i + 1)
                ])
              }
              const rowAnswer = answerWithBlank[i][name]

              return (
                <Col key={name}>
                  {cellType === "dropdown" ? (
                    <Dropdown
                      answer={answerWithBlank[i][name]}
                      choices={choices}
                      changeAnswer={newAnswer => changeRowAnswer(newAnswer)}
                    />
                  ) : cellType === "checkbox" ? (
                    <div>
                      {choices.map((choiceRaw, choiceIndex) => {
                        const choice =
                          typeof choiceRaw === "string"
                            ? { value: choiceRaw, text: choiceRaw }
                            : choiceRaw
                        return (
                          <CheckboxButton
                            key={choiceIndex}
                            onClick={() =>
                              changeRowAnswer(
                                (rowAnswer || []).includes(choice.value)
                                  ? rowAnswer.filter(r => r !== choice.value)
                                  : (rowAnswer || []).concat([choice.value])
                              )
                            }
                          >
                            <Checkbox
                              tabIndex={-1}
                              className="checkbox"
                              checked={(rowAnswer || []).includes(choice.value)}
                            />
                            <div className="text">{choice.text}</div>
                          </CheckboxButton>
                        )
                      })}
                    </div>
                  ) : cellType === "text" ? (
                    <TextField
                      value={rowAnswer || ""}
                      onChange={e => changeRowAnswer(e.target.value)}
                    />
                  ) : (
                    `Unknown Cell Type "${cellType}"`
                  )}
                </Col>
              )
            }
          )}
          <LastCol>
            <Button
              disabled={i === answerWithBlank.length - 1}
              onClick={() =>
                changeAnswer([...answer.slice(0, i), ...answer.slice(i + 1)])
              }
            >
              <Delete />
            </Button>
          </LastCol>
        </Row>
      ))}
    </QuestionContainer>
  )
}
