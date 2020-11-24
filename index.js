const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const token = "1201632645:AAE64CoLDRplwR-3azSAz_ykd1OfBLDBgv8";

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `Hi, this bot can give you a random Star Wars character. Click ${/\/randomCharacters/}`
  );
});

bot.onText(/\/randomCharacters/, (msg) => {
  const chatId = msg.chat.id;
  fetchPeople(chatId);
});

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

async function fetchPeople(chatId) {
  const numberPeople = randomInteger(1, 83);
  try {
    const response = await axios.get(
      `https://swapi.dev/api/people/${numberPeople}/`
    );
    bot.sendMessage(chatId, response.data.name);
  } catch (err) {
    console.log(err);
  }
}
