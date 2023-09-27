require('dotenv').config();
const { WooCommerce } = require('./config/config');
const { parsedOrders, parsedProducts, exportOrders, mapData } = require('./dataParser/dataParser');
const { sendToFTP } = require('./ftpHandler/ftpHandler');

async function fetchData() {
	try {
		const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
		const response = await WooCommerce.get("orders", { after: sixHoursAgo.toISOString() });
		const data = response.data;

		const products = parsedProducts(data);
		await exportOrders(products, "products");

		const pOrders = parsedOrders(data);
		await exportOrders(pOrders, "orders");

		sendToFTP("products");
		sendToFTP("orders");
	} catch (error) {
		console.error(error);
	}
}

fetchData();
