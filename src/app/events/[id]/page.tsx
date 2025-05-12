'use client'
import { Event, ShareSocialMedia } from "@/lib/types"
import { RootState, AppDispatch } from '@/lib/store';
import { useDispatch, useSelector } from "react-redux";
import { use, useEffect } from "react";
import { fetchEventsDetails } from "@/store/slices/EventsSlice";
import { Facebook, Instagram, MapPin, Twitter ,CalendarCheck} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ShareToSocialMedia : ShareSocialMedia[] = [
    {
        Image : Instagram,
        link : 'https://instagram.com'
    },
    {
        Image : Twitter,
        link : 'https://x.com'
    },
    {
        Image : Facebook,
        link : 'https://facebook.com'
    }
]
const EventDetailPage =  ({ params }: { params: Promise<{ id: string }> }) => {
      const { id } = use(params);
      const dispatch = useDispatch<AppDispatch>();
      const { item: events, loading } = useSelector((state: RootState) => state.events.eventDetail);
      useEffect(()=> {
    dispatch(fetchEventsDetails(id))
      },[id,dispatch])

return (
<div className="w-10/12 mx-auto mt-32 h-[calc(100vh-6rem)]">
  <div className="flex gap-10 h-1/2">
    <div className="flex flex-col gap-8 mt-6">
      <div>
        <p className="font-semibold text-xl">Share</p>
      </div>
      <div className="flex flex-col gap-8">
        {ShareToSocialMedia.map((medsos, index) => (
          <Link
            key={index}
            href={medsos.link}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#4F4CEE] p-2 rounded-md w-fit hover:bg-[#4F4CEE]/10 transition"
          >
            <medsos.Image className="w-8 h-8 text-[#4F4CEE]" />
          </Link>
        ))}
      </div>
    </div>

    <div className="w-full bg-[#DADAFB] rounded-md flex items-center justify-center relative h-full">
      <Image
        src={events?.thumbnail_url || '/default-thumbnail.jpg'}
        alt="image"
        fill
        className="object-cover rounded-md px-6 py-6"
      />
    </div>
  </div>

  <div className="w-11/12 ms-22 mt-8">
    <div className="flex flex-col gap-8">
        <div className="flex justify-between">
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="font-medium text-2xl">{events?.title}</h1>
                </div>
                 <div className="flex gap-2 items-center">
                  <MapPin/>
                  <h1>{events?.location}</h1>
                </div>
                 <div className="flex gap-2 items-center">
                  <CalendarCheck/>
                  <h1> {events?.time} {events?.start_date ? new Date(events.start_date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year : 'numeric'
            }) : 'Date not available'}   </h1>
                </div>
                <div>
                    <h1 className="">{events?.description}</h1>
                </div>
            </div>
<div className="relative w-[290px] h-[144px] mt-6">
  <div className="absolute w-full h-full bg-[#153BF5] rounded-xl 
     -bottom-[30px] -right-5"></div>
  
  <div className="relative z-10 bg-white p-6 rounded-xl shadow-md text-center border border-black 
    translate-x-[15px] translate-y-[10px]">
    <p className="text-gray-500 text-sm">Tickets starting at</p>
    <p className="text-2xl font-bold text-gray-900">  Rp {events?.price.toLocaleString()}</p>
    <button className="mt-4 w-full bg-[#5D4FF5] text-white py-2 rounded-md hover:bg-[#4F4CEE] transition">
      Buy Tickets
    </button>
  </div>
</div>


        </div>
    </div>
  </div>
    <div className="w-11/12 ms-22 mt-12">
    <div className="flex flex-col gap-8">
        <div className="flex justify-between">
                <div>
                    <h1 className="font-medium text-2xl">Event Information</h1>
            </div>


        </div>
    </div>
  </div>
</div>


);
};

export default EventDetailPage;
