const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

const app = express();
const port = 4000;

// Create connection to MySQL database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'evogenes_shbc',
  password: 'mitsMysq27',
  database: 'evogenes_Users'
});

// Use bodyParser middleware to parse JSON data
app.use(bodyParser.json());

app.use(cors())


app.post('/example/api/login', function(req, res) {
    const email = req.body.email;
    const query = 'SELECT todo_list FROM users WHERE username=?';
    
    connection.query(query, [email], function(error, result) {
        console.log(result);
        if (error) {
            console.error('Error logging in: ', error)
            console.log(error);
            return res.status(500).json({ error: error.message});
        } else {
            const todo_list = result[0].todo_list;
            res.status(200).json({ todo_list: todo_list });
            return;
        }
    });
});


// Register new user and save todo list to database
app.post('/example/api/register', function(req, res) {
    const email = req.body.email;
    const todoList = JSON.stringify(req.body.todoList);
    const query = `INSERT INTO users (username, todo_list) VALUES (?, ?)`;
    
    connection.query(query, [email, todoList], function(error) {
        if (error) {
            console.error('Error registering user:', error);
            console.log(error);
            return res.status(500).json({ error: error.message });
        } else {
            res.sendStatus(200);
        }
    });
});


app.post('/example/api/save', function(req, res) {
    const email = req.body.email;
    const todoList = JSON.stringify(req.body.todoList);
    const query = `UPDATE users SET todo_list = ? WHERE username = ?`;

    connection.query(query, [todoList, email], function(error) {
        if (error) {
            console.error('Error registering user:', error);
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
        } 
    });
});

const server = http.createServer(app);
// Start server
server.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});