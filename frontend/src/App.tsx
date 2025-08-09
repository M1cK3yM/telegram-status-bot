import React, { useEffect, useState } from 'react'
import { fetchLatestStatuses, postStatus } from './api/status_api';
import { useTelegramUser } from './hooks/telegram-hook';

export default function App() {
  const [status, setStatus] = useState('');
  const [statuses, setStatuses] = useState<{ id: string; text: string; name?: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useTelegramUser();

  useEffect(() => {
    if (!user) return;

    async function loadStatuses() {
      try {
        const allStatuses = await fetchLatestStatuses();

        if (!Array.isArray(allStatuses)) {
          return;
        }

        const userStatuses = allStatuses
          .map(s => ({ id: s.userId, text: s.status, name: s.name }));
        setStatuses(userStatuses);
      } catch (e) {
        alert('Failed to load statuses: ' + e);
      }
    }

    loadStatuses();
  }, [user]);

  const handlePost = async () => {
    if (!status.trim()) {
      alert('Please enter a status!');
      return;
    }
    setLoading(true);
    if (!user) {
      setLoading(false);
      alert('Use Telegram Web App');
      return;
    }

    try {
      await postStatus({ userId: user!.id, name: user!.first_name, status });
      setStatuses([...statuses, { id: user!.id, text: status, name: user.first_name }]);
      setStatus('');
      alert('Status posted!');
    } catch (e) {
      alert('Failed to post status. ' + e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {user ? (
        <h1 className="text-xl font-bold mb-4">Hi, {user.first_name}! 👋</h1>
      ) : (
        <h1 className="text-xl font-bold mb-4">Your Status</h1>
      )}

      <div className="flex items-center mb-6 space-x-2">
        <input
          type="text"
          placeholder="What's on your mind?"
          className="flex-grow border border-gray-300 rounded-xl px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handlePost(); }}
        />
        <button
          onClick={handlePost}
          disabled={loading}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-800 text-white hover:bg-gray-900 transition-colors text-3xl"
          aria-label="Post status"
          title="Post status"
        >
          {loading ? <span className="spinner"></span> : '+'}
        </button>
      </div>

      <ul className="space-y-2 mb-4">
        {statuses.map(({ id, text, name }) => (
          <li
            key={id}
            className="flex items-center justify-between border border-gray-300 rounded-xl px-4 py-3 text-sm"
          >
            <div className="flex flex-col">
              <span>{text}</span>
              <small className="text-gray-500"> {name || 'Unknown'}</small>
            </div>

          </li>
        ))}
      </ul>
    </main>
  );
}
