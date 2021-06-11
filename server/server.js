const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");
const { botToken, idChatWithBot } = require("./api/bot/bot.js");
const start = require("./mongo.js");
const requests = require('./requests.js');

const sendMessage = (msg) => bot.sendMessage(idChatWithBot, msg);

const bot = new TelegramBot(botToken);

const app = express(express.logger());

app.use(cors());

const parser = bodyParser.json({ limit: 1024 * 1024 * 10, type: 'application/json' });
const urlEncoded = bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 10, type: 'application/x-www-form-urlencoded' });

app.use(parser);
app.use(urlEncoded);

app.configure(() => {
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.listen(8000);

app.post("/api/bot/send-message", parser, (req, res) => {
  sendMessage(
    `NEW MESSAGE FROM SITE!
     Name: ${req.body.name}
     Way to connect: ${req.body.connect}
     Message:
     ${req.body.message}
    `
  );
});

start();
requests(app, parser);
