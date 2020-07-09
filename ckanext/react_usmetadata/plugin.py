import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit


class React_UsmetadataPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.IRoutes)

    # IConfigurer
    def update_config(self, config_):
        toolkit.add_template_directory(config_, 'templates')
        toolkit.add_public_directory(config_, 'public')

    # IRoutes
    def before_map(self, map):
        controller = 'ckanext.react_usmetadata.controller:CustomPageController'

        map.connect('/dataset/beta/new',
                    controller=controller,
                    action='retrieve_react_new')
        map.connect('/dataset/beta/edit/{dataset_id}',
                    controller=controller,
                    action='retrieve_react_edit')
        return map

    def after_map(self, map):
        return map
