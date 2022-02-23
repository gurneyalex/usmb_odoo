from datetime import datetime

from odoo.addons.datamodel import fields
from odoo.addons.datamodel.core import Datamodel

class ProductPackagingInfo(Datamodel):
    _name = 'product.packaging.info'
    name = fields.String(required=True, allow_none=False)
    weight = fields.Float(required=True)
    unit_price = fields.Float(required=True)


class Product(Datamodel):
    _name = 'product'
    name = fields.String(required=True)
    product_ref = fields.String(required=True)
    barcode = fields.String()
    description = fields.String(required=True)
    packagings = fields.List(fields.NestedModel('product.packaging.info'))


class Pagination(Datamodel):
    _name = 'pagination'
    offset = fields.Integer(default=0, required=True)
    number = fields.Integer(default=80, required=True)


class Authentication(Datamodel):
    _name = 'authentication'
    login = fields.String(required=True)
    password = fields.String(required=True)


class ProductList(Datamodel):
    _name = "product.list"
    products = fields.List(fields.NestedModel('product'))

class SaleList(Datamodel):
    _name = "sale.order.list"
    sales = fields.NestedModel('sale.order', many=True)

