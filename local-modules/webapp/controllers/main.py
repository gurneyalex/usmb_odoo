from odoo import http
from odoo.addons.base_rest.controllers.main import RestController
from Flask import send_from_directory

class Academy(http.Controller):

    @http.route('/projet/', auth='public')
    def send_report(path):
        return send_from_directory('reports', "../static/src/")

    @http.route('/test/', auth='public')
    def send_report(path):
        return "TEST"


class WebappBaseController(RestController):
    _root_path = "/webapp/"
    _collection = 'webapp.backend'
    _default_auth = "api_key"


class SaleImportBaseController(RestController):
    _root_path = "/channel-api/"
    _collection_name = "sale.import.rest.services"
    _default_auth = "api_key"
