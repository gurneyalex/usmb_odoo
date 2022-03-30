import logging

from odoo.addons.base_rest import restapi
from odoo.addons.component.core import Component
from odoo.tools.translate import _
from werkzeug.exceptions import Forbidden

from odoo.addons.datamodel.core import Datamodel
_logger = logging.getLogger(__name__)


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
            [('sale_ok', '=', True), ('default_code', '!=', False)], order="id", offset=pagination.offset, limit=pagination.number
        )
        ProductList = self.env.datamodels['product.list']
        Product = self.env.datamodels['product']
        Packaging = self.env.datamodels['product.packaging.info']
        Translation = self.env.datamodels['translation']
        vals = []
        for product in products:
            _logger.info('checking product %s (default_code: %s)', product.display_name, product.default_code)
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
            name_translations = {}
            description_translations = {}
            for lang in ['fr_FR', 'de_DE', 'it_IT']:
                loc_product = product.with_context(lang=lang)
                name_translations[lang[:2]] = loc_product.name or ""
                description_translations[lang[:2]] = loc_product.description or ""

            name_translations = Translation(**name_translations)
            description_translations = Translation(**description_translations)
            prod_info = Product(name=product.name,
                                product_ref=product.default_code or "",
                                barcode=product.barcode or "",
                                description=product.description or "",
                                packagings=packagings,
                                name_translations=name_translations,
                                description_translations=description_translations,
                                origin=product.country_of_origin_id.name or '',
                                category = product.categ_id.display_name,
                                discount = product.current_discount,
                                season_start = product.season_start,
                                season_end = product.season_end,
            )
            vals.append(prod_info)

        return ProductList(products=vals)

    @restapi.method(
        [(['/categories'], 'GET')],
        output_param=restapi.Datamodel("product.category.list"),
        auth="api_key",
    )
    def get_categories(self):
        Category = self.env.datamodels['product.category']
        CategoryList = self.env.datamodels['product.category.list']
        Translation = self.env.datamodels['translation']

        res = []
        categories = self.env['product.category'].search([])
        for cat in categories.filtered('product_count'):
            name_translations = {}
            for lang in ['fr_FR', 'de_DE', 'it_IT']:
                loc_cat = cat.with_context(lang=lang)
                name_translations[lang[:2]] = loc_cat.intl_name or loc_cat.name
            res.append(
                Category(
                    name=cat.intl_name or cat.name,
                    parent_path=cat.parent_id.display_name or '',
                    name_translations=Translation(**name_translations)
                )
            )
        print (res)
        return CategoryList(categories=res)
