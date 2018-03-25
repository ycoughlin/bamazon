// /Including the required npm packages
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
connection.connect(function (err) {
    if (err) throw err;
    console.log("\n==== WELCOME TO BAMAZON MANAGER VIEW ====\n\nYou are now connected as id " + connection.threadId + "\n");
    // Run the start function after the connection is made to begin the application
    manager();
});
showMenu()

function showMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: `Manager View`,
            choices: ['View Products on Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Quit']
        }
    ]).then(function (answers) {
        if (answers.choice === 'View Products on Sale') {
            viewProducts()
        }
        if (answers.choice === 'View Low Inventory') {
            viewLowInventory()
        }
        if (answers.choice === 'Add to Inventory') {
            addToInventory()
        }
        if (answers.choice === 'Add New Product') {
            addNewProduct()
        }
        if (answers.choice === 'Quit') {
            connection.end()
        }
    })
}

function viewProducts() {
    connection.query(`SELECT * FROM products`, function (error, result) {
        if (error) throw error
        for (var i = 0; i < result.length; i++) {
            console.log(`${result[i].item_id} | ${result[i].product_name} | $${result[i].price} | ${result[i].stock_quantity} available`)
        }
        showMenu()
    })
};