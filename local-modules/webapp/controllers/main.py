from odoo import http

class Academy(http.Controller):

    @http.route('/test/', auth='public')
    def index(self, **kw):
        return "Hello, world"