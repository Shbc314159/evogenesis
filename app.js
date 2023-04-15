const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
const port = 4000;


const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'evogenes_shbc',
  password: 'mitsMysq27',
  database: 'evogenes_Users'
});


app.use(bodyParser.json());

app.use(cors())


app.post('/newapp/api/login', function(req, res) {
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



app.post('/newapp/api/register', function(req, res) {
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


app.post('/newapp/api/save', function(req, res) {
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

app.post('/newapp/api/addmsg', function(req) {
    const message = req.body.message;
    const email = req.body.email;
    const query = `INSERT INTO messages (username, message) VALUES (?, ?)`

    connection.query(query, [email, message], function(error) {
        if (error) {
            console.log(error);
        }
    });
});

app.post('/newapp/api/getmsgs', function(req, res) {
    const query =  `SELECT * FROM messages`

    connection.query(query, function(error, result) {
        if (error) {
            console.log(error);
        } else {
            res.status(200).json({ data: result });
            return;
        }
    })
})


const server = http.createServer(app);

server.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});