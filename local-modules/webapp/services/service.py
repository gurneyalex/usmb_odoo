from odoo.addons.component.core import AbstractComponent


class BaseWebappService(AbstractComponent):
    _inherit = 'base.rest.service'
    _name = 'base.webapp.service'
    _collection = "sale.import.rest.services"
    _expose_model = None

    def _get_openapi_default_parameters(self):
        defaults = super()._get_openapi_default_parameters()
        defaults.extend(
            [
                {
                    "name": "API-KEY",
                    "in": "header",
                    "description": "Auth API key "
                    "(Only used when authenticated by API key)",
                    "required": False,
                    "schema": {"type": "string"},
                    "style": "simple",
                }
            ]
        )
        return defaults

    def _get_api_key(self):
        headers = request.httprequest.environ
        return headers.get("HTTP_API_KEY")
