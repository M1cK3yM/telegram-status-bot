import { useState, useEffect } from 'react';

export type TelegramUser = {
  id: string;
  first_name: string;
};

function parseInitData(initData: string): { user: TelegramUser } | null {
  try {
    const params = new URLSearchParams(initData);
    const userStr = params.get('user');
    if (!userStr) return null;
    const user = JSON.parse(decodeURIComponent(userStr));
    return { user };
  } catch {
    return null;
  }
}

export function useTelegramUser(): TelegramUser | null {
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    const initData =
      (window as any).Telegram?.WebApp?.initData ||
      (window as any).Telegram?.WebApp?.initDataUnsafe;
    if (initData) {
      const data = parseInitData(initData);
      if (data?.user) {
        setUser({ id: String(data.user.id), first_name: data.user.first_name });
      }
    }
  }, []);

  return user;
}
