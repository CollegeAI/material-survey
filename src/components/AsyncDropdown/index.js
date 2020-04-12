// @flow

import React from "react"
import AsyncSelect from "react-select/async"

type Props = {
  answer?: string,
  onChange: string => any,
  autocompleteRequest: (
    requestUrl: string,
    query: string
  ) => Promise<Array<string>>,
  requestUrl: string,
  placeholder?: string
}

export default ({
  answer,
  onChange,
  autocompleteRequest,
  placeholder,
  requestUrl
}: Props) => (
  <AsyncSelect
    placeholder={answer || placeholder}
    className="material-survey-selection"
    styles={{
      menu: provided => ({
        ...provided,
        fontFamily: "Roboto, sans-serif"
      }),
      container: provided => ({
        ...provided,
        fontFamily: "Roboto, sans-serif"
      }),
      menuPortal: provided => ({ ...provided, zIndex: 10000 })
    }}
    loadOptions={async inputValue => {
      if (autocompleteRequest) {
        return (await autocompleteRequest(requestUrl, inputValue)).map(
          ({ value, label, subLabel }: any) => ({
            value,
            label: subLabel ? (
              <div>
                {label}
                <div style={{ opacity: 0.7, fontSize: 12 }}>{subLabel}</div>
              </div>
            ) : (
              label
            )
          })
        )
      } else {
        return [
          {
            value: "",
            label: "No autocompleteRequest callback configured"
          }
        ]
      }
    }}
    menuPortalTarget={document.body}
    onChange={({ value }) => onChange(value)}
  />
)
