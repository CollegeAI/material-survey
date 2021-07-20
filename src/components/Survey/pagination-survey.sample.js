// @flow

import type { SurveyMaterialFormat } from "../../material-survey-format.js.flow"

export default ({
  pages: [
    {
      name: 'page1',
      elements: [
        {
          type: "text",
          title: "How do you feel?",
          name: "text-feeling",
          isRequired: true
        },
        {
          type: "text",
          title: "Type any number!",
          name: "text-feeling",
          validators: [
            {
              type: "numeric",
              minValue: 1,
              maxValue: 200,
              text: "Woah that's wayyy too high"
            }
          ],
          isRequired: true
        },
      ]
    },
    {
      name: 'page2',
      elements: [
        {
          type: "dropdown",
          title: "How do you feel about this dropdown?",
          name: "dropdown-feeling",
          choices: ["It's great!", "Not a fan", "I could get used to it"]
        },
        {
          type: "boolean",
          title: "Do you like boolean questions?",
          name: "like-boolean"
        },
      ]
    },
    {
      name: 'page3',
      elements: [
        {
          type: "choiceranker",
          title: "What kind of sauce do you like?",
          name: "sauce-ranking",
          choicesAtOnce: 3,
          trials: 3,
          choices: ["Marinara", "Ranch", "Ketchup", "Alfredo"]
        },
        {
          type: "slider",
          title: "How large is a mouse?",
          name: "mouse-size",
          max: 10,
          min: 0,
          unit: "inches"
        },
      ]
    }
  ]
}: SurveyMaterialFormat)
