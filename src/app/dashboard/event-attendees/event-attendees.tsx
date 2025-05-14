import React from "react";

interface Attendee {
  id: string;
  name: string;
  email: string;
}

const mockAttendees: Attendee[] = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
];

const EventAttendees: React.FC = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Event Attendees</h2>
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Email</th>
        </tr>
      </thead>
      <tbody>
        {mockAttendees.map((a) => (
          <tr key={a.id}>
            <td className="py-2 px-4 border-b">{a.name}</td>
            <td className="py-2 px-4 border-b">{a.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EventAttendees;
