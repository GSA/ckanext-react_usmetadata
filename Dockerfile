FROM openknowledge/ckan-dev:2.8
ENV GIT_BRANCH=ckan-2.8.4

RUN mkdir /srv/app/src_extensions/ckanext-react_usmetadata
COPY . /srv/app/src_extensions/ckanext-react_usmetadata
RUN cd /srv/app/src_extensions/ckanext-react_usmetadata && python setup.py develop
