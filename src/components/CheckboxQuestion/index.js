// @flow

import type { CheckboxQuestion } from "../../material-survey-format.js.flow"
import React, { useState } from "react"

export const Component = ({ title, name, defaultAnswer }: CheckboxQuestion) => {
  const [answer, changeAnswer] = useState(defaultAnswer || "")
  return <div>asd</div>
}

export default Component
