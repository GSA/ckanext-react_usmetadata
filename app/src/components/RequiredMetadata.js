import React, { Component } from 'react'
import WrappedField from '../WrappedField'
import AutocompleteFetch from '../AutocompleteFetch'
import HelpText from './HelpText'
import Radio from './Radio'
import $ from 'jquery'

export class RequiredMetadata extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rights: 'true',
      spatial: 'false',
      temporal: 'false',
      license: '',
      license_others: 'false',
    }
  }

  handleLicense = (event) => {
    this.setState({
      license: event.target.value,
    })
    if (event.target.value === 'Others') {
      this.setState({
        license_others: 'true',
      })
    } else {
      this.setState({
        license_others: 'false',
      })
    }
  }

  handleRightsRadio = (event) => {
    this.setState({
      rights: event.target.value,
    })
  }

  handleSpatialRadio = (event) => {
    this.setState({
      spatial: event.target.value,
    })
  }

  handleTemporalRadio = (event) => {
    this.setState({
      temporal: event.target.value,
    })
  }

  urlify(text) {
    text = text.replace(/\s+/g, '-').toLowerCase()
    return text
  }

  editText = false
  editURL = () => {
    this.editText = true
    $('.dataset_url_input').removeClass('hidden')
    $('.dataset_url_edit').addClass('hidden')
    $('.dataset_absolute_url').addClass('hidden')
  }

  render() {
    if (this.props.currentStep !== 1) {
      // Prop: The current step
      return null
    }
    return (
      <div className='usa-form-custom'>
        <section id='section-basic-mega-menu' className='site-component-section'>
          <h1 className='usite-page-title' id='basic-mega-menu'>
            Required Metadata
          </h1>
          <p className='site-text-intro'>
            This form follows the <a href='#'>DCAT-US Schema.</a>
          </p>
        </section>
        <div className='row'>
          <div className='col-md-12'>
            <WrappedField
              label='Title'
              name='title'
              type='string'
              placeholder=''
              helptext=<HelpText>
                Use <a href='https://plainlanguage.gov/'>everyday language</a> to make the dataset easy to find and understand
              </HelpText>
              value={this.props.values.title}
              required='true'
            />

            <br />
            <p className='dataset_url'>
              URL: vanilla28.ckan.io/dataset/
              <span className='dataset_absolute_url'>{this.urlify(this.props.values.title)}</span>
            </p>

            <input type='text' className={`dataset_url_input hidden`}></input>
            <button
              type='button'
              className='usa-button dataset_url_edit'
              onClick={() => this.editURL()}
            >
              Edit
            </button>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <WrappedField
              label='Description'
              name='description'
              type='string'
              component='textarea'
              rows='6'
              helptext=<HelpText>
                Write a description (like an abstract) with enough detail to help a user quickly
                decide if the asset is of interest. You can use{' '}
                <a href='https://www.markdownguide.org/basic-syntax/'>Markdown Formatting</a> here.
              </HelpText>
              value={this.props.values.description}
              required={true}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <label className='usa-label'>Tags*</label>
            <AutocompleteFetch
              values={this.props.values}
              apiUrl={this.props.apiUrl}
              name='tags'
              titleField='name'
              required={true}
              getOptions={this.props.fetchDatasetsOpts}
              helpText=<HelpText>
                Use both technical and non-technical terms to help users find your dataset.
              </HelpText>
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <WrappedField
              label='Publisher'
              name='publisher'
              type='select'
              choices={['Publisher 1 ', 'Publisher 2', 'Publisher 3', 'Publisher 4']}
              required={true}
              className='error-msg'
              helpText=<HelpText>
                If you do not see the Publisher for your dataset listed, please contact{' '}
                <a href='mailto:inventory-help@gsa.gov'>inventory-help@gsa.gov</a> for further
                assistance. Start typing to add tags.
              </HelpText>
              infoText='The publishing entity (e.g. your agency) and optionally their parent organization(s).'
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <WrappedField
              label='Sub Agency'
              name='subagency'
              type='select'
              choices={['Sub Agency 1 ', 'Sub Agency 2', 'Sub Agency 3', 'Sub-Agency 4']}
              className='error-msg'
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <WrappedField label='Contact Name' name='contact_name' type='string' required={true} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <WrappedField
              label='Contact Email'
              name='contact_email'
              type='string'
              required={true}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <WrappedField label='Unique ID' name='unique_id' type='string' required={true} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <WrappedField
              label='Public Access level'
              name='public_access_level'
              type='select'
              choices={['public', 'restricted public', 'non-public']}
              className='error-msg'
              required={true}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <WrappedField
              label='Meets Agency Data Quality'
              name='data_quality'
              type='select'
              choices={['Yes', 'No']}
              className='error-msg'
              required={true}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <WrappedField
              label='License'
              name='license'
              type='select'
              choices={['MIT', 'Open Source License', 'Others']}
              className='error-msg'
              value={this.license}
              onChange={this.handleLicense}
              required={true}
            />
            <WrappedField
              name='license_others'
              type='string'
              helptext=<HelpText>
                If you selected “Other”, please specify the name of your License*'
              </HelpText>
              disabled={this.state.license_others === 'true' ? false : true}
              required={true}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <label className='usa-label'>Rights*</label> <br />
            <Radio
              label='My dataset is public'
              name='rights'
              value='true'
              selected={true}
              handleRadio={this.handleRightsRadio}
              id='rights_option_1'
            />
            <Radio
              label='My dataset is not public'
              name='rights'
              value='false'
              selected={false}
              handleRadio={this.handleRightsRadio}
              id='rights_option_2'
            />
            <WrappedField
              name='rights_desc'
              type='string'
              value={this.props.values.rights_desc}
              helptext=<HelpText>
                If your dataset is not public, please add an explanation of rights and feel free to
                include any instructions on restrictions, or how to access a restricted file (max
                255 characters)*
              </HelpText>
              disabled={this.state.rights === 'true' ? true : ''}
              required={this.state.rights === 'true' ? '' : true}
            />
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <label className='usa-label'>Relevant Location*</label> <br />
            <Radio
              label='My dataset does not have a spatial component'
              name='spatial'
              value='false'
              selected={true}
              handleRadio={this.handleSpatialRadio}
              id='spatial_option_1'
            />
            <Radio
              label='My dataset does have a spatial component'
              name='spatial'
              value='true'
              selected={false}
              handleRadio={this.handleSpatialRadio}
              id='spatial_option_2'
            />
            <WrappedField
              name='spatial_location'
              type='string'
              value={this.props.values.spatial_location}
              helptext=<HelpText>
                If your dataset has a spatial component, please provide location such as place name
                or latitude/longitude pairs above*
              </HelpText>
              disabled={this.state.spatial === 'true' ? '' : true}
              required={this.state.spatial === 'true' ? '' : true}
            />
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <label className='usa-label'>Temporal*</label> <br />
            <Radio
              label='My dataset does not have a start and end date for the applicability of data'
              name='temporal'
              value='false'
              selected={true}
              handleRadio={this.handleTemporalRadio}
              id='temporal_option_1'
            />
            <Radio
              label='My dataset does have a start and end date for the applicability of data'
              name='temporal'
              value='true'
              selected={false}
              handleRadio={this.handleTemporalRadio}
              id='temporal_option_2'
            />
            <WrappedField
              name='temporal_start_date'
              type='date'
              helptext=<HelpText>
                If your dataset has a temporal component, please provide start date for
                applicability of data above*
              </HelpText>
              disabled={this.state.temporal === 'true' ? '' : true}
              required={this.state.temporal === 'true' ? '' : true}
            />
            <WrappedField
              name='temporal_end_desc'
              type='date'
              helptext=<HelpText>
                If your dataset has a temporal component, please provide start date for
                applicability of data above*
              </HelpText>
              disabled={this.state.temporal === 'true' ? '' : true}
              required={this.state.temporal === 'true' ? '' : true}
            />
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-12 text-right'>
            <br />
            <br />
            <button className='usa-button usa-button--outline'>Save as draft</button>
            <button className='usa-button' type='submit'>
              Save and Continue
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default RequiredMetadata
