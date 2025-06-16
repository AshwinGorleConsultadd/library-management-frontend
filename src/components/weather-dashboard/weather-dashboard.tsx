import { useGetCurrentWeather } from "../../hooks/weather/useGetCurrentWheather";
import { useState } from "react";
import { Calendar } from "../ui/calendar";
import WeatherCard from "./weather-card";
import React from "react";
import  SearchBar  from "./search-bar";

const WeatherDashBoard = () => {

  const { data, loading } = useGetCurrentWeather();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  console.log("Weather data:", data);


  return (
    <div className="min-h-screen bg-background text-foreground p-6">
    
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Weather Card */}
          <div className="lg:w-2/3 w-full">
            <WeatherCard/>
          </div>

          {/* Right: Search + Calendar */}
          <div className="lg:w-1/3 w-full flex flex-col gap-4">
            <SearchBar />
  
            <div className="rounded-2xl border shadow p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default WeatherDashBoard;
