const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const Config = require('./config');

class WooCommerceService {
	constructor() {
		this.wooCommerce = new WooCommerceRestApi(Config.wooConfig);
	}

	async getOrders() {
		const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
		const response = await this.wooCommerce.get("orders", { after: sixHoursAgo.toISOString() });
		return response.data;
	}
}

module.exports = WooCommerceService;
