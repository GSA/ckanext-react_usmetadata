These are the static resources for the built react-usmetadata application.

To update the static resources:

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
