import { useState } from 'react';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { Status } from '@shared/types';
import { postStatus } from '../api/status_api';
import { TelegramUser } from '../hooks/telegram-hook';

interface Props {
  user: TelegramUser | null;
  onPosted: () => void;
}

export function StatusForm({ user, onPosted }: Props) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!status.trim()) {
      return toast('Please enter a status!', {
        action: { label: <X className="w-4 h-4" />, onClick: () => { } },
        actionButtonStyle: {
          backgroundColor: "white",
          color: "black"
        }
      });
    }

    if (!user) {
      return toast('Please use Telegram web app', {
        action: {
          label: 'Open in Telegram',
          onClick: () => window.location.href = 'https://t.me/micro_status_bot'
        }
      });
    }

    setLoading(true);
    try {
      const newStatus: Status = { userId: user.id, name: user.first_name, status };
      await postStatus(newStatus);
      setStatus('');
      onPosted();
      toast('Status Posted!');
    } catch {
      toast('Failed to post status!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center mb-6 space-x-2">
      <input
        type="text"
        placeholder="What's on your mind?"
        className="flex-grow border border-gray-300 rounded-xl px-4 py-2 text-sm"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') handlePost(); }}
      />
      <button
        onClick={handlePost}
        disabled={loading}
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-800 dark:bg-white text-white dark:text-gray-800 text-2xl"
      >
        {loading ? <span className="spinner"></span> : '+'}
      </button>
    </div>
  );
}
