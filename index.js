import express from "express";
import { dbConnection } from "./database/db.js";
import bodyParser from "body-parser";
import { apiRequestLimiter } from "./middleware/apiRateLimiter.js";
import { CONFIG } from "./config/config.js";
import { Trie } from "./utils/Trie.js";
// dbConnection();
const app = express();
const PORT = CONFIG.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(apiRequestLimiter);

app.set('view engine', 'ejs');

// Set the views directory
app.set('views', './views');

app.get('/index', (req, res) => {
  res.render('index', { title: 'My App' });
});

app.get("/", (req, res) => {
  let trie = new Trie();

  trie.insert("Sunil");
  trie.insert("Sunny");
  trie.insert("Suni");

  console.log(trie.find("Su")); // [ 'Suni', 'Sunil', 'Sunny' ]
  console.log(trie.find("Suni")); // [ 'Suni', 'Sunil' ]

  res.send(trie);
});

app.listen(PORT, () => {
  console.log(`server run at ${PORT}`);
});
