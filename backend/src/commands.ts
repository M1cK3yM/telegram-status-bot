import dotenv from 'dotenv';
dotenv.config();

import { Telegraf } from 'telegraf';
import { getLatestStatuses, getLatestStatusForUser } from './store/status_store';

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is missing in .env");
const url = process.env.FRONTEND_URL || "http://localhost:5173";

export const bot = new Telegraf(token);

bot.start((ctx) => {
  ctx.reply('Welcome! Click below to open the Mini App.', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Open Mini App', web_app: { url } }]
      ]
    }
  });
});

bot.command('latest', async (ctx) => {
  let message = 'Here are the latest statuses:\n';
  getLatestStatuses().forEach((status, index) => {
    message += `${index + 1}. ${status.name}: ${status.status}\n`;
  });

  ctx.reply(message);
});


bot.command('mystatus', async (ctx) => {
  const userId = ctx.from?.id.toString();
  if (!userId) {
    return ctx.reply("Couldn't find your user id.");
  }

  try {
    const statuses = getLatestStatusForUser(userId);

    if (!statuses.length) {
      return ctx.reply("You haven't posted any statuses yet.");
    }

    let message = 'Your last 3 statuses:\n';
    statuses.forEach((status: any, index: number) => {
      message += `${index + 1}. ${status.status} (at ${new Date(status.time).toLocaleString()})\n`;
    });

    ctx.reply(message);
  } catch (error) {
    ctx.reply('Error retrieving your statuses.');
  }
});
