// main.js
require('dotenv').config();
const { WooCommerce } = require('./config/config');
const { parsedOrders, parsedProducts, exportOrders, mapData } = require('./dataParser/dataParser');
const { sendToFTP } = require('./ftpHandler/ftpHandler');

//Data Store
let data = [];

//We subtract 6 hours (in milliseconds) from the current date and time.
const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);

WooCommerce.get("orders", { after: sixHoursAgo.toISOString() })
	.then((response) => {
		data = response.data;
	})
	.then(() => {
		const products = parsedProducts(data);
		exportOrders(products, "products");

		const pOrders = parsedOrders(data);
		exportOrders(pOrders, "orders");

		sendToFTP("products");
		sendToFTP("orders");
	})
	.catch((error) => {
		console.log(error);
	});
