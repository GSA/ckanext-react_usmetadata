#!/bin/bash
set -e

if [ $CKANVERSION == 'master' ]
then
   export CKAN_MINOR_VERSION=100
else
   export CKAN_MINOR_VERSION=${CKANVERSION##*.}
fi

if (( $CKAN_MINOR_VERSION >= 9 ))
then
   pytest --ckan-ini=subdir/test.ini ckanext/react_usmetadata/tests
else
   nosetests --ckan --nologcapture --with-pylons=subdir/test.ini --cover-package=ckanext.react_usmetadata --cover-inclusive --cover-erase --cover-tests
fi
