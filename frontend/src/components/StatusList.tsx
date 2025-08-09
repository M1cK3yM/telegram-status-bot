import { Status } from '@shared/types';

interface Props {
  statuses: Status[];
}

export function StatusList({ statuses }: Props) {
  return (
    <ul className="space-y-2 mb-4">
      {statuses.map(({ userId, status, name, time }) => (
        <li key={userId} className="flex items-center justify-between border border-gray-300 rounded-xl px-4 py-3 text-sm">
          <div className="flex flex-col">
            <span>{status}</span>
            <small className="text-gray-500">
              {name || 'Unknown'} • {time ? new Date(time).toLocaleString() : ''}
            </small>
          </div>
        </li>
      ))}
    </ul>
  );
}
