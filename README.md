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

The application lives in the `./app` directory.
All react source code lives in `./app/src`.

Use `./app` directory as the root directory for react development using yarn.

* Install project dependencies by running `yarn`.
* Run `yarn start` to start the application at `localhost:3000`
The application will restart with any saved changes in the /src folder
* Run `yarn cosmos` to start the cosmos server at `localhost:8989`

### Building the application

Use `make build-app` to build the react application and copy it to the ckanext public folder.

## Contributing

We're so glad you're thinking about contributing to Data.gov!

Before contributing to this extension we encourage you to read our CONTRIBUTING guide, our LICENSE, and our README (you are here), all of which should be in this repository. If you have any questions, you can email the Data.gov team at datagov@gsa.gov.
