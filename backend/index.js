require('dotenv').config();
const port = process.env.PORT || 3010;
const cors = require("cors");
const express = require('express');
const router = require('./routes/User');
const vulRoute = require('./vuLS/vulne');
const dbconnection = require('./general/Connection');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/check', (req, res) => {
    res.send("hi, from server");
});

app.use('/users', router);
app.use('/vul', vulRoute);
dbconnection();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
