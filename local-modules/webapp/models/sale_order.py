from odoo import models


class SaleOrder(models.Model):
    _inherit = "sale.order"


    def _to_json(self):
        so = self.env.datamodels['sale.order'](
            name=self.name,
            amount=self.amount_total,
            date_order=self.date_order.strftime('%Y-%m-%d'),
            lines= [line._to_json() for line in self.order_line]
        )
        return so


class SaleOrderLine(models.Model):
    _inherit = "sale.order.line"

    def _to_json(self):
        qty = self.product_uom_qty
        if self.product_packaging:
            qty /= self.product_packaging.qty
        return self.env.datamodels['sale.order.line'](
            product_code=self.product_id.default_code,
            qty=qty,
            packaging=self.product_packaging.name if self.product_packaging else "unit",
            price_unit=self.price_unit,
            description=self.name
        )
