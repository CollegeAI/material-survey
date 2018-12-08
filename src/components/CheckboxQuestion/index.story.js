// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import CheckboxQuestion from "./"

storiesOf("CheckboxQuestion", module).add("Basic", () => <CheckboxQuestion />)
