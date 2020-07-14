import React from 'react'
import './App.css'
import PropTypes from 'prop-types'
import DatasetForm from './components/DatasetForm'

const App = (props) => {
  console.log('APP', props)
  return (
    <div className='App'>
      <DatasetForm ownerOrg='123' {...props} />
    </div>
  )
}

App.propTypes = {
  collection: PropTypes.object,
}

export default App
