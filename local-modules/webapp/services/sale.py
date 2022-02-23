from odoo.addons.base_rest import restapi
from odoo.addons.component.core import Component
from odoo.tools.translate import _
from werkzeug.exceptions import Forbidden

from odoo.addons.datamodel.core import Datamodel

class SaleInfoService(Component):
    _inherit = 'sale.import.service'

    @restapi.method(
        [(['/search'], 'GET')],
        input_param=restapi.Datamodel("pagination"),
        output_param=restapi.Datamodel("sale.order.list"),
        auth="api_key",
    )
    def search(self, pagination):
        return []
