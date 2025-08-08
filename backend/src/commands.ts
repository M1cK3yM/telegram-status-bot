import dotenv from 'dotenv';
dotenv.config();

import { Telegraf } from 'telegraf';
import { getLatestStatuses } from './store/status_store';

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is missing in .env");

export const bot = new Telegraf(token);

bot.start((ctx) => {
  ctx.reply('Welcome! Click below to open the Mini App.');
});

bot.command('latest', async (ctx) => {
  let message = 'Here are the latest statuses:\n';
  getLatestStatuses().forEach((status, index) => {
    message += `${index + 1}. ${status.name}: ${status.status}\n`;
  });

  ctx.reply(message);
});

