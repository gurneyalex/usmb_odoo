from odoo.addons.base_rest.controllers.main import RestController


class WebappBaseController(RestController):
    _root_path = "/webapp/"
    _collection = 'webapp.backend'
    _default_auth = "api_key"
