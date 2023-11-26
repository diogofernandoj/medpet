"use client";

import { format } from "date-fns";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useContext } from "react";
import { DateRangeContext } from "@/app/providers/date-range";

const CalendarDateRangePicker = () => {
  const { date, setDate, getUserInfo } = useContext(DateRangeContext);

  const handleDatePicked = (action: boolean) => {
    if (!action) {
      getUserInfo();
    }
  };

  return (
    <div className="grid gap-2">
      <Popover onOpenChange={(e) => handleDatePicked(e)}>
        <PopoverTrigger asChild className="shadow-lg">
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-max justify-start text-left font-medium text-xs",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon size={18} className="text-primary lg:mr-2" />
            <span className="hidden lg:block">
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Selecione uma data</span>
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CalendarDateRangePicker;
