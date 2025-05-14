import React from "react";

interface Event {
  id: string;
  title: string;
  date: string;
}

const mockEvents: Event[] = [
  { id: "e1", title: "Workshop React", date: "2025-06-20" },
  { id: "e2", title: "Conference Next.js", date: "2025-07-05" },
];

const MyEvent: React.FC = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">My Events</h2>
    <ul className="space-y-3">
      {mockEvents.map((ev) => (
        <li key={ev.id} className="p-4 border rounded hover:shadow">
          <h3 className="text-lg font-medium">{ev.title}</h3>
          <p className="text-sm text-gray-600">Date: {ev.date}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default MyEvent;
