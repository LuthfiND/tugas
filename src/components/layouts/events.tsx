
import { Event } from '@/lib/types'
import React from 'react'
import { CardContent } from '../ui/card';
import EventCard from '../eventCard';

type EventsPageProps = {
    events: Event[];
}
const EventsPage = ({events} : EventsPageProps) => {
  return (
    <div className='w-full'>
        <div className='mb-10 w-full'>
        <p className='font-bold text-3xl'>Upcoming Events</p>
        </div>
        <div className='flex items-center justify-between'>
           {events.length ? (
  events.map((event) => (
    <EventCard key={event.id} event={event} />
  ))
) : (
  <div>Halo</div> // tampilkan jika event kosong
)}
        </div>

    </div>
  )
}

export default EventsPage