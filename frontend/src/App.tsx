import { useEffect, useState } from 'react';
import { fetchLatestStatuses } from './api/status_api';
import { useTelegramUser } from './hooks/telegram-hook';
import { useDarkMode } from './hooks/useDarkMode';
import { DarkModeToggle } from './components/DarkModeToggle';
import { StatusForm } from './components/StatusForm';
import { StatusList } from './components/StatusList';
import { Status } from '@shared/types';
import { toast, Toaster } from 'sonner';
import { X } from 'lucide-react';

export default function App() {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [updateList, setUpdateList] = useState(true);
  const user = useTelegramUser();
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    if (!user) return;

    async function loadStatuses() {
      try {
        const allStatuses = await fetchLatestStatuses();
        if (Array.isArray(allStatuses)) setStatuses(allStatuses);
      } catch {
        toast('Failed to load statuses!', {
          action: { label: <X className="w-4 h-4" />, onClick: () => { } }
        });
      }
    }

    loadStatuses();
  }, [user, updateList]);

  return (
    <main className="min-h-screen max-w-xl mx-auto p-6 dark:bg-black bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">{user ? `Hi, ${user.first_name}! 👋` : 'Your Status'}</h1>
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      <StatusForm user={user} onPosted={() => setUpdateList(!updateList)} />
      <StatusList statuses={statuses} />
      <Toaster />
    </main>
  );
}
