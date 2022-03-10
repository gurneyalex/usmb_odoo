from odoo.addons.base_rest import restapi
from odoo.addons.component.core import Component
from odoo.tools.translate import _
from werkzeug.exceptions import Forbidden
from odoo.http import request

from odoo.addons.datamodel.core import Datamodel

class AuthService(Component):
    _inherit = 'base.webapp.service'
    _name = 'auth.service'
    _usage = 'auth'
    _description = """Manage Webapp Authentication"""


    @restapi.method(
        [(['/authenticate'], 'POST')],
        input_param=restapi.Datamodel("authentication"),
        output_param=restapi.Datamodel("userinfo"),
        auth="api_key",
    )
    def authenticate(self, auth):
        uid = request.session.authenticate(request.session.db, auth.login, auth.password)
        user = self.env['res.users'].browse(uid)
        #user._check_credentials(auth.password)
        UserInfo = self.env.datamodels['userinfo']
        return UserInfo(login=user.login, name=user.name)
