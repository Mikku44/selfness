import React, { useState, useEffect } from 'react';

interface DatePickerProps {
  onDateSelect?: (date: Date) => void;
  variant?: 'dark' | 'light';
}

const WeeklyDatePicker: React.FC<DatePickerProps> = ({ 
  onDateSelect,
  variant = 'dark' 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [weekDates, setWeekDates] = useState<Date[]>([]);

  useEffect(() => {
    generateWeekDates();
  }, []);

  const generateWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const dates: Date[] = [];
    
    // Generate dates for the current week (Sunday to Saturday)
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - currentDay + i);
      dates.push(date);
    }
    
    setWeekDates(dates);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  const formatDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const formatDate = (date: Date) => {
    return date.getDate().toString();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const isDarkVariant = variant === 'dark';

  return (
    <div className="">
      <div className="flex  hidden-scrollbar element justify-start md:justify-between rounded-lg overflow-x-scroll  py-4 ">
        {weekDates.map((date, index) => {
          const isCurrentDay = isSelected(date);
          const isTodayDate = isToday(date);
          
          return (
            <div
              key={index}
              onClick={() => handleDateClick(date)}
              className={`flex group  rounded-lg transition-all duration-300 cursor-pointer justify-center w-20 relative ${
                isCurrentDay
                  ? isDarkVariant
                    ? 'bg-purple-600 shadow-lg '
                    : 'bg-[--quinary-color-light] shadow-lg '
                  : isDarkVariant
                  ? 'hover:bg-purple-500 hover:shadow-lg '
                  : 'hover:border-[--quinary-color-light] border-2 hover:shadow-lg bg-white'
              }`}
            >
            
              {isTodayDate && (
                <span className="flex h-3 w-3 absolute -top-1 -right-1">
                  <span className="animate-ping absolute group-hover:opacity-75 opacity-0 inline-flex h-full w-full rounded-full bg-purple-400"></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${
                    isDarkVariant ? 'bg-purple-100' : 'bg-purple-500'
                  }`}></span>
                </span>
              )}
              
              <div className="flex items-center px-4 py-4">
                <div className="text-center">
                  <p className={`text-sm transition-all duration-300 ${
                    isCurrentDay
                      ? isDarkVariant
                        ? 'text-gray-100'
                        : 'text-[--quinary-color-dark]'
                      : isDarkVariant
                      ? 'text-gray-900 group-hover:text-gray-100'
                      : 'text-gray-900 group-hover:text-[--quinary-color-dark]'
                  }`}>
                    {formatDay(date)}
                  </p>
                  <p className={`mt-3 transition-all duration-300${isTodayDate && " flex items-center justify-center size-10 rounded-full bg-[--primary-color-light]"} ${
                  isCurrentDay
                      ? isDarkVariant
                        ? 'text-gray-100 font-bold'
                        : 'text-[--primary-color-dark] font-bold'
                      : isDarkVariant
                      ? 'text-gray-900 group-hover:text-gray-100 font-bold'
                      : 'text-gray-900 group-hover:text-[--primary-color-dark] group-hover:font-bold'
                   
                  }`}>
                    {formatDate(date)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      
      {/* Selected date display */}
      {/* <div className="mt-8 text-center">
        <p className="text-gray-600">
          Selected Date: {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div> */}
    </div>
  );
};

export default WeeklyDatePicker;