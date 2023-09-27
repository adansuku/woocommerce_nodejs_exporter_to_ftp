// dataParser.js
const { stringify } = require("csv-stringify");
const fs = require("fs");

function parsedOrders(data) {
	const parsedOrders = [];

	data.forEach((element) => {
		if (element['status'] !== "cancelled") {
			const order = {
				id: element.id,
				order: element.number,
				status: element['status'],
				created_at: element['date_created_gmt'],
				billing_name: element['billing'].first_name + " " + element['billing'].last_name,
				billing_nif: element.meta_data[0].value,
				billing_address: element['billing'].address_1 + " " + element['billing'].address_2,
				billing_city: element['billing'].city,
				billing_zip: element['billing'].postcode,
				billing_province: element['billing'].state,
				billing_country: element['billing'].country,
				billing_phone: element['billing'].phone,
				shipping_name: element['shipping'].first_name + " " + element['shipping'].last_name,
				shipping_address: element['shipping'].address_1 + " " + element['shipping'].address_2,
				shipping_city: element['shipping'].city,
				shipping_zip: element['shipping'].postcode,
				shippping_province: element['shipping'].state,
				shipping_country: element['shipping'].country,
				shipping_phone: element['shipping'].phone,
				shipping_total: element.shipping_total,
				email: element['billing'].email,
				tax_subtotal: element['tax_lines'].tax_total,
				order_total: element.total,
				payment_method: element.payment_method,
				payment_method_title: element.payment_method_title,
				order_notas: element.customer_note
			};

			parsedOrders.push(order);
		}
	});

	return parsedOrders;
}

function parsedProducts(data) {
	const parsedProducts = [];
	var lineItems = mapData(data);

	lineItems.forEach((element) => {
		const product = {
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
		};

		parsedProducts.push(product);
	});

	return parsedProducts;
}

function mapData(data) {
	var mappedData = [];
	const output = data.map(x => {
		x['line_items'].forEach((e) => {
			e.order_id = x.id;
		});
		mappedData.push(x['line_items']);
	});

	return mappedData.flat();
}

function exportOrders(data, csvName) {
	stringify(data, {
		header: true,
		delimiter: ';'
	}, (err, output) => {
		if (err) throw err;
		console.log(csvName + "_" + dateName() + ".csv");
		fs.writeFile(csvName + "_" + dateName() + ".csv", output, (err) => {
			if (err) throw err;
			console.log(csvName + "_" + dateName() + ' saved.');
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
