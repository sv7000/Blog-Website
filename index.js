import express from "express";
import dotenv from 'dotenv';
import Router from "./routes/Route.js";
import Connection from "./database/db.js";
import cors from 'cors';
import bodyParser from "body-parser";
// let cors = require('cors')

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', Router);

const PORT = process.env.PORT;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;






app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});

Connection(USERNAME, PASSWORD);