'use client'
import EventsPage from "@/components/layouts/events";
import NavbarPage from "@/components/layouts/Navbar";
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/datePicker";
import { Event } from "@/lib/types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [events,setEvents] = useState<Event[]>([])
  const getEvents = async ()=> {
    const response = await axios.get('/api/events')
    setEvents(response.data.data)

  }
  useEffect(()=> {
    getEvents()
  },[])
  return (
    <div className="w-full">
      <NavbarPage/>
      <div className="flex w-11/12 mx-auto justify-between">
      <Image
        src="/lamp.png"
        alt="hero"
        width={180}
        height={180}
      />
       <Image
        src="/lamp.png"
        alt="hero"
        width={180}
        height={180}
      />
      </div>
      <div className="w-full justify-center flex items-center">
        <h1 className="text-7xl font-bold text-[#4F4CEE] font-space">Exclusive events, priceless moments</h1>
      </div>
      <div className="relative">
   <div className="w-full justify-center flex items-center">
        <Image
        src="/banner.jpeg"
        alt="hero"
        width={2000}
        height={2000}
      />      
      </div>
            <div className="absolute flex items-center gap-4 left-[20%] bg-white -bottom-16 border-black border-3 w-[60%] h-24 rounded-sm">
              <input type="text" className="w-[40%] h-full rounded-sm  outline-none px-4" placeholder="Search for events, artists, or venues"/>
        <hr className="w-[2px] h-14 bg-gray-600 border-none" />
        <div className="w-[45%]">
        <DatePickerDemo/>
        </div>
          <Button variant={"main"} size={"lg"}>Search</Button>
            </div>
      </div>
      <div className="w-full mt-48 mx-32">
       <EventsPage events={events}/>
      </div>
   
    </div>
    )
}
