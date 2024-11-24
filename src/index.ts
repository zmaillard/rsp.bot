import { Bot } from "@skyware/bot";
import { getSign } from "./sign";
import { getCommand } from "./commands";
import { Database } from "bun:sqlite";
import { buildPost } from "./post";
import { Cron } from "croner";

console.log("Starting bot");

const db = new Database("bot.db");

const bot = new Bot();

await bot.login({
  identifier: process.env.BSKY_USERNAME,
  password: process.env.BSKY_PASSWORD,
});

if (process.env.AUTO_POST_CRON_SCHEDULE) {
  console.log("Auto post enabled");
  new Cron(process.env.AUTO_POST_CRON_SCHEDULE, async () => {
    const sign = getSign(db, { type: "random" });
    const post = await buildPost(sign);
    await bot.post(post);
  });
} else {
  console.log("Auto post disabled");
}


bot.on("mention", async (message) => {
  const command = getCommand(message.text);
  const sign = getSign(db, command);
  const post = await buildPost(sign);
  await message.reply(post);
})