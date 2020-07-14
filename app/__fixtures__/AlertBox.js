import AlertBox from '../src/components/AlertBox'
import '../src/css/custom.css'

const errors = {
  contact_name: 'Contact is required',
  unique_id: 'Unique ID is required',
  contact_email: 'Contact email is required',
  publisher: 'Publisher is required',
  public_access_level: 'Access level is required',
}
export default {
  component: AlertBox,
  props: { errors },
}
