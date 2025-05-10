
import { Event } from '@/lib/types'
import React from 'react'
import EventCard from '../eventCard';

type EventsPageProps = {
    events: Event[];
}
const EventsPage = ({events} : EventsPageProps) => {
  return (
    <div className='mx-10 '>
        <div className='mb-10'>
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