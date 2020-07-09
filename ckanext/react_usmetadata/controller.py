from ckan.lib import base
from ckan.controllers.package import PackageController as CorePackageController
from ckan import model
from ckan.plugins import toolkit
from ckan.logic import NotFound


class CustomPageController(CorePackageController):
    def get_context(self):
        return {'model': model, 'session': model.Session,
                'user': toolkit.c.user,
                'auth_user_obj': toolkit.c.userobj}

    def check_dataset_access(self):
        try:
            context = self.get_context()
            toolkit.check_access('package_create', context)
        except toolkit.NotAuthorized:
            toolkit.abort(401,
                          toolkit._('Unauthorized to request this page.'))

    def retrieve_react_new(self):
        self.check_dataset_access()
        return base.render('package/beta_new.html')

    def retrieve_react_edit(self, dataset_id):
        self.check_dataset_access()

        try:
            context = self.get_context()
            toolkit.get_action(
                'package_show')(context, {'name_or_id': dataset_id})
            extra_vars = {'dataset_id': dataset_id}
            return base.render('package/beta_edit.html',
                               extra_vars=extra_vars)
        except NotFound:
            toolkit.abort(404, toolkit._('Dataset not found.'))
