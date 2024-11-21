import { Bot } from "@skyware/bot";
import { getSign } from "./sign";
import { getCommand } from "./commands";
import { Database } from "bun:sqlite";
import { buildPost } from "./post";

const db = new Database("bot.db");

const bot = new Bot();

await bot.login({
  identifier: process.env.BSKY_USERNAME,
  password: process.env.BSKY_PASSWORD,
});

bot.on("mention", async (message) => {
  const command = getCommand(message.text);
  const sign = getSign(db, command);
  const post = await buildPost(sign);
  await message.reply(post);
})