// @flow
import type { Validator } from "../../material-survey-format.js.flow"

var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default (validator: Validator, value: any) => {
  switch (validator.type) {
    case "email": {
      if (typeof value !== "string") return false
      return emailRegex.test(value.toLowerCase())
    }
    case "expression": {
      // expression validators can only run at a Survey level
      return true
    }
    case "numeric": {
      const { minValue, maxValue } = validator
      if (typeof value === "string") value = parseFloat(value)
      if (isNaN(value)) return false
      return value >= minValue && value <= maxValue
    }
    case "text": {
      const { minLength, maxLength, allowDigits } = validator
      if (typeof value !== "string") return false
      if (value.length < minLength) return false
      if (value.length > maxLength) return false
      if (allowDigits === false && value.match(/[0-9]+/)) return false
      return true
    }
    case "regex": {
      if (typeof value !== "string") return false
      const re = new RegExp(value)
      return re.test(value)
    }
    case "answercount": {
      if (typeof value !== "object") return false
      const { maxCount, minCount } = validator
      if (value.length > maxCount) return false
      if (value.length < minCount) return false
      return true
    }
    default: {
      throw new Error(`Unknown validator type: "${validator.type}"`)
    }
  }
}
