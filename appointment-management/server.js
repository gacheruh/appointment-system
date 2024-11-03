const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const passport = require('passport');
require('./config/passport')(passport);

const app = express();
app.use(express.json());

// MySQL setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'appointments'
});
db.connect();

// JWT Secret
const JWT_SECRET = 'your_jwt_secret';

// Registration endpoint
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err) => {
        if (err) throw err;
        res.status(201).send('User registered!');
    });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, users) => {
        if (err) throw err;
        if (users.length && await bcrypt.compare(password, users[0].password)) {
            const token = jwt.sign({ id: users[0].id }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

// Protected route (JWT auth)
app.get('/dashboard', (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) return res.status(403).send('Invalid token');
            res.send('Welcome to the dashboard!');
        });
    }
});
