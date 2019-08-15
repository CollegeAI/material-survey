// @flow

import type { SurveyMaterialFormat } from "../../material-survey-format.js.flow"

export default ({
  questions: [
    {
      name: "text-date-example",
      title: "When were you born?",
      type: "text",
      isRequired: true,
      placeholder: "MM/DD/YYYY",
      validators: [
        {
          type: "regex",
          text: "Please enter a valid date",
          regex: "^\\d{1,2}/\\d{1,2}/\\d{4}"
        }
      ]
    }
  ]
}: SurveyMaterialFormat)
