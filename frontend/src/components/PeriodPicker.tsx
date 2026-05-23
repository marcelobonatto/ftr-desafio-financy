import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface PeriodPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function PeriodPicker({ value, onChange }: PeriodPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [currentYear, currentMonth] = value.split("-").map(Number);

  const handleMonthSelect = (monthIndex: number) => {
    const formattedMonth = String(monthIndex + 1).padStart(2, "0");
    onChange(`${currentYear}-${formattedMonth}`);
    setIsOpen(false);
  };

  const changeYear = (amount: number) => {
    onChange(
      `${currentYear + amount}-${String(currentMonth).padStart(2, "0")}`,
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className="group/native-select relative has-[select:disabled]:opacity-50 w-full"
        render={
          <Button
            variant="outline"
            className="w-full h-9 justify-between border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-md px-3 font-normal"
          />
        }
      >
        <span>
          {MONTHS[currentMonth - 1]} / {currentYear}
        </span>
        <ChevronDown size={16} className="text-black opacity-50 shrink-0" />
      </PopoverTrigger>

      <PopoverContent
        className="p-2 rounded-md bg-white border border-gray-200 shadow-md"
        align="start"
      >
        <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            className="h-7 w-7 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => changeYear(-1)}
          >
            <ChevronLeft size={16} />
          </Button>
          <span className="font-semibold text-gray-800 text-sm tracking-tight">
            {currentYear}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => changeYear(1)}
          >
            <ChevronRight size={16} />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-1 pt-1.5">
          {MONTHS.map((month, index) => {
            const isSelected = currentMonth === index + 1;

            return (
              <Button
                key={month}
                type="button"
                onClick={() => handleMonthSelect(index)}
                className={`h-9 rounded-md text-xs font-medium transaction-all
                            ${isSelected
                    ? "bg-brand-base text-white font-semibold shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 active:bg-gray-100"
                  }`}
              >
                {month.substring(0, 3)}
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
