// @flow

import React, { Component } from "react"
import type {
  SurveyQuestion,
  AutocompleteRequestFunction
} from "../../material-survey-format.js.flow"

import SliderQuestion from "../SliderQuestion"
import RadiogroupQuestion from "../RadiogroupQuestion"
import RatingQuestion from "../RatingQuestion"
import DropdownQuestion from "../DropdownQuestion"
import ChoiceRankerQuestion from "../ChoiceRankerQuestion"
import BooleanQuestion from "../BooleanQuestion"
import TextQuestion from "../TextQuestion"
import MultiTextQuestion from "../MultiTextQuestion"
import USRegionQuestion from "../USRegionQuestion"
import CheckboxQuestion from "../CheckboxQuestion"
import APIAutocompleteQuestion from "../APIAutocompleteQuestion"
import DynamicMatrixQuestion from "../DynamicMatrixQuestion"
import FileQuestion from "../FileQuestion"
import styled from "styled-components"
import isEqual from "lodash/isEqual"

export type Props = {
  question: SurveyQuestion,
  onChangeAnswer: Function,
  autocompleteRequest?: AutocompleteRequestFunction,
  onFileUpload?: File => Promise<string>
}

const Red = styled.div`
  color: red;
`

class SurveyQuestionComponent extends Component<*, *> {
  shouldComponentUpdate = (nextProps: Props) => {
    return !isEqual(nextProps.question, this.props.question)
  }
  onChangeAnswer = (...args: any) => this.props.onChangeAnswer(...args)
  render = () => {
    const {
      question,
      onChangeAnswer,
      autocompleteRequest,
      onFileUpload
    } = this.props

    switch (question.type) {
      case "slider": {
        return (
          <SliderQuestion
            question={question}
            onChangeAnswer={this.onChangeAnswer}
          />
        )
      }
      case "radiogroup": {
        return (
          <RadiogroupQuestion
            question={question}
            onChangeAnswer={this.onChangeAnswer}
          />
        )
      }
      case "multipletext": {
        return (
          <MultiTextQuestion
            question={question}
            onChangeAnswer={this.onChangeAnswer}
          />
        )
      }
      case "multiline-text":
      case "text": {
        return (
          <TextQuestion
            question={question}
            onChangeAnswer={this.onChangeAnswer}
          />
        )
      }
      case "dropdown":
      case "multiple-dropdown": {
        return (
          <DropdownQuestion
            question={question}
            onChangeAnswer={this.onChangeAnswer}
          />
        )
      }
      case "checkbox": {
        return (
          <CheckboxQuestion
            question={question}
            onChangeAnswer={this.onChangeAnswer}
          />
        )
      }
      case "us-region":
      case "multiple-us-region":
      case "us-state":
      case "multiple-us-state": {
        return (
          <USRegionQuestion
            question={question}
            onChangeAnswer={this.onChangeAnswer}
          />
        )
      }
      case "boolean": {
        return (
          <BooleanQuestion
            question={question}
            onChangeAnswer={this.onChangeAnswer}
          />
        )
      }
      case "choiceranker":
      case "choice-ranker": {
        return (
          <ChoiceRankerQuestion
            question={question}
            onChangeAnswer={this.onChangeAnswer}
          />
        )
      }
      case "rating": {
        return (
          <RatingQuestion
            question={question}
            onChangeAnswer={this.onChangeAnswer}
          />
        )
      }
      case "autocomplete": {
        if (!autocompleteRequest)
          throw new Error(
            "You must supply autocompleteRequest method to use APIAutocompleteQuestions"
          )
        return (
          <APIAutocompleteQuestion
            question={question}
            onChangeAnswer={this.onChangeAnswer}
            autocompleteRequest={autocompleteRequest}
          />
        )
      }
      case "matrixdynamic": {
        return (
          <DynamicMatrixQuestion
            question={question}
            autocompleteRequest={autocompleteRequest}
            onChangeAnswer={this.onChangeAnswer}
          />
        )
      }
      case "file": {
        if (!onFileUpload)
          return (
            <Red id={question.id?question.id+"Red":""}>
              File Question Type requires an upload handler. Specify
              onFileUpload.
            </Red>
          )
        return (
          <FileQuestion
            question={question}
            onFileUpload={onFileUpload}
            onChangeAnswer={this.onChangeAnswer}
          />
        )
      }
      default: {
        throw new Error(
          `Invalid Question Type: "${question.type}" in "${JSON.stringify(
            question,
            null,
            "  "
          )}"`
        )
      }
    }
  }
}

export default SurveyQuestionComponent
