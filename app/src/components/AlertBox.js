import React from 'react'

const AlertBox = ({ errors = {} }) => {
  return (
    <div
      id='alertbox'
      className='row'
      style={{ display: Object.keys(errors).length > 0 ? 'block' : 'none' }}
    >
      <div className='col-md-12'>
        <div className='error_message'>
          <div className='icon'></div>
          <div className='content'>
            <h3>This form contains invalid entries:</h3>
            {errors &&
              Object.keys(errors).map((error) => (
                <p>
                  <b>{error}</b> {errors[error]}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlertBox
