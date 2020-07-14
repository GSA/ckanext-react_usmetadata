import React from 'react'
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'
import App from '../App'
import Api from '../Api'
import initMocks from '../fixtures'

initMocks()
const apiUrl = 'http://ckan-dev:5000/api/3/action/'

it('Renders new Master Collection form', () => {
  const div = document.createElement('div')
  const { getAllByText } = render(<App collection={{ extras: { master: true } }} />, div)
  const node = getAllByText('Required Metadata')
  console.log(node[1])
  expect(node[1].tagName).toBe('H1')
})
