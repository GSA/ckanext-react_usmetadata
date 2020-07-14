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

### React application development

The application lives in the `/app` directory.

Use app/ directory as the root directory for react development using yarn.

Run the application using `yarn start`. It will restart with any saved changes in the /src folder

We encorouge you to use [cosmos](https://reactcosmos.org/) to view application elements. Use `yarn cosmos` to start the cosmos server. The cosmos server will run on `https://localhost:8989`

### Building the application

Use `make build-app` to build the react application and copy it to the ckanext public folder.

## Contributing

We're so glad you're thinking about contributing to Data.gov!

Before contributing to this extension we encourage you to read our CONTRIBUTING guide, our LICENSE, and our README (you are here), all of which should be in this repository. If you have any questions, you can email the Data.gov team at datagov@gsa.gov.
