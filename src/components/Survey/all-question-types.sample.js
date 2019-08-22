// @flow

import type { SurveyMaterialFormat } from "../../material-survey-format.js.flow"

export default ({
  questions: [
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
    {
      type: "radiogroup",
      title: "What kind of bear is strongest?",
      name: "strongest-bear",
      choices: ["Brown Bear", "Grizzly Bear", "Black Bear", "Polar Bear"]
    },
    {
      type: "checkbox",
      title: "What kind of bears are brown?",
      name: "brown-bear",
      choices: ["Brown Bear", "Grizzly Bear", "Black Bear", "Polar Bear"]
    },
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
    {
      type: "rating",
      title: "How important is global warming?",
      name: "global-warming",
      maxRateDescription: "Extremely Important",
      minRateDescription: "Not Important"
    },
    {
      type: "us-region",
      title: "What region of the U.S. would you like to live in?",
      name: "preferred-us-region"
    },
    {
      type: "autocomplete",
      title: "What's your zip code?",
      name: "zip-code",
      requestUrl: "/zip-code"
    },
    {
      title:
        "Which statement best describes what you would like to be able to say after college?",
      name: "say-after-college",
      type: "choice-ranker",
      choicesAtOnce: 4,
      trials: 3,
      choices: [
        {
          text: "I made some of my best friends to this day.",
          value: "made-my-best-friends"
        },
        {
          text: "I did ground-breaking research.",
          value: "ground-breaking-research"
        },
        {
          text: "I see the world in a completely different way now.",
          value: "see-the-world-differently"
        },
        {
          text: "I got a great, affordable education.",
          value: "great-affordable-education"
        },
        {
          text: "I had a lot of fun.",
          value: "had-lot-of-fun"
        },
        {
          text: "I'm an expert in my field.",
          value: "expert-in-field"
        }
      ]
    }
  ]
}: SurveyMaterialFormat)
