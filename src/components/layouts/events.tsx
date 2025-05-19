"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "@/store/slices/EventsSlice";
import { RootState, AppDispatch } from "@/lib/store";
import EventCard from "../eventCard";
import SkeletonEventCard from "../skeletionCard";
import { useRouter } from "next/navigation";

interface EventsPageProps {
  searchQuery: string;
  selectedDate: Date | null;
}

const EventsPage: React.FC<EventsPageProps> = ({
  searchQuery,
  selectedDate,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { items: events, loading } = useSelector(
    (state: RootState) => state.events.events
  );

  useEffect(() => {
    dispatch(
      fetchEvents({
        searchQuery,
        selectedDate,
      })
    );
  }, [dispatch, searchQuery, selectedDate]);

  function handleClick(id: number) {
    router.push(`/events/${id}`);
  }

  return (
    <div className="mx-10">
      <div className="mb-10">
        <p className="font-bold text-3xl">Upcoming Events</p>
      </div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <SkeletonEventCard key={i} />
            ))
          : events.map((event) => (
              <div
                className="w-full md:w-[23%] cursor-pointer"
                key={event.id}
                onClick={() => handleClick(event.id)}
              >
                <EventCard event={event} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default EventsPage;
