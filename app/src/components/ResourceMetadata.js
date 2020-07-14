import React, { useState } from 'react'
import WrappedField from '../WrappedField'

const ResourceMetadata = ({ currentStep, values, setFieldValue, ...props }) => {
  let [linkToDataIsActive, setLinkToDataActive] = useState(false)
  let [uploadDataFileIsActive, setUploadDataFileActive] = useState(false)

  if (currentStep !== 3) {
    // Prop: The current step
    return null
  }
  return (
    <div className='usa-form-custom'>
      <section id='section-basic-mega-menu' className='site-component-section'>
        <h1 className='usite-page-title' id='basic-mega-menu'>
          Resource Upload
        </h1>
        <p className='site-text-intro'>
          You can add the URL of the dataset where it is available on the agency website. If you are
          uploading the dataset itself, please notify the Data.gov team at{' '}
          <a href='mailto:inventory-help@gsa.gov'>inventory-help@gsa.gov</a>. You can also add a URL
          or file of information related to the dataset such as a data dictionary.
        </p>
      </section>
      <div className='row'>
        <div className='col-md-12'>
          <label className='usa-label'>Data</label>
          {linkToDataIsActive ? (
            <WrappedField
              hidden={!linkToDataIsActive}
              id='url'
              name='url'
              type='url'
              placeholder='If you are linking to a dataset, please include "http://" at the beginning of your URL.'
              value={values.url}
              onClick={() => {
                setFieldValue('url', '')
                setLinkToDataActive(false)
              }}
            />
          ) : uploadDataFileIsActive ? (
            <WrappedField
              disabled
              name='fileName'
              type='string'
              value={values.upload.name}
              onClick={() => {
                setFieldValue('upload', '')
                setUploadDataFileActive(false)
              }}
            />
          ) : (
            <>
              <br />
              <label htmlFor='upload' className='usa-button usa-button--base'>
                <i class='fa fa-cloud-upload' aria-hidden='true'></i> Upload data
              </label>
              <input
                id='upload'
                name='upload'
                type='file'
                onChange={(event) => {
                  setUploadDataFileActive(!uploadDataFileIsActive)
                  if (!values.name) {
                    setFieldValue('name', event.currentTarget.files[0].name)
                  }
                  setFieldValue('upload', event.currentTarget.files[0])
                }}
              />
              <label
                htmlFor='url'
                className='usa-button usa-button--base'
                onClick={() => {
                  setLinkToDataActive(!linkToDataIsActive)
                }}
              >
                <i class='fa fa-link' aria-hidden='true'></i> Link to data
              </label>
            </>
          )}
          <p className={`usa-helptext`}>
            Formats accepted include the following: TXT, HTML, TSV, CSV, ODT, XML, Perl.
          </p>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <WrappedField
            label='Name'
            name='name'
            type='string'
            placeholder=''
            helptext=''
            value={values.name}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <WrappedField
            label='Description'
            name='resource_description'
            type='string'
            component='textarea'
            rows='6'
            helptext='You can use Markdown Formatting here.'
            value={values.resource_description}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <WrappedField
            label='Media Type'
            name='media_type'
            type='select'
            choices={['Type 1 ', 'Type 2', 'Type 3', 'Type 4']}
            helptext='Start typing to select a media type.  Examples include: text/csv, application/xml, or application/json.'
            value={values.media_type}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <WrappedField
            label='Format'
            name='format'
            type='string'
            helptext='Examples include: csv, xml, json.  This will be guessed automatically.  Leave blank if you wish.'
            value={values.format}
          />
        </div>
      </div>
    </div>
  )
}

export default ResourceMetadata
