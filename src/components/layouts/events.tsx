'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '@/store/slices/EventsSlice';
import { RootState, AppDispatch } from '@/lib/store';
import EventCard from '../eventCard';
import SkeletonEventCard from '../skeletionCard';
import { useRouter } from 'next/navigation';

const EventsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()
  const { items: events, loading } = useSelector((state: RootState) => state.events.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  function hanleClick(id: number) {
  router.push(`/events/${id}`)
  }

  return (
    <div className='mx-10'>
      <div className='mb-10'>
        <p className='font-bold text-3xl'>Upcoming Events</p>
      </div>
      <div className='flex items-center justify-between gap-4'>
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonEventCard key={i} />)
        ) : (
          events.map((event) => (
          <>
          <div className='w-full' key={event.id} onClick={()=>hanleClick(event.id)}>
  <EventCard event={event} />
          </div>
                  

          </>
           
          ))
        )}
      </div>
    </div>
  );
};

export default EventsPage;