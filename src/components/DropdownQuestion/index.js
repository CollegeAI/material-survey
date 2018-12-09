// @flow

import type { DropdownQuestion } from "../../material-survey-format.js.flow"
import React, { useState } from "react"
import QuestionContainer from "../QuestionContainer"
import styled from "styled-components"
import QuestionText from "../QuestionText"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import Checkbox from "@material-ui/core/Checkbox"
import ListItemText from "@material-ui/core/ListItemText"
import Chip from "@material-ui/core/Chip"

const SelectedValueContainer = styled.div`
  padding: 4px;
  padding-left: 8px;
`

export default ({
  question,
  onChangeAnswer
}: {
  question: DropdownQuestion,
  onChangeAnswer: Function
}) => {
  const multiple = question.type === "multiple-dropdown"
  const [answer, changeAnswer] = useState(
    question.defaultAnswer || (multiple ? [] : undefined)
  )
  const choiceList = question.choices.map(choice =>
    typeof choice === "string" ? { value: choice, text: choice } : choice
  )
  const choiceMap = choiceList.reduce(
    (acc, choice) => ((acc[choice.value] = choice.text), acc),
    {}
  )

  return (
    <QuestionContainer question={question} answered={answer !== undefined}>
      <Select
        multiple={multiple}
        value={answer}
        style={{ display: "flex" }}
        onChange={e => {
          changeAnswer(e.target.value)
        }}
        renderValue={
          !multiple
            ? selected => (
                <SelectedValueContainer style={{ padding: 10 }}>
                  {choiceMap[answer]}
                </SelectedValueContainer>
              )
            : selected => (
                <SelectedValueContainer>
                  {selected.map(value => (
                    <Chip
                      style={{ marginRight: 8 }}
                      key={value}
                      label={choiceMap[value]}
                    />
                  ))}
                </SelectedValueContainer>
              )
        }
      >
        {choiceList.map(choice => (
          <MenuItem key={choice.value} value={choice.value}>
            {multiple && <Checkbox checked={answer.includes(choice.value)} />}
            {choice.text}
          </MenuItem>
        ))}
      </Select>
    </QuestionContainer>
  )
}
