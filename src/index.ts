import { Bot } from "@skyware/bot";
import { getSign } from "./sign";
import { getCommand } from "./commands";
import { Database } from "bun:sqlite";

const db = new Database("bot.db");

const bot = new Bot();

await bot.login({
  identifier: process.env.BSKY_USERNAME,
  password: process.env.BSKY_PASSWORD,
});

bot.on("mention", async (message) => {
  console.log(message.text);

   //await message.reply("Hello!");
})