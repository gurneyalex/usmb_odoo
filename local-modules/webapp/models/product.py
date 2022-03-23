from odoo import fields, models


class ProductTemplate(models.Model):
    _inherit = "product.template"

    discount = fields.Integer('Discount rate', default=0)
    season_start = fields.Integer('Seasonality start', help='month number from 1 to 12, 0 if all-year product')
    season_end = fields.Integer('Seasonality end', help='month number from 1 to 12, 0 if all-year product')


class ProductCategory(models.Model):
    _inherit = 'product.category'

    intl_name = fields.Char(translate=True)
