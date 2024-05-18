const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();
app.use(cors());

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL database:', error);
    } else {
        console.log('Connected to MySQL database!');
        
    }
});
  
  
app.post('/authorize', (req, res) => {

    const authCode = req.headers.code;
    const accessToken = req.headers.token;
    const refreshToken = req.headers.refresh_token;

    console.log("Authorizing: " + authCode);

    connection.query(
        'INSERT INTO auth (code, token, refresh_token) VALUES (?, ?, ?)',
        [authCode, accessToken, refreshToken],
        (error, results) => {
            if (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    res.status(409).send('Token already exists');
                } else {
                    console.error('Error inserting token:', error);
                    res.status(500).send('Error inserting token');
                }
            } else {
                res.status(201).send('Token inserted');
            }
        }
    );
    
});

app.get('/display', (req, res) => {
    connection.query(
        'SELECT * FROM auth',
        (error, results) => {
            if (error) {
                console.error('Error fetching token:', error);
                res.status(500).send('Error fetching token');
            } else {
                res.status(200).json(results);
            }
        }
    );

});


app.post('/request', (req, res) => {

    const code = req.headers.buffer;
    connection.query(
        'SELECT DISTINCT token FROM auth WHERE code = ?', [code],
        (error, results) => {
            if (error) {
                console.error('Error fetching token:', error);
                res.status(500).send('Error fetching token');
            } else {
                console.log(results);
                if (results.length == 0) {
                    res.status(200).send({token: -1});
                } else {
                    res.status(200).json(results[0].token=='undefined' ? {token: -1} : results[0]);
                }
            }
        }
    );

});



app.listen(8000, () => {
    console.log('Server is running on port 8000');
});