from odoo import fields, models


class ProductTemplate(models.Model):
    _inherit = "product.template"

    current_discount = fields.Integer('Discount rate', default=0)
    season_start = fields.Integer('Seasonality start', help='month number from 1 to 12, 0 if all-year product')
    season_end = fields.Integer('Seasonality end', help='month number from 1 to 12, 0 if all-year product')
    country_of_origin_id = fields.Many2one('res.country')


class ProductCategory(models.Model):
    _inherit = 'product.category'

    intl_name = fields.Char(translate=True)
