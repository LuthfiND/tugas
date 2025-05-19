import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Event } from "@/lib/types";
import { MapIcon } from "lucide-react";

type EventCardProps = {
  event: Event;
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card className="w-full max-w-sm rounded-md shadow-md p-0 gap-4">
      <img
        src={event.thumbnail_url}
        alt={event.title}
        className="w-full h-48 object-cover rounded-t-md"
      />
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-around gap-4">
          <div className="md:w-1/3 flex-shrink-0">
            <p className="text-center font-semibold text-lg md:text-xl">
              {new Date(event.start_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
              })}
            </p>
          </div>
          <div className="md:w-2/3">
            <h1 className="font-semibold text-lg md:text-xl pb-1 md:pb-2 line-clamp-2">
              {event.title}
            </h1>
            <p className="text-base md:text-lg font-medium pb-1 md:pb-2">
              Rp {event.price.toLocaleString()}
            </p>
            <p className="flex gap-2 items-center text-sm md:text-base">
              <MapIcon className="w-4 h-4 md:w-5 md:h-5" />
              <span className="truncate">{event.address}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
