const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT;

app.use(express.static(__dirname + '/public'));
app.use(cors());

app.get('/*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

app.listen(port);