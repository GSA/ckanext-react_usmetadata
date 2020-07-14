import React from 'react'

export default class ErrorFocus extends React.Component {
  componentDidUpdate(prevProps) {
    const { isSubmitting, isValidating, errors } = prevProps
    const keys = Object.keys(errors)
    console.log({ prevProps, keys, errors })

    if (keys.length > 0 && isSubmitting && !isValidating) {
      const selector = `[name="${keys[0]}"]`
      const errorElement = document.querySelector(selector)
      errorElement.focus()
    }
  }

  render() {
    return null
  }
}
