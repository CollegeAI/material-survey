# Material Survey Format

This document fully specifies the Material Survey Format, the JSON input format that defines the form and control flow.

The MaterialSurvey format is based off the [SurveyJS](https://github.com/surveyjs/surveyjs) format.

The [material-survey-format.js.flow](#) file contains the type definitions.

## Structure

A Material Survey can take two forms. A single page survey simply appears as follows...

```javascript
{
  "questions": [/* Array<SurveyQuestion> */]
}
```

A multi-page survey appears as follows...

```javascript
{
  pages: [/* Array<SurveyPage> /*]
}
```

Each survey can also have the following keys on the root object to specify different properties of the survey.

| Key                | Description                                                                                                                                                             | Default    |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| expressionLanguage | The language of conditional expressions e.g. the value of a `visibleIf`. See [expression languages](#expression-languages) for more details on the available languages. | "surveyjs" |

## Pages

Each page uses the following format.

```javascript
{
  elements: Array<Question>
}
```

## Questions Definition

The following question types are available...

| Question Type      | Description                                                             |
| ------------------ | ----------------------------------------------------------------------- |
| text               | Freeform text (tip: use validators to force a structure)                |
| multiline-text     | Text with multiple lines.                                               |
| radiogroup         | Single choice question.                                                 |
| checkbox           | Multichoice question.                                                   |
| dropdown           | Single choice question with many options.                               |
| multiple-dropdown  | Multi choice question with many options.                                |
| imagepicker        | Select from a set of images.                                            |
| choiceranker       | Rank options by iteratively asking users to pick their favorite answer. |
| matrixdynamic      | A question with any number of subquestions.                             |
| boolean            | A yes/no question.                                                      |
| rating             | A rating.                                                               |
| file               | Upload a file.                                                          |
| slider             | A numeric slider.                                                       |
| api-autocomplete   | Autocomplete using an API.                                              |
| us-region          | Select a US Region (East Coast, Midwest, West Coast, ...)               |
| multiple-us-region | Select multiple US regions.                                             |
| us-state           | Select a us state.                                                      |
| multiple-us-state  | Select multiple us states.                                              |

Each question has a base set of properties...

| Key           | Description                                                        |
| ------------- | ------------------------------------------------------------------ |
| name          | **Required** The answer key in the output map.                     |
| title         | The text displayed as the question title.                          |
| isRequired    | Should this question be required before continuing.                |
| hasOther      | Should an "Other" field be displayed allowing free form input.     |
| description   | A subtext to be displayed to clarify details about this quesiton.  |
| visibleIf     | Expression indicating whether or not the question should be shown. |
| defaultAnswer | Default answer for this question.                                  |
| validators    | Array of validators to check answer.                               |

If a question pulls from a set of possible answers (e.g. a dropdown or radiogroup) the format of a
choice is either a string or an object `{ "value": string, "text": string }` where `text` is how the
choice is displayed and `value` is how it is encoded in the answer map.

### text

| Key | Description |
| --- | ----------- |
| N/A | N/A         |

### multiline-text

| Key | Description |
| --- | ----------- |
| N/A | N/A         |

### radiogroup

| Key     | Description      |
| ------- | ---------------- |
| choices | Array of choices |

### checkbox

| Key     | Description      |
| ------- | ---------------- |
| choices | Array of choices |

### dropdown

| Key     | Description      |
| ------- | ---------------- |
| choices | Array of choices |

### multiple-dropdown

| Key     | Description      |
| ------- | ---------------- |
| choices | Array of choices |

### imagepicker

| Key     | Description      |
| ------- | ---------------- |
| choices | Array of choices |

### choiceranker

| Key           | Description                             |
| ------------- | --------------------------------------- |
| choices       | Array of choices                        |
| choicesAtOnce | Number of choices to display at once    |
| trials        | Number of selections to display to user |

### matrixdynamic

```javascript
type DynamicMatrixQuestion = {
  ...BaseQuestion,
  type: "matrixdynamic",
  choices: Array<QuestionChoice>,
  columns: Array<{
    name: string,
    title?: string,
    cellType: "dropdown" | "checkbox" | "text",
    choices: Array<QuestionChoice>,
    hasOther?: boolean
  }>
}
```

### boolean

| Key | Description |
| --- | ----------- |
| N/A | N/A         |

### rating

| Key                 | Description                    |
| ------------------- | ------------------------------ |
| rankings?           | Number of rankings             |
| rateValues?         | Values of each rating          |
| minRateDescription? | Description of lowest ranking  |
| midRateDescription? | Description of middle ranking  |
| maxRateDescription? | Description of highest ranking |

### file

| Key      | Description                |
| -------- | -------------------------- |
| maxSize? | Maximum file size in bytes |

### slider

| Key  | Description   |
| ---- | ------------- |
| min  | Minimum value |
| max  | Maximum value |
| step | Step size     |

### api-autocomplete

| Key        | Description                              |
| ---------- | ---------------------------------------- |
| requestUrl | Url to request for autocomplete response |

### us-region

| Key | Description |
| --- | ----------- |
| N/A | N/A         |

### multiple-us-region

| Key | Description |
| --- | ----------- |
| N/A | N/A         |

### us-state

| Key | Description |
| --- | ----------- |
| N/A | N/A         |

### multiple-us-state

| Key | Description |
| --- | ----------- |
| N/A | N/A         |

## Validators

Validators check the content of an answer and display relevant errors if a condition is not met.

The `text` key of each validator specifies the error text to be shown.

### email

Answer should be an email.

```javascript
{
  type: "email",
  text: string
}
```

### expression

Expression should evaluate to true.

Expressions can use multiple questions.

```javascript
{
  type: "expression",
  expression: string,
  text: string
}
```

### numeric

```javascript
{
  type: "numeric",
  minValue?: number,
  maxValue?: number,
  text: string
}
```

### text

```javascript
{
  type: "text",
  minLength?: number,
  maxLength?: number,
  allowDigits?: boolean,
  text: string
}
```

### regex

```javascript
{
  type: "regex",
  regex: string,
  text: string
}
```

### answercount

```javascript
{
  type: "answercount",
  text: string,
  minCount?: number,
  maxCount?: number
}
```

## Expression Languages

| Language | Description                                                       |
| -------- | ----------------------------------------------------------------- |
| surveyjs | The expression language defined by the original surveyjs project. |

### "surveyjs"

The expression language defined by the original [surveyjs project](https://surveyjs.io). Details regarding this expression format can be found in the [surveyjs-expression-eval](https://github.com/CollegeAI/surveyjs-expression-eval).

## Output Format

The output of the survey is a JSON object with a key representing each question.

e.g.

````javascript
{
  "favorite-foods": ["spaghetti", "ramen"],
  "inception-rating": 4.8
}```
````
