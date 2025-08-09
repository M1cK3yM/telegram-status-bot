import { useEffect, useState } from 'react';
import { fetchLatestStatuses, postStatus } from './api/status_api';
import { useTelegramUser } from './hooks/telegram-hook';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, X } from 'lucide-react';
import { Status } from '@shared/types';
import { toast, Toaster } from 'sonner';

export default function App() {
  const [status, setStatus] = useState('');
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useTelegramUser();
  const [updateList, setUpdateList] = useState(true);

  const toggleSwitch = () => {
    setDarkMode(!darkMode);
  }

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    if (!user) return;

    async function loadStatuses() {
      try {
        const allStatuses = await fetchLatestStatuses();

        if (!Array.isArray(allStatuses)) {
          return;
        }

        setStatuses(allStatuses);
      } catch (e) {
        toast("Failed to load statuses!", {
          action: {
            label: <X className="w-4 h-4" />,
            onClick: () => console.log("clicked")
          },
          actionButtonStyle: {
            backgroundColor: "white",
            color: "black",
          }
        });
      }
    }

    loadStatuses();
  }, [user, updateList]);

  const handlePost = async () => {
    if (!status.trim()) {
      toast("Please enter a status!", {
        action: {
          label: <X className="w-4 h-4" />,
          onClick: () => console.log("clicked")
        },
        actionButtonStyle: {
          backgroundColor: "white",
          color: "black",
        }
      });
      return;
    }
    setLoading(true);
    if (!user) {
      setLoading(false);
      toast("Please use Telegram wep app", {
        action: {
          label: "Open in Telegram",
          onClick: () => window.location.href = "https://t.me/micro_status_bot"
        },
        actionButtonStyle: {
          backgroundColor: "black",
          color: "white",
        }
      });
      return;
    }

    try {
      const newStatus: Status = { userId: user!.id, name: user!.first_name, status };
      await postStatus(newStatus);
      setUpdateList(!updateList);
      setStatus('');
      toast("Status Posted!", {
        action: {
          label: <X className="w-4 h-4" />,
          onClick: () => console.log("clicked")
        },
        actionButtonStyle: {
          backgroundColor: "white",
          color: "black",
        }
      });
    } catch {
      toast("Failed to post status!", {
        action: {
          label: <X className="w-4 h-4" />,
          onClick: () => console.log("clicked")
        },
        actionButtonStyle: {
          backgroundColor: "white",
          color: "black",
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen max-w-xl mx-auto p-6 dark:bg-black bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        {user ? (
          <h1 className="text-xl font-bold">Hi, {user.first_name}! 👋</h1>
        ) : (
          <h1 className="text-xl font-bold">Your Status</h1>
        )}
        <button
          className="w-18 h-9 flex rounded-full items-center bg-gray-300 dark:bg-gray-700 p-1"
          style={{
            justifyContent: "flex-" + (darkMode ? "end" : "start"),
          }}
          onClick={toggleSwitch}
        >
          <motion.div
            className="flex items-center justify-center h-8 w-8 bg-gray-800 dark:bg-white rounded-full"
            layout
            transition={{
              type: "spring",
              visualDuration: 0.2,
              bounce: 0.4,
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {darkMode ? (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={17} className="text-black" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={17} className="text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </button>
      </div>

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
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-800 dark:bg-white text-white dark:text-gray-800 dark:hover:bg-gray-400 dark:hover:text-gray-100 hover:bg-gray-900 transition-colors text-3xl"
          aria-label="Post status"
          title="Post status"
        >
          {loading ? <span className="spinner"></span> : '+'}
        </button>
      </div>

      <ul className="space-y-2 mb-4">
        {statuses.map(({ userId, status, name, time }) => (
          <li
            key={userId}
            className="flex items-center justify-between border border-gray-300 rounded-xl px-4 py-3 text-sm"
          >
            <div className="flex flex-col">
              <span>{status}</span>
              <small className="text-gray-500">
                {name || 'Unknown'} • {time ? new Date(time).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }) : ''}
              </small>
            </div>
          </li>
        ))}
      </ul>
      <Toaster />
    </main>
  );
}
