#!/bin/sh -e

echo "TESTING ckanext-react_usmetadata"
nosetests --ckan --with-pylons=subdir/test.ini ckanext/react_usmetadata
