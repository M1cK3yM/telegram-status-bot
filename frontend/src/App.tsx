import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { postStatus } from './api/status_api';
import { useTelegramUser } from './hooks/telegram-hook';

export default function App() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false);
  const user = useTelegramUser();

  const handlePost = async () => {
    if (!status.trim()) {
      alert('Please enter a status!');
      return;
    }
    setLoading(true);
    if (!user) {
      setLoading(false);
      alert('use telegram web app');
      return;
    }

    try {
      await postStatus({ userId: user!.id, name: user!.first_name, status });
      setStatus('');
      alert('Status posted!');
    } catch (e) {
      alert('Failed to post status. ' + e);
    } finally {
      setLoading(false);
      return;
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      {user && <h2 className="text-xl mb-4">Hi, {user.first_name}!</h2>}

      <h1 className="text-3xl font-bold mb-4">Micro Status Board</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="What's on your mind today?"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <Button onClick={handlePost}>Post Status</Button>
    </main>
  )
}
