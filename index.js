//Calling express framework with MySQL...........

const express = require("express");
const mysql = require("mysql");

// Create connection with MySQL..........

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"prisha12345",
    database: "nodeMySql",
});

// Connect to MySQL.......

db.connect((err)=> {
    if(err){
        throw err;
    }
    console.log("MySQL connected successfully....!");
});

const app = express();

// Create Database........

app.get("/createDb", (req,res) => {
    let sql = "create database nodeMySql";
    db.query(sql,(err) => {
        if(err){
            throw err;
        }
        res.send("Database created....!");
    });
});

// Creating table inside the Database.......

app.get("/createEmployee", (req,res) => {
    let sql = "create table Employee(id int (50), name varchar(250), designation varchar(250), primary key(id))";
    db.query(sql,(err) => {
        if(err){
            throw err;
        }
        res.send("Employee table created...!");
    });
});

// Inserting data into table.........

app.get("/employee3",(req,res) => {
    let post = {id: 3, name:"Jack smith", designation: "cenior executive officer"}
    let sql = "INSERT INTO employee SET ?"
    let query = db.query(sql, post, err => {
        if(err){
            throw err;
        }
        res.send("employee added ......!");
    });
});

// Selecting all data from table..........

app.get("/getemployee", (req,res) => {
    let sql = "select * from employee";
    let query = db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        res.send("Employee details fetched.....!");
        console.log(result);
    });
});

// Update data in table...........

app.get("/updateemployee/:id", (req,res) => {
    let newName = "Dheeraj Parab";
    let sql = `UPDATE employee SET name = '${newName}' WHERE id = '${req.params.id}'`;
    let query = db.query(sql, err => {
        if(err){
            throw err;
        }
        res.send("Employee updated...!");
    });
});

// Deleta Data from table......

app.get("/deleteemployee/:id", (req,res) => {
    let sql = `DELETE FROM employee WHERE id = ${req.params.id}`;
    let query = db.query(sql,err => {
        if(err){
            throw err;
        }
        res.send("employee deleted.....!");
    });
});

// Listening port .............

app.listen(3000, (req,res) => {
    console.log("Server started on port 3000");
});