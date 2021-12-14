// @flow

import React, { useState, useEffect } from "react"
import type { ChoiceRankerQuestion } from "../../material-survey-format.js.flow"
import Sorter from "k-choice-sort"
import QuestionContainer from "../QuestionContainer"
import Button from "@mui/material/Button"
import styled from "styled-components"
import ArrowIcon from "@mui/icons-material/ArrowRight"
import RefreshIcon from "@mui/icons-material/Refresh"

const ChoiceButton = styled(Button)`
  && {
    width: 100%;
    justify-content: flex-start;
    text-transform: none;
  }
`

const RetryButton = styled(Button)`
  && {
    width: 100%;
    text-transform: none;
    font-size: 24px;
  }
`

const AnimatedChoiceContainer = styled.div`
  transition: 300ms transform, 300ms opacity;
`

export default ({
  question,
  onChangeAnswer
}: {
  question: ChoiceRankerQuestion,
  onChangeAnswer: Function
}) => {
  const [answer, changeAnswer] = useState(question.defaultAnswer || undefined)
  const { trials: maxTrialCount, choices: choicesRaw, choicesAtOnce } = question
  const choices = choicesRaw.map(c =>
    typeof c === "string" ? { value: c, text: c } : c
  )
  const [sorter, changeSorter] = useState(
    new Sorter({
      items: choices.map(c => c.value),
      maxCandidates: choicesAtOnce
    })
  )
  const [candidates, changeCandidates] = useState(sorter.getCandidates())
  const [trialCount, changeTrialCount] = useState(0)
  const [animateDirection, changeAnimateDirection] = useState("middle")
  const [done, changeDone] = useState(false)

  return (
    <QuestionContainer
      question={question}
      answered={answer}
      fadedTitle={`(${trialCount}/${maxTrialCount})`}
    >
      {!done ? (
        <AnimatedChoiceContainer
          style={{
            transform: `translateX(${
              animateDirection === "left"
                ? "-300px"
                : animateDirection === "right"
                ? "1200px"
                : "0px"
            })`,
            opacity: animateDirection === "middle" ? 1 : 0
          }}
        >
          {candidates.map(cand => {
            const choice = choices.find(c => c.value === cand)
            return (
              <ChoiceButton
                disabled={animateDirection !== "middle"}
                onClick={() => {
                  changeAnimateDirection("left")
                  changeTrialCount(trialCount + 1)
                  sorter.recordAnswer(cand, candidates.filter(c => c !== cand))
                  setTimeout(() => {
                    changeCandidates(sorter.getCandidates())
                    if (sorter.isSorted() || trialCount + 1 >= maxTrialCount) {
                      changeDone(true)
                      changeAnswer(sorter.getRankings())
                      onChangeAnswer(sorter.getRankings())
                    } else {
                      changeAnimateDirection("middle")
                    }
                  }, 300)
                }}
                id={question.id?question.id+choice.text:""}
              >
                <ArrowIcon />
                {choice.text}
              </ChoiceButton>
            )
          })}
        </AnimatedChoiceContainer>
      ) : (
        <RetryButton
          onClick={() => {
            changeDone(false)
            changeTrialCount(0)
            const newSorter = new Sorter({
              items: choices.map(c => c.value),
              maxCandidates: choicesAtOnce
            })
            changeSorter(newSorter)
            changeCandidates(newSorter.getCandidates())
            changeAnimateDirection("middle")
          }}
          id={question.id?question.id+"Retry":""}
        >
          <RefreshIcon style={{ width: 64, height: 64, marginRight: 8 }} />
          Redo
        </RetryButton>
      )}
    </QuestionContainer>
  )
}
