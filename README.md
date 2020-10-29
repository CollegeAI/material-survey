# Material Survey

[![npm version](https://badge.fury.io/js/material-survey.svg)](https://badge.fury.io/js/material-survey)

A [material ui](https://material-ui.com/) survey library for displaying and retrieving input from complex forms. [Demo](https://collegeai.github.io/material-survey/?selectedKind=Survey&selectedStory=WorkAround%20Interview&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)

This survey powers surveys on [collegeai.com](https://collegeai.com).

```javascript
import Survey from "material-survey/components/Survey"

const App = () => (
  <Survey
    onFinish={answers => {
      // Do something with the answers
    }}
    form={{
      questions: [
        {
          name: "favorite-fruit",
          title: "What is your favorite fruit?",
          type: "dropdown",
          choices: ["Apple", "Orange", "Watermelon"]
        }
      ]
    }}
  />
)
```

Want new features? Found a bug? Feel free to [leave an issue or a pull request](https://github.com/CollegeAI/material-survey/pulls).

## [Interactive Demo](https://collegeai.github.io/material-survey)

The entire storybook for Material Survey can be viewed [here](https://collegeai.github.io/material-survey). Click the components on the left side of the page to see example components, at the bottom of the page shows the code to produce each component.

The most important component in Material Survey is the `Survey` component, [click here to view the Survey component](?selectedKind=Survey&selectedStory=All%20Question%20Types).

## Survey Props

```javascript
const App = () => (
  <Survey
    // See the "format" section, this is the SurveyJS/Material Survey format
    form={
      {
        /* ... */
      }
    }
    // Optional: Invoked when the user clicks submit or finishes survey
    // AnswerObject => any
    onFinish={answers => null}
    // Optional: Required for file upload. Must handle uploading and return URL of file.
    // File => Promise<string>
    onFileUpload={file => ""}
    // Optional: Handles autocomplete requests, should return list of options for a given query
    // (requestUrl: string, queryValue: string) => Promise<Array<{ value: string, label: string, subLabel?: string }>>
    autocompleteRequest={(requestUrl, queryValue) => Promise.resolve([])}
    // Optional: Called anytime a question is changed
    // (questionId: string, newValue: any, answers: Object) => null
    onQuestionChange={(questionId, newValue, answers) => null}
    // Optional: default answers or previous answers to Survey
    // Object
    defaultAnswers={{}}
    // Optional: Style variants for the survey
    // "flat" | "paper"
    variant="paper"
    // Optional: Whether or not to show complete/next/prev buttons
    // boolean
    noActions={false}
    // Optional: Customize complete text/content. Accepts React element.
    // string | React$Element
    completeText="Complete"
  />
)
```

## Format

The MaterialSurvey format is based off the [SurveyJS](https://github.com/surveyjs/surveyjs) format. Check [docs/material-survey-format.md](https://github.com/CollegeAI/material-survey/blob/master/docs/material-survey-format.md).

## Developing / Testing

This project uses [storybook](https://storybook.js.org/). To develop features or
create visual tests just run `yarn install && yarn storybook` in the cloned repository.
