import React from 'react';
import { Card, CardContent } from '@/components/ui/card'; // Pastikan path-nya sesuai
import { Event } from '@/lib/types';



type EventCardProps = {
  event: Event;
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card className="w-full max-w-sm rounded-2xl overflow-hidden shadow-lg">
      <img
        src={event.thumbnail_url}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <h3 className="text-xl font-bold">{event.title}</h3>
        <p className="text-lg text-green-600 font-semibold mt-2">
          Rp {event.price.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
};

export default EventCard;
