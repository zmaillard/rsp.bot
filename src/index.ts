import { Bot, EventStrategy } from "@skyware/bot";
import { getSign } from "./random";
import { getCommand } from "./commands";


console.log(getSign(getCommand("")));

const bot = new Bot({
  //eventEmitterOptions: {
  //  strategy:  EventStrategy.Jetstream,
  //}
});
await bot.login({
  identifier: process.env.BSKY_USERNAME,
  password: process.env.BSKY_PASSWORD,
});

bot.on("mention", async (message) => {
  console.log(message.text);

   //await message.reply("Hello!");
})