
import { Event } from '@/lib/types'
import React from 'react'
import EventCard from '../eventCard';
import SkeletonEventCard from '../skeletionCard';

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
      {events.length > 0 ? (
  events.map((event) => (
    <EventCard key={event.id} event={event} />
  ))
) : (
  // Tampilkan 3 skeleton cards saat loading
  Array.from({ length: 4 }).map((_, i) => <SkeletonEventCard key={i} />)
)}

        </div>

    </div>
  )
}

export default EventsPage