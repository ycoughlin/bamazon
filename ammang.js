/Including the required npm packages
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
