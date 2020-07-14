import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  contact_name: yup.string().required('Contact is required'),
  unique_id: yup.string().required('Unique ID is required'),
  contact_email: yup.string().email('Must be valid email').required('Contact email is required'),
  description: yup.string().required('Description 123 is required'),
  publisher: yup.string().required('Publisher is required'),
  subagency: yup.string(),
  public_access_level: yup.string().required('Access level is required'),
  data_quality: yup.string(),
  rights_desc: yup.string(),
  spatial_location: yup.string(),
  license_others: yup.string(),
  temporal_start_date: yup.date(),
  temporal_end_date: yup.date(),
})
