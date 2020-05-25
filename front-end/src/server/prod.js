import express from 'express';
import cors from 'cors';
const app = express();

const port = process.env.PORT;

app.use(express.static(__dirname));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get('/*', (req, res) => res.sendFile(__dirname + '/index.html'));

app.listen(port);
