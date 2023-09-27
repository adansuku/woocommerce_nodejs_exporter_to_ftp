// config.js
require('dotenv').config();

class Config {
	static get wooConfig() {
		return {
			url: process.env.WOO_URL,
			consumerKey: process.env.WOO_KEY,
			consumerSecret: process.env.WOO_SECRET,
			version: 'wc/v3'
		};
	}

	static get ftpConfig() {
		return {
			host: process.env.FTP_HOST,
			port: 21,
			user: process.env.FTP_USER,
			password: process.env.FTP_PASSWORD
		};
	}
}

module.exports = Config;
