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
					//Asking for ID of the product they would like to buy.
					name: "idChosen",
					type: "input",
					message: "Please enter the ID number of the product you wish to purchase from BAMAZON: "
				},
				
