import express from 'express';
import parser from 'body-parser';
import path from 'path';
import apis from './apis.js';

const app = express();
const router = express.Router();

app.use(router);
app.use(parser.json());

router.get('/', function (req, res) {
  res.send('hello world');
});

router.get('/character/:name', apis.fetchCharacter);
router.get('/characters', apis.fetchSortedCharacters);

app.listen(8080, function () {
  console.log('Back-end API app is listening on port 8080')
});

module.exports = app;
