require('dotenv').config();
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;


const WooCommerce = new WooCommerceRestApi({
	url: process.env.WOO_URL,
	consumerKey: process.env.WOO_KEY,
	consumerSecret: process.env.WOO_SECRET,
	version: 'wc/v3'
});

const ftpConfig = {
	host: process.env.FTP_HOST,
	port: 21,
	user: process.env.FTP_USER,
	password: process.env.FTP_PASSWORD,
};

module.exports = { WooCommerce, ftpConfig };
