//Including the required npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// Creating the connection information for the sql database
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon"
});

// Connecting to the mysql server and sql database
connection.connect(function(err) {
	if (err) throw err;
	console.log("\n==== WELCOME TO BAMAZON CUSTOMER VIEW ====\n\nYou are now connected as id " + connection.threadId + "\n");
	// Run the start function after the connection is made to begin the application
	start();
});

// Function that prompts the user
function start() {
	//Displaying all of the items available for sale.
	console.log("These are all the products available on BAMAZON right now: \n");
	connection.query("SELECT id, product_name, price FROM products", function(error, results) {
		if (error) throw error;

		// Log all results of the SELECT statement
		console.log(JSON.stringify(results, null, " ") + "\n\n=========================================================\n\n");

		// Prompt users with two messages:
		inquirer
			.prompt([
				{
					name: "id",
					type: "input",
					message: "Please enter the ID number of the product you wish to purchase from BAMAZON: "
				},
				{
                    name: "quantity",
                    type: "input"
                    message: "Quantity?"
                }
            ]).then(function (answers) {
                purchase(answers.id, answers.quantity)
            })
    }

function purchase(id, quantity) {
            if (quantity > 0) {
                connection.query(`SELECT stock_quantity,price FROM products WHERE item_id = ${id}`, function (error, result) {
                    if (error) throw error
                    // if there is enough stock
                    if (result[0].stock_quantity >= quantity) {
                        console.log(`Purchase successful`)
                        // subtract quantity from stock_quantity
                        connection.query(`UPDATE products SET stock_quantity = stock_quantity - ${quantity} WHERE item_id = ${id}`)
                        // show how much it cost
                        console.log(`Thank you for your purchase of ${quantity * result[0].price}`)
                    } else {
                        console.log(`We don't have enough of this item to fulfill your order`)
                    }
                    connection.end()
                })
            } else {
                console.error(`Quantity you want is less than 0`)
            }
        }
