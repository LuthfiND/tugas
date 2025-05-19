"use client";

import { useState, useRef, ChangeEvent } from "react";
import EventsPage from "@/components/layouts/events";
import NavbarPage from "@/components/layouts/Navbar";
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/datePicker";
import Image from "next/image";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, 500);
  };

  // Handler untuk date picker
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div className="w-full">
      <div className="flex w-11/12 mx-auto justify-between max-md:flex-col max-md:items-center max-md:gap-4">
        <Image src="/lamp.png" alt="hero" width={180} height={180} />
        <Image src="/lamp.png" alt="hero" width={180} height={180} />
      </div>
      <div className="w-full justify-center flex items-center">
        <h1 className="text-5xl md:text-7xl font-bold text-[#4F4CEE] font-space text-center px-2">
          Exclusive events, priceless moments
        </h1>
      </div>
      <div className="w-full justify-center flex items-center mt-8">
        <Image
          src="/banner.jpeg"
          alt="hero"
          width={2000}
          height={2000}
          className="w-full h-auto max-h-[300px] object-cover rounded-lg"
        />
      </div>
      <div className="w-full">
        <div className="flex flex-col md:flex-row items-center gap-4 bg-white border-black border-3 w-full md:w-[60%] h-auto md:h-24 rounded-sm px-4 mx-auto mt-8 py-4 md:py-0">
          {/* Search bar */}
          <input
            type="text"
            className="w-full md:w-[40%] h-12 md:h-full rounded-sm outline-none px-4 border border-gray-200"
            placeholder="Search for events, artists, or venues"
            onChange={handleSearchChange}
          />
          <hr className="hidden md:block w-[2px] h-14 bg-gray-600 border-none" />
          <div className="w-full md:w-[45%]">
            <DatePickerDemo onChange={handleDateChange} />
          </div>
          <Button
            variant={"main"}
            size={"lg"}
            className="w-full md:w-auto mt-4 md:mt-0"
          >
            Search
          </Button>
        </div>
        <div className="mx-2 md:mx-14 mt-10">
          <EventsPage searchQuery={searchQuery} selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
}
