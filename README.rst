.. You should enable this project on travis-ci.org and coveralls.io to make
   these badges work. The necessary Travis and Coverage config files have been
   generated for you.

.. image:: https://travis-ci.org/datopian/ckanext-react_usmetadata.svg?branch=master
    :target: https://travis-ci.org/datopian/ckanext-react_usmetadata


=============
ckanext-react_usmetadata
=============

Embeds the React USMetadata App using custom paths

------------
Requirements
------------

Tested with GSA Inventory App and CKAN 2.5 and greater

------------
Installation
------------

The CKAN extension installs like a regular CKAN extension.

To update the embedded react application:

0. Backup and remove this public folder
1. Go to the react application directory
2. `yarn build`
3. `cp -r build/static/* /path/to/ckanext-react_usmetadata/ckanext/react_usmetadata/public/
4. type `ls public/js`. The file names contain a hash value for example:
  * runtime~main.7ba465df.js
  * main.b0613878.chunk.js
  * 2.758f1cc0.chunk.js
  (Note that you can ignore the `.js.map` files. Just leave them alone)
  Copy the updated filenames for future reference.
4. Do the same for the `public/css` folder, recording the new filenames
5. Open `/path/to/ckanext-react_usmetadata/templates/snippets/usmetadata_app.html`
6. Replace the `<script>` and `<link>` tags with the new filenames from the previous steps.
7. Test and commit the changes.

------------------------
Development Installation
------------------------

To install ckanext-react_usmetadata for development, activate your CKAN virtualenv and
do::

    git clone https://github.com/datopian/ckanext-react_usmetadata.git
    cd ckanext-react_usmetadata
    python setup.py develop
    pip install -r dev-requirements.txt


-----------------
Running the Tests
-----------------

To run the tests, do::

    nosetests --nologcapture --with-pylons=test.ini

To run the tests and produce a coverage report, first make sure you have
coverage installed in your virtualenv (``pip install coverage``) then run::

    nosetests --nologcapture --with-pylons=test.ini --with-coverage --cover-package=ckanext.react_usmetadata --cover-inclusive --cover-erase --cover-tests


---------------------------------
Registering ckanext-react_usmetadata on PyPI
---------------------------------

ckanext-react_usmetadata should be availabe on PyPI as
https://pypi.python.org/pypi/ckanext-react_usmetadata. If that link doesn't work, then
you can register the project on PyPI for the first time by following these
steps:

1. Create a source distribution of the project::

     python setup.py sdist

2. Register the project::

     python setup.py register

3. Upload the source distribution to PyPI::

     python setup.py sdist upload

4. Tag the first release of the project on GitHub with the version number from
   the ``setup.py`` file. For example if the version number in ``setup.py`` is
   0.0.1 then do::

       git tag 0.0.1
       git push --tags


----------------------------------------
Releasing a New Version of ckanext-react_usmetadata
----------------------------------------

ckanext-react_usmetadata is availabe on PyPI as https://pypi.python.org/pypi/ckanext-react_usmetadata.
To publish a new version to PyPI follow these steps:

1. Update the version number in the ``setup.py`` file.
   See `PEP 440 <http://legacy.python.org/dev/peps/pep-0440/#public-version-identifiers>`_
   for how to choose version numbers.

2. Create a source distribution of the new version::

     python setup.py sdist

3. Upload the source distribution to PyPI::

     python setup.py sdist upload

4. Tag the new release of the project on GitHub with the version number from
   the ``setup.py`` file. For example if the version number in ``setup.py`` is
   0.0.2 then do::

       git tag 0.0.2
       git push --tags
