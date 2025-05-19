import React from "react";

interface Attendee {
  id: string;
  name: string;
  email: string;
  qty: number;
  total: number;
}

const mockAttendees: Attendee[] = [
  { id: "1", name: "Alice", email: "alice@example.com", qty: 2, total: 200000 },
  { id: "2", name: "Bob", email: "bob@example.com", qty: 1, total: 100000 },
];

const EventAttendees: React.FC = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Event Attendees</h2>
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Ticket Qty</th>
          <th>Total Paid</th>
        </tr>
      </thead>
      <tbody>
        {mockAttendees.map((a) => (
          <tr key={a.id}>
            <td>{a.name}</td>
            <td>{a.email}</td>
            <td>{a.qty}</td>
            <td>Rp {a.total.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EventAttendees;
