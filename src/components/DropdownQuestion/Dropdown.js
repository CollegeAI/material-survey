// @flow

import React from "react"
import type { QuestionChoice } from "../../material-survey-format.js.flow"
import Chip from "@mui/material/Chip"
import Checkbox from "@mui/material/Checkbox"
import QuestionText from "../QuestionText"
import ListItemText from "@mui/material/ListItemText"
import Select from "@mui/material/Select"
import ReactSelect from "react-select"
import MenuItem from "@mui/material/MenuItem"
import styled from "styled-components"
import useTheme from "@material-ui/core/styles/useTheme"

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
  const MUItheme = useTheme()

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
          }),
          singleValue: provided => ({
            ...provided,
            color: MUItheme.palette.text.primary
          }),
          option: (provided, { data, isDisabled, isFocused, isSelected }) => ({
            ...provided,
            color: (isFocused || isSelected) ? MUItheme.palette.primary.contrastText : MUItheme.palette.text.primary
          })
        }}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: MUItheme.palette.primary.main,
            primary75: MUItheme.palette.primary.light,
            primary50: MUItheme.palette.primary.light,
            primary25: MUItheme.palette.primary.light,
            neutral0: MUItheme.palette.background.paper,
            neutral5: MUItheme.palette.grey['50'],
            neutral10: MUItheme.palette.grey['100'],
            neutral20: MUItheme.palette.grey['200'],
            neutral30: MUItheme.palette.grey['300'],
            neutral40: MUItheme.palette.grey['400'],
            neutral50: MUItheme.palette.grey['500'],
            neutral60: MUItheme.palette.grey['600'],
            neutral70: MUItheme.palette.grey['700'],
            neutral80: MUItheme.palette.grey['800'],
            neutral90: MUItheme.palette.grey['900']
          }
        })}
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
