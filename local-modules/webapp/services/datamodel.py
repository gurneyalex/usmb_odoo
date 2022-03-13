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


class UserInfo(Datamodel):
    _name = "userinfo"
    name = fields.String()
    login = fields.String()


class ProductList(Datamodel):
    _name = "product.list"
    products = fields.List(fields.NestedModel('product'))

class SaleList(Datamodel):
    _name = "sale.order.list"
    sales = fields.List(fields.NestedModel('sale.order'))



class SaleOrderAddressDatamodel(Datamodel):
    _name = "sale.order.address"

    name = fields.Str(required=True)
    street = fields.Str(required=True)
    street2 = fields.Str(allow_none=True)
    zip = fields.Integer(required=True)
    city = fields.Str(required=True)
    email = fields.Email()
    state_code = fields.Str()
    country_code = fields.Str(required=True)
    phone = fields.Str()
    mobile = fields.Str()


class SaleOrderCustomerDatamodel(Datamodel):
    _inherit = "sale.order.address"
    _name = "sale.order.customer"

    email = fields.Str(required=True)


class SaleOrderDatamodel(Datamodel):
    _name = "sale.order"

    name = fields.Str()
    #address_customer = fields.NestedModel("sale.order.customer", required=True)
    lines = fields.List(fields.NestedModel("sale.order.line"),required=True)
    amount = fields.Decimal()
    date_order = fields.Date(required=True)


class SaleOrderLineDatamodel(Datamodel):
    _name = "sale.order.line"

    product_code = fields.Str(required=True)
    qty = fields.Decimal(required=True)
    packaging = fields.Str(required=True)
    price_unit = fields.Decimal(required=True)
    description = fields.Str()
