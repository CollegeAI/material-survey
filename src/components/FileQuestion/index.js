// @flow

import type { FileQuestion } from "../../material-survey-format.js.flow"
import React, { useState } from "react"
import QuestionContainer from "../QuestionContainer"
import styled from "styled-components"
import QuestionText from "../QuestionText"
import useQuestionAnswer from "../../hooks/use-question-answer"
import Dropzone from "react-dropzone"
import CircularProgress from "@material-ui/core/CircularProgress"

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
  const [uploadError, changeUploadError] = useState(null)
  return (
    <QuestionContainer
      question={question}
      error={uploadError || error}
      answered={answer !== undefined}
    >
      {!uploading ? (
        <Dropzone
          id={question.id?question.id+"Dropzone":""}
          onDrop={async (file: File) => {
            changeUploadError(null)
            changeUploadingState(true)
            try {
              const fileUrl = await onFileUpload(file)
              changeAnswer(fileUrl)
              changeUploadError(null)
            } catch (e) {
              changeUploadError(e.toString())
            }
            changeUploadingState(false)
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
      ) : (
        <div style={{ textAlign: "center" }}>
          <CircularProgress size={80} />
        </div>
      )}
    </QuestionContainer>
  )
}
