from odoo.addons.base_rest import restapi
from odoo.addons.component.core import Component
from odoo.tools.translate import _
from werkzeug.exceptions import Forbidden

from odoo.addons.datamodel.core import Datamodel

class AuthService(Component):
    _inherit = 'base.webapp.service'
    _name = 'auth.service'
    _usage = 'auth'
    _description = """Manage Webapp Stock"""


    @restapi.method(
        [(['/authenticate'], 'POST')],
        input_param=restapi.Datamodel("authentication"),
        auth="api_key",
    )
    def authenticate(self, pagination):
        return None
