// @flow

import type { FileQuestion } from "../../material-survey-format.js.flow"
import React, { useState } from "react"
import QuestionContainer from "../QuestionContainer"
import styled from "styled-components"
import QuestionText from "../QuestionText"
import useQuestionAnswer from "../../hooks/use-question-answer"
import Dropzone from "react-dropzone/dist/es"

const Box = styled.div`
  && {
    border: 2px dashed #ccc;
    font-family: Roboto, sans-serif;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
    cursor: pointer;
  }
`

export default ({
  question,
  onChangeAnswer,
  onFileUpload
}: {
  question: FileQuestion,
  onChangeAnswer: Function,
  onFileUpload: File => Promise<string>
}) => {
  const [{ answer, error }, changeAnswer] = useQuestionAnswer(
    question,
    onChangeAnswer
  )
  const [uploading, changeUploadingState] = useState(false)
  return (
    <QuestionContainer question={question} answered={answer !== undefined}>
      <Dropzone
        onDrop={async (file: File) => {
          const fileUrl = await onFileUpload(file)
          changeAnswer(fileUrl)
        }}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <Box {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop file here...</p>
            ) : (
              <div>
                {answer ? (
                  <p>File successfully uploaded! Click to replace.</p>
                ) : (
                  <p>Drag and drop a file here, or click to select file.</p>
                )}
              </div>
            )}
          </Box>
        )}
      </Dropzone>
    </QuestionContainer>
  )
}
