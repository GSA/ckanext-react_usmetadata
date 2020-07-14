import React, { useState } from 'react'
import WrappedField from '../WrappedField'
import Notification from '../Notification'
import AlertBox from './AlertBox'
import ErrorFocus from './ErrorFocus'
import PropTypes from 'prop-types'
import Api from '../Api.js'
import { Formik, Form } from 'formik'
import { validationSchema } from '../schemas/requiredMetadata'
import 'react-autocomplete-input/dist/bundle.css'
import RequiredMetadata from './RequiredMetadata'
import Navigation from './Navigation'
import AdditionalMetadata from './AdditionalMetadata'
import ResourceMetadata from './ResourceMetadata'
import BackButton from './BackButton'
import SubmitButtons from './SubmitButtons'
import $ from 'jquery'

const defaultRequiredValues = {
  title: '',
  description: '',
  publisher: '',
  subagency: '',
  public_access_level: '',
  data_quality: '',
  license: '',
  license_others: '',
  rights_desc: '',
  spatial_location: '',
  temporal_start_date: '',
  temporal_end_desc: '',
  contact_name: '',
  contact_email: '',
  unique_id: '',
  rights: '',
}

// TODO put into state
const defaultAdditionalValues = {
  themes: '',
  data_dictionary_type: '',
  data_publishing_frequency: '',
  landing_url: '',
  data_language_subtag: '',
  data_regional_subtag: '',
  related_documents: '',
  release_date: '',
  system_of_records: '',
  select_parent_dataset: '',
  name_1: '',
}

const DatasetForm = ({
  dataset,
  updateUser,
  cancel,
  debug,
  ownerOrg,
  apiKey,
  apiUrl,
  datasetId,
  ...props
}) => {
  // form state
  let [step, setStep] = useState(1)
  let [formCount, setFormCount] = useState(0)
  let [shouldFetch, setShouldFetch] = useState(true)
  // dataset values
  let [requiredValues, setRequiredValues] = useState(defaultRequiredValues)
  let [additionalValues, setAdditionalValues] = useState(defaultAdditionalValues)
  let [stepOneResponse, setStepOneResponse] = useState()
  // errors
  let [stepOneError, setStepOneError] = useState()
  let [fetchDatasetError, setFetchDatasetError] = useState()

  console.log({
    shouldFetch,
    requiredValues,
    additionalValues,
    stepOneError,
    stepOneResponse,
    apiKey,
    apiUrl,
    datasetId,
  })

  if (datasetId && shouldFetch) {
    setShouldFetch(false)
    Api.fetchDataset(datasetId, apiUrl, apiKey)
      .then((res) => {
        console.log('FGETCH RES', res)
        setRequiredValues(res.data.result)
        // TODO parse extras to additional values
        // setAdditionalValues(ionalValues, res.data.result))
      })
      .catch(setFetchDatasetError)
  }

  const handleSteps = (nextstep) => {
    setStep(nextstep)
    $(window).scrollTop(0)
  }

  // Fetch Datasets from API and return as array of names
  const fetchDatasetsOpts = async (part, values, setOpts) => {
    let names = []
    names = values.packages ? values.packages.map((row) => row.name) : []
    const res = await Api.fetchDatasetsAutocompleteOpts(part, apiUrl)
    const matches = res.filter((val) => !names.includes(val))
    setOpts(matches)
  }

  return (
    <div className='container'>
      <Navigation handleSteps={handleSteps} currentStep={step} formCount={formCount} />

      <Formik
        initialValues={requiredValues}
        enableReinitialize={true}
        resetForm={(nextinitalValues) => {
          if (shouldFetch && requiredValues) return requiredValues
        }}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          setRequiredValues(values)
          if (values.id) {
            Api.updateDataset(values.id, values, {}, apiUrl, apiKey)
              .then((res) => {
                setStepOneResponse(res)
                handleSteps(2)
                setFormCount(1)
              })
              .catch((error) => {
                console.error('UPDATE DATASET ERROR', error)
                setStepOneError(error)
                handleSteps(2)
                setFormCount(1)
              })
          } else {
            Api.createDataset(ownerOrg, values, apiUrl, apiKey)
              .then((res) => {
                setStepOneResponse(res)
                handleSteps(2)
                setFormCount(1)
              })
              .catch((error) => {
                console.error('CREATE DATASET ERROR', error)
                setStepOneError(error)
                handleSteps(2)
                setFormCount(1)
              })
          }
        }}
        validationSchema={validationSchema}
        render={({
          values,
          errors,
          actions,
          touched,
          status,
          resetForm,
          handleSubmit,
          setValues,
          setStatus,
          isSubmitting,
          isValidating,
          isValid,
          dirty,
        }) => (
          <div className=''>
            <Form onSubmit={handleSubmit}>
              {status && <Notification {...status} />}
              <AlertBox errors={errors} />

              <RequiredMetadata
                values={values}
                currentStep={step}
                fetchDatasetsOpts={fetchDatasetsOpts}
                isValid={isValid}
              />
              <ErrorFocus errors={errors} isSubmitting={isSubmitting} isValidating={isValidating} />
            </Form>
          </div>
        )}
      />

      <Formik
        initialValues={defaultAdditionalValues}
        validateOnChange={false}
        validateOnBluer={false}
        onSubmit={(values, actions) => {
          const id = stepOneResponse && stepOneResponse.data.result.id
          if (id) {
            Api.updateDataset(id, {}, values, apiUrl, apiKey)
              .then((res) => {
                setFormCount(2)
              })
              .catch((error) => {
                console.error('UPDATE DATASET ERROR', error)
                // TODO remove this
                handleSteps(2)
                setFormCount(1)
              })
          } else {
            // TODO add wrning
            console.error('NO VALID DATASET SAVED IN STEP 1')
          }
        }}
        render={({
          values,
          errors,
          actions,
          touched,
          status,
          resetForm,
          handleSubmit,
          setValues,
          setFieldValue,
          setStatus,
          isSubmitting,
          isValidating,
          isValid,
          dirty,
        }) => (
          <div className=''>
            <Form onSubmit={handleSubmit}>
              {status && <Notification {...status} />}

              <AdditionalMetadata values={values} currentStep={step} />
              <ResourceMetadata values={values} currentStep={step} setFieldValue={setFieldValue} />

              <div className='row'>
                <div className='col-sm-12'>
                  <br />
                  <br />
                </div>
                <div className='col-sm-4'>
                  <BackButton currentStep={step} handleSteps={handleSteps} />
                </div>
                <div className='col-sm-8 text-right'>
                  <SubmitButtons currentStep={step} handleSteps={handleSteps} />
                </div>
              </div>
            </Form>
          </div>
        )}
      />
    </div>
  )
}

DatasetForm.propTypes = {
  name: PropTypes.string,
}

WrappedField.propTypes = {
  name: PropTypes.string,
}

export default DatasetForm
