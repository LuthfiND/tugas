import React from 'react';
import { Card, CardContent } from '@/components/ui/card'; // Pastikan path-nya sesuai
import { Event } from '@/lib/types';
import { MapIcon } from 'lucide-react';


type EventCardProps = {
  event: Event;
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card className="w-full max-w-sm rounded-md  shadow-md p-0">
      <img
        src={event.thumbnail_url}
        alt={event.title}
        className="w-full h-48 object-cover "
      />
      <CardContent className="p-4">
        <div className='flex items-center justify-around'>
            <div>
            <p className='text-center font-semibold text-xl'>
            {new Date(event.start_date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long' // test
            })}   
            </p>        
            </div>
            <div>
            <h1 className='font-semibold text-xl pb-2'>{event.title}</h1>
            <p className="text-lg font-medium pb-2">
          Rp {event.price.toLocaleString()}
        </p> 
        <p className='flex gap-2'><MapIcon/> <span>{event.address}</span></p>
            </div>
        
      </div>
        {/* <h3 className="text-xl font-bold">{event.title}</h3>
        <p className="text-lg text-green-600 font-semibold mt-2">
          Rp {event.price.toLocaleString()}
        </p> */}
      </CardContent>
    </Card>
  );
};

export default EventCard;
