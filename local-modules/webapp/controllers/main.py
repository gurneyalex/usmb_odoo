from odoo import http
from odoo.addons.base_rest.controllers.main import RestController

DIRECTORY = "../static/src/"

class Academy(http.Controller):

    @http.route('/projet/', auth='public')
    def index(self, **kw):
        super().__init__(*args, directory=DIRECTORY, **kwargs)


class WebappBaseController(RestController):
    _root_path = "/webapp/"
    _collection = 'webapp.backend'
    _default_auth = "api_key"


class SaleImportBaseController(RestController):
    _root_path = "/channel-api/"
    _collection_name = "sale.import.rest.services"
    _default_auth = "api_key"
