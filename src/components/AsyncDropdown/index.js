// @flow

import React from "react"
import AsyncSelect from "react-select/async"
import useTheme from "@material-ui/core/styles/useTheme"

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
}: Props) => {
  const MUItheme = useTheme()
  return (
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
        menuPortal: provided => ({ ...provided, zIndex: 10000 }),
        singleValue: provided => ({
          ...provided,
          color: MUItheme.palette.text.primary
        }),
        option: (provided, { data, isDisabled, isFocused, isSelected }) => ({
          ...provided,
          color: (isFocused || isSelected) ? MUItheme.palette.primary.contrastText : MUItheme.palette.text.primary
        })
      }}
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: MUItheme.palette.primary.main,
          primary75: MUItheme.palette.primary.light,
          primary50: MUItheme.palette.primary.light,
          primary25: MUItheme.palette.primary.light,
          neutral0: MUItheme.palette.background.paper,
          neutral5: MUItheme.palette.grey['50'],
          neutral10: MUItheme.palette.grey['100'],
          neutral20: MUItheme.palette.grey['200'],
          neutral30: MUItheme.palette.grey['300'],
          neutral40: MUItheme.palette.grey['400'],
          neutral50: MUItheme.palette.grey['500'],
          neutral60: MUItheme.palette.grey['600'],
          neutral70: MUItheme.palette.grey['700'],
          neutral80: MUItheme.palette.grey['800'],
          neutral90: MUItheme.palette.grey['900']
        }
      })}
      loadOptions={async inputValue => {
        if (autocompleteRequest) {
          return (await autocompleteRequest(requestUrl, inputValue)).map(
            ({ value, label, subLabel }: any) => ({
              value,
              label: subLabel ? (
                <div
                  aria-label={label}
                >
                  {label}
                  <div
                    style={{
                      opacity: 0.7,
                      fontSize: 12
                    }}
                    aria-label={subLabel}
                  >
                    {subLabel}
                  </div>
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
}
