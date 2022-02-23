from odoo.addons.base_rest import restapi
from odoo.addons.component.core import Component
from odoo.tools.translate import _
from werkzeug.exceptions import Forbidden

from odoo.addons.datamodel.core import Datamodel

class StockService(Component):
    _inherit = 'base.webapp.service'
    _name = 'stock.service'
    _usage = 'stock'
    _description = """Manage Webapp Stock"""


    @restapi.method(
        [(['/search'], 'GET')],
        input_param=restapi.Datamodel("pagination"),
        output_param=restapi.Datamodel("product.list"),
        auth="api_key",
    )
    def search(self, pagination):
        products = self.env['product.product'].search(
            [('sale_ok', '=', True)], order="id", offset=pagination.offset, limit=pagination.number
        )
        ProductList = self.env.datamodels['product.list']
        Product = self.env.datamodels['product']
        Packaging = self.env.datamodels['product.packaging.info']
        vals = []
        for product in products:
            packagings = []
            for pack in product.packaging_ids:
                pack_info = Packaging(name=pack.name,
                                      weight=product.weight*pack.qty,
                                      unit_price=product.with_context(quantity=pack.qty).price)
                packagings.append(pack_info)
            if not packagings:
                pack_info = Packaging(name="unit",
                                      weight=product.weight,
                                      unit_price=product.lst_price)
                packagings.append(pack_info)
            prod_info = Product(name=product.name,
                                product_ref=product.default_code,
                                barcode=product.barcode or "",
                                description=product.description or "",
                                packagings=packagings)
            vals.append(prod_info)
        
        return ProductList(products=vals)
