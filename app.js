const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config({ path:'./.env' });

const app = express();
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Parse URL bodies
app.use(express.urlencoded({extended: false}));
// Parse JSON bodies
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MySQL Connected...");
    }
});

//Define Routes
app.use('/', require('./routes/pages'));
app.use(express.static('./images')); 
app.use(express.static('./audios')); 
app.use(express.static('./plugins')); 
app.use(express.static('./js'));
app.use('/auth', require('./routes/auth'));


app.listen(4000, () => {
    console.log("Server Started on Port:4000");
});
