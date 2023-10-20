const express = require('express');
const port = 4000;
const app = express();
const cors = require('cors');
const router = require('./routes/route');
const bodyParser = require('body-parser');

app.use(cors()); // Apply CORS middleware first.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.listen(port, () => console.log("Server running at port " + port));
