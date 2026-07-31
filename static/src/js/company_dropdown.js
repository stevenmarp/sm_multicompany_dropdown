/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { session } from "@web/session";
import { SwitchCompanyMenu } from "@web/webclient/switch_company_menu/switch_company_menu";
import { user } from "@web/core/user";

patch(SwitchCompanyMenu.prototype, {
    /**
     * Odoo only reveals the search box and the select-all control once a user has
     * more than nine companies; below that they are rendered but hidden. Most
     * databases sit under that line, so the controls are simply never seen.
     */
    resetState() {
        super.resetState(...arguments);
        this.state.searchFilter = "";
        this.state.showFilter = true;
    },

    /** The company a user lands on at login, kept when everything else is dropped. */
    get defaultCompanyId() {
        const fromSession = session.user_companies?.current_company;
        if (this.companyService) {
            if (fromSession && this.companyService.allowedCompanies[fromSession]) {
                return fromSession;
            }
            return this.companyService.currentCompany?.id;
        } else {
            // Odoo 19
            if (fromSession && user.allowedCompanies.some(c => c.id === fromSession)) {
                return fromSession;
            }
            return user.activeCompany?.id;
        }
    },

    get defaultCompanyName() {
        if (this.companyService) {
            const company = this.companyService.getCompany(this.defaultCompanyId);
            return company ? company.name : "";
        } else {
            // Odoo 19
            const company = user.allowedCompanies.find(c => c.id === this.defaultCompanyId);
            return company ? company.name : "";
        }
    },

    get allCompanyIds() {
        if (this.companyService) {
            return Object.values(this.companyService.allowedCompanies).map((company) => company.id);
        } else {
            // Odoo 19
            return user.allowedCompanies.map((company) => company.id);
        }
    },

    get hasMultipleCompanies() {
        return this.allCompanyIds.length > 1;
    },

    _replaceSelection(ids) {
        const selected = this.companySelector.selectedCompaniesIds;
        selected.splice(0, selected.length, ...ids);
    },

    selectAllCompanies() {
        this._replaceSelection(this.allCompanyIds);
    },

    /**
     * Leaving nothing selected would send the server an empty company list, so
     * clearing keeps the default company, which is what a user means by "none".
     */
    deselectAllCompanies() {
        const fallback = this.defaultCompanyId;
        this._replaceSelection(fallback ? [fallback] : this.allCompanyIds.slice(0, 1));
    },

    selectAllExceptDefault() {
        const others = this.allCompanyIds.filter((id) => id !== this.defaultCompanyId);
        this._replaceSelection(others.length ? others : this.allCompanyIds);
    },

    get allCompaniesSelected() {
        const selected = this.companySelector.selectedCompaniesIds;
        return this.allCompanyIds.every((id) => selected.includes(id));
    },
});
