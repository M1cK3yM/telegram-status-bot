import { Status } from '@shared/types';
import { addStatus, getLatestStatuses, getLatestStatusForUser } from '../store/status_store';
import { Request, Response } from 'express';
import { bot } from '../commands';

export async function createStatus(req: Request, res: Response) {
  const { userId, name, status } = req.body as Status;

  if (!status || !status.trim()) {
    return res.status(400).json({ error: "Empty status not allowed" });
  }

  const newStatus = { userId, name, status, time: new Date() };
  addStatus(newStatus);

  try {
    const timeString = newStatus.time.toLocaleString();
    await bot.telegram.sendMessage(userId, `✅ Your status has been posted at ${timeString}:\n\n"${status}"`);
  } catch (error) {
    console.error('Failed to send confirmation message via Telegram:', error);
  }

  res.json({ success: true, message: "Status posted" });
}

export async function latestStatuses(req: Request, res: Response) {
  res.json({ statuses: getLatestStatuses() });
}

export async function getMyStatuses(req: Request, res: Response) {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ error: 'UserId is required' });
  }

  const statuses = getLatestStatusForUser(userId); // last 3 statuses
  res.json({ statuses });
}
