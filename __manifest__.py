{
    "name": "Multi Company Dropdown: Select All and Search",
    "version": "1.0.0",
    "category": "Extra Tools",
    "summary": "Search companies in the company switcher and select or deselect them all in one click",
    "description": """
Multi Company Dropdown: Select All and Search
=============================================

Odoo builds a search box and a select-all control into the company switcher, but
keeps both hidden until a user is allowed into more than nine companies. Most
databases never reach that number, so the controls are never seen.

This module:

- Shows the search box at every company count, so a company is one keystroke away.
- Shows the select-all control at every company count.
- Adds explicit Select all and Deselect all buttons.
- Adds All except default, to work in every company but the one you land on.
- Keeps the default company selected when everything is deselected, because Odoo
  needs at least one active company.

No models, no settings, no configuration. Install it and the dropdown is usable.
    """,
    "author": "Steven Marp",
    "website": "https://apps.odoo.com/apps/modules/browse?author=Steven Marp",
    "license": "OPL-1",
    "depends": ["web"],
    "assets": {
        "web.assets_backend": [
            "sm_multicompany_dropdown/static/src/scss/company_dropdown.scss",
            "sm_multicompany_dropdown/static/src/js/company_dropdown.js",
            "sm_multicompany_dropdown/static/src/xml/company_dropdown.xml",
        ],
    },
    "installable": True,
    "application": False,
    "auto_install": False,
    "images": ["static/description/banner.gif", "static/description/icon.png"],
    "price": 5.00,
    "currency": "USD",
}
