"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

interface ComboBoxProps<T> {
  placeholder: string;
  data: T[];
  selectedValue: string;
  onSelect: (value: string) => void;
  valueKey: keyof T;
  displayKey: keyof T;
}

const ComboBoxNelsen = <T extends Record<string, any>>({
  placeholder,
  data,
  selectedValue,
  onSelect,
  valueKey,
  displayKey,
}: ComboBoxProps<T>) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[200px] justify-between",
              !selectedValue && "text-muted-foreground"
            )}
          >
            {selectedValue
              ? data.find((item) => item[valueKey] === selectedValue)?.[
                  displayKey
                ]
              : placeholder}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={`cari data `} className="h-9" />
            <CommandList>
              <CommandEmpty>No data found.</CommandEmpty>
              <CommandGroup>
                {data.map((item, index) => (
                  <CommandItem
                    key={item[valueKey] || index}
                    value={item[valueKey]}
                    onSelect={() => onSelect(item[valueKey])}
                  >
                    {item[displayKey]}
                    <Check
                      className={cn(
                        "ml-auto",
                        item[valueKey] === selectedValue
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ComboBoxNelsen;
