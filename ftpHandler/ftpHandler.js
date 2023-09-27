// ftpHandler.js
const ftp = require('ftp');
const { ftpConfig } = require('../config/config');
const { dateName } = require('../dataParser/dataParser');
const fs = require("fs");


function sendToFTP(fileName) {
	const client = new ftp();

	client.connect(ftpConfig);

	client.on('ready', () => {
		console.log('Connection established successfully');

		const csvFilePath = `${fileName}_${dateName()}.csv`;

		client.put(csvFilePath, `/PEDIDOS/${csvFilePath}`, (err) => {
			if (err) {
				console.error(`Error sending the file to the FTP server: ${err}`);
			} else {
				console.log('File sent to the FTP server successfully');

				// Delete the file after uploading
				fs.unlink(csvFilePath, (err) => {
					if (err) {
						console.error(`Error deleting the file: ${err}`);
					} else {
						console.log('File deleted successfully');
					}
				});
			}

			client.end();
		});
	});

	client.on('error', err => {
		console.log(`Connection error: ${err}`);
	});
}

module.exports = { sendToFTP };
