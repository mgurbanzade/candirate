import { CalendarIcon, MapPinIcon, UsersIcon } from '@heroicons/react/20/solid';

const positions = [
  {
    id: 1,
    uuid: '123123',
    title: 'What is OOP?',
    body: 'Tell me about OOP',
    points: 7,
  },
  {
    id: 2,
    uuid: '123123',
    title: 'What is React?',
    body: 'Tell me about React',
    points: 5,
  },
  {
    id: 3,
    uuid: '123123',
    title: 'How does Event Loop work?',
    body: 'Tell Me about Event Loop',
    points: 10,
  },
];

export default function Example() {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {positions.map((position) => (
          <li key={position.id}>
            <a href="#" className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium text-indigo-600">
                    {position.title}
                  </p>
                </div>
                <div className="mt-2 sm:flex sm:justify-between"></div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
