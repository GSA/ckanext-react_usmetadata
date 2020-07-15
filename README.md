# ckanext-react_usmetadata

This extension provides a react Admin UI for managing custom fields related to [DCAT-US Schema](https://https://resources.data.gov/resources/dcat-us/)

## Installation

To install this package, activate CKAN virtualenv (e.g. "source /path/to/virtenv/bin/activate"), then run

`(virtualenv) pip install -e git+https://github.com/GSA/ckanext-react_usmetadata@master#egg=ckanext-react_usmetadata`
`(virtualenv) python setup.py develop`

In your CKAN .ini file add `react_usmetadata` to your enabled plugins:

`ckan.plugins = [YOUR PLUGINS HERE...] react_usmetadata`

## Testing

Run `make test` to run the tests locally inside a docker container

**NOTE** That you need to have docker and docker-compose installed locally for the tests to run.

## Development

TODO

## Contributing

We're so glad you're thinking about contributing to Data.gov!

Before contributing to this extension we encourage you to read our CONTRIBUTING guide, our LICENSE, and our README (you are here), all of which should be in this repository. If you have any questions, you can email the Data.gov team at datagov@gsa.gov.
