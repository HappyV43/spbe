"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { id } from "date-fns/locale";

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  onDateChange?: (date: Date | null | string ) => void;
  placeholder?: string;
  value?: Date | null;
}

export function DatePick({
  className,
  placeholder = "Pilih tanggal",
  onDateChange,
  value,
}: DatePickerProps) {
  const [date, setDate] = useState<any>(value ?? null);

  useEffect(() => {
    if (value === null) {
      setDate(null);
    }
  }, [value]);

const handleDateChange = (newDate: any) => {
  setDate(newDate);
  if (onDateChange) {
    onDateChange(format(newDate, "dd MMMM yyyy", { locale: id }));
  }
};

  return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full sm:w-[300] justify-start text-left font-normal"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
                format(date, "dd MMMM yyyy", { locale: id })
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            defaultMonth={date || undefined}
            initialFocus
          />
        </PopoverContent>
      </Popover>
  );
}
