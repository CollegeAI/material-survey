// @flow

import React from "react"
import type { QuestionChoice } from "../../material-survey-format.js.flow"
import Chip from "@material-ui/core/Chip"
import Checkbox from "@material-ui/core/Checkbox"
import QuestionText from "../QuestionText"
import ListItemText from "@material-ui/core/ListItemText"
import Select from "@material-ui/core/Select"
import ReactSelect from "react-select"
import MenuItem from "@material-ui/core/MenuItem"
import styled from "styled-components"

const SelectedValueContainer = styled.div`
  padding: 4px;
  padding-left: 8px;
`

export default ({
  choices,
  answer,
  multiple,
  changeAnswer
}: {
  choices: Array<QuestionChoice | string>,
  answer: any,
  multiple?: boolean,
  changeAnswer: Function
}) => {
  const choiceList = choices.map(choice =>
    typeof choice === "string" ? { value: choice, text: choice } : choice
  )

  const choiceMap = choiceList.reduce(
    (acc, choice) => ((acc[choice.value] = choice.text), acc),
    {}
  )

  if (choiceList.length > 10) {
    const currentChoice = choiceList.find(c => c.value === answer)

    const reactSelectChoice = currentChoice
      ? { value: currentChoice.value, label: currentChoice.text }
      : null

    return (
      <ReactSelect
        placeholder={answer}
        value={reactSelectChoice}
        className="material-survey-selection"
        styles={{
          menu: provided => ({
            ...provided,
            fontFamily: "Roboto, sans-serif"
          }),
          menuPortal: provided => ({ ...provided, zIndex: 10000 }),
          container: provided => ({
            ...provided,
            fontFamily: "Roboto, sans-serif"
          })
        }}
        isMulti={multiple}
        menuPortalTarget={document.body}
        options={choiceList.map(c => ({ value: c.value, label: c.text }))}
        onChange={({ value }) => changeAnswer(value)}
      />
    )
  } else {
    return (
      <Select
        multiple={multiple}
        value={answer || null}
        style={{ display: "flex" }}
        onChange={e => changeAnswer(e.target.value)}
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
    )
  }
}
