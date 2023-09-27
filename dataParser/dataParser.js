// dataParser.js
const { stringify } = require("csv-stringify");
const fs = require("fs");

function parsedOrders(data) {
	const parsedOrders = [];

	data.forEach((element) => {
		if (element['status'] !== "cancelled") {
			const {
				id,
				number: order,
				status,
				date_created_gmt: created_at,
				billing,
				shipping,
				shipping_total,
				billing: { email },
				tax_lines,
				total,
				payment_method,
				payment_method_title,
				customer_note
			} = element;

			const orderObj = {
				id,
				order,
				status,
				created_at,
				billing_name: `${billing.first_name} ${billing.last_name}`,
				billing_nif: element.meta_data[0].value,
				billing_address: `${billing.address_1} ${billing.address_2}`,
				billing_city: billing.city,
				billing_zip: billing.postcode,
				billing_province: billing.state,
				billing_country: billing.country,
				billing_phone: billing.phone,
				shipping_name: `${shipping.first_name} ${shipping.last_name}`,
				shipping_address: `${shipping.address_1} ${shipping.address_2}`,
				shipping_city: shipping.city,
				shipping_zip: shipping.postcode,
				shippping_province: shipping.state,
				shipping_country: shipping.country,
				shipping_phone: shipping.phone,
				shipping_total,
				email,
				tax_subtotal: tax_lines.tax_total,
				order_total: total,
				payment_method,
				payment_method_title,
				order_notas: customer_note
			};

			parsedOrders.push(orderObj);
		}
	});

	return parsedOrders;
}

function parsedProducts(data) {
	const lineItems = mapData(data);
	return lineItems.map(element => ({
		id: element.id,
		sku: element.sku,
		order: element.order_id,
		name: element.name,
		product_id: element.product_id,
		variation_id: element.variation_id,
		quantity: element.quantity,
		sale_price: element.sale_price,
		price: element.price,
		total: element.total,
		total_tax: element.total_tax
	}));
}

function mapData(data) {
	return data.map(x => {
		const lineItems = x['line_items'].map(e => ({ ...e, order_id: x.id }));
		return lineItems;
	}).flat();
}

function exportOrders(data, csvName) {
	stringify(data, {
		header: true,
		delimiter: ';'
	}, (err, output) => {
		if (err) {
			console.error(`Error in stringify: ${err}`);
			return;
		}

		const fileName = `${csvName}_${dateName()}.csv`;
		fs.writeFile(fileName, output, (writeErr) => {
			if (writeErr) {
				console.error(`Error writing file: ${writeErr}`);
				return;
			}
			console.log(`${fileName} saved.`);
		});
	});
}

function dateName() {
	let dateOb = new Date();

	// current date
	let date = ("0" + dateOb.getDate()).slice(-2);

	// current month
	let month = ("0" + (dateOb.getMonth() + 1)).slice(-2);

	// current year
	let year = dateOb.getFullYear();

	// current hours
	let hours = dateOb.getHours();
	let result = year + month + date + hours;

	return result;
}

module.exports = { parsedOrders, parsedProducts, exportOrders, dateName, mapData };
