from odoo.addons.base_rest import restapi
from odoo.addons.component.core import Component
from odoo.tools.translate import _
from werkzeug.exceptions import Forbidden

from odoo.addons.datamodel.core import Datamodel
from odoo.tests.common import Form
from odoo.http import request


class SaleImportService(Component):
    _inherit = "base.rest.service"
    _name = "sale.import.service"
    _usage = "sale"
    _collection = "sale.import.rest.services"
    _description = """
        Sale Import services
    """

    @restapi.method(
        [(['/search'], 'GET')],
        input_param=restapi.Datamodel("pagination"),
        output_param=restapi.Datamodel("sale.order.list"),
        auth="api_key",
    )
    def search(self, pagination):
        key = self._get_api_key()
        api_key = self.env["auth.api.key"]._retrieve_api_key(key)
        customer = api_key.user_id.partner_id
        SaleOrderList = self.env.datamodels['sale.order.list']
        SaleOrder = self.env.datamodels['sale.order']
        sales = []
        for so in self.env['sale.order'].search([('partner_id', '=', customer.id)], limit=pagination.number, offset=pagination.offset, order='id'):
            sales.append(so._to_json())
        return self.env.datamodels['sale.order.list'](sales=sales)


    @restapi.method(
        [(["/", "/create"], "POST")],
        input_param=restapi.Datamodel("sale.order"),
        output_param=restapi.Datamodel("sale.order"),
        auth="api_key",
    )
    # pylint: disable=W8106
    def create(self, sale_import):
        key = self._get_api_key()
        api_key = self.env["auth.api.key"]._retrieve_api_key(key)
        customer = api_key.user_id.partner_id
        with Form(self.env['sale.order']) as f:
            f.partner_id = customer
            if sale_import.name:
                f.name = sale_import.name
            for line in sale_import.lines:
                product = self.env['product.product'].search([('default_code', '=', line.product_code)], limit=1)
                packaging = self.env['product.packaging']
                product_uom_qty = line.qty
                if line.packaging != 'unit':
                    packaging = self.env['product.packaging'].search([('product_id', '=', product.id), ('name', '=', line.packaging)], limit=1)
                    product_uom_qty *= packaging.qty
                with f.order_line.new() as newline:
                    newline.product_id = product
                    newline.product_uom_qty = product_uom_qty
                    newline.product_packaging = packaging

        so = f.save()
        so.action_confirm()
        return so._to_json()

    def _get_openapi_default_parameters(self):
        defaults = super()._get_openapi_default_parameters()
        defaults.append(
            {
                "name": "API-KEY",
                "in": "header",
                "description": "Auth API key",
                "required": True,
                "schema": {"type": "string"},
                "style": "simple",
            }
        )
        return defaults

    def _get_api_key(self):
        headers = request.httprequest.environ
        return headers.get("HTTP_API_KEY")
