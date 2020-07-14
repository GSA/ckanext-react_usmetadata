import axios from 'axios'

const EXTRAS = [
  'category',
  'programCode',
  'organization',
  'dataLevel',
  'spatial',
  'frequency',
  'contactName',
  'contactEmail',
  'references',
  'summary_dataset',
  'master',
  'homePage',
]

const safeName = (name) => name.split(' ').join('_').replace(/\W/g, '').toLowerCase()

/**
 * Encode extras for CKAN 2.8.2 Groups format
 **/
const encodeExtras = (opts) => {
  if (opts) {
    const extras = EXTRAS.map((key) => {
      return { key: key, value: opts[key] || '' }
    })
    return extras
  }
  return [{}]
}

/**
 * Decode extras from CKAN 2.8.2 Groups format
 **/
const decodeExtras = (opts) => {
  const extras = EXTRAS.reduce((acc, key) => {
    const row = opts.find((r) => r.key === key)
    const val = (row && row.value) || ''
    acc[key] = val
    return acc
  }, {})

  return extras
}

const normalizeRes = (res) => {
  try {
    const result = JSON.parse(JSON.stringify(res.data.result)) // dereference
    result.extras = decodeExtras(result.extras)
    res.data.result = result
    return res
  } catch (e) {
    console.warn(e)
    return res
  }
}

const createDataset = (ownerOrg, opts, apiUrl, apiKey) => {
  opts.name = safeName(opts.title)
  opts.owner_org = ownerOrg
  opts.tag_string = opts.tags.reduce((acc, cur) => {
    if (acc.length === 0) {
      return acc + cur.name
    } else {
      return acc + ', ' + cur.name
    }
  }, '')
  // TODO this should be abstracted / implementation specific code
  opts.modified = new Date()
  opts.notes = opts.description // TODO not sure what notes is supposed to be
  opts.bureau_code = '015:11'
  opts.program_code = '015:001'
  return axios.post(apiUrl + 'package_create', opts, {
    headers: {
      'X-CKAN-API-Key': apiKey,
    },
  })
}

const fetchDataset = (id, apiUrl, apiKey) => {
  return axios(apiUrl + `package_show?id=${id}`, {
    headers: {
      'X-CKAN-API-Key': apiKey,
    },
  })
}

const updateDataset = (id, values, extras, apiUrl, apiKey) => {
  const vals = Object.assign({}, values, { id })
  const keys = Object.keys(extras)
  // TODO see createDataset for implementtion specific code
  vals.extras = keys
    .filter((keyName) => extras[keyName])
    .map((keyName) => ({ key: keyName, value: extras[keyName] }))
  return axios.post(apiUrl + 'package_update', vals, {
    headers: {
      'X-CKAN-API-Key': apiKey,
    },
  })
}

const fetchDatasetsAutocompleteOpts = async (str, apiUrl, apiKey) => {
  try {
    const url = apiUrl + `package_search?q=${str}`
    const res = await axios.get(url, {
      headers: {
        'X-CKAN-API-Key': apiKey,
      },
    })
    return res.data.result.results.map((row) => row.name)
  } catch (e) {
    return Promise.reject('Error fetching results', e)
  }
}

export default {
  createDataset,
  updateDataset,
  fetchDataset,
  fetchDatasetsAutocompleteOpts,
}
