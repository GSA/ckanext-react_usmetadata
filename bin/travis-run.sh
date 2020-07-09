#!/bin/sh -e

echo "NO_START=0\nJETTY_HOST=127.0.0.1\nJETTY_PORT=8983\nJAVA_HOME=$JAVA_HOME" | sudo tee /etc/default/jetty
sudo cp ckan/ckan/config/solr/schema.xml /etc/solr/conf/schema.xml
sudo service jetty restart
cd /usr/lib/ckan/src/ckanext-react_usmetadata
nosetests --ckan --nologcapture --with-pylons=test.ini --reset-db --with-coverage --cover-package=ckanext.react_usmetadata --cover-inclusive --cover-erase --cover-tests
