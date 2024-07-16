"use client"

// DONE REVIEWING: GITHUB COMMIT 1️⃣

import {format} from "date-fns"
import {Calendar as CalendarIcon} from "lucide-react"
import {PropsWithChildren} from "react"
import Popover, {PopoverTrigger} from "../popover"
import PopoverContent from "../popover/popover-content"

type DatePickerProps = {
  date: Date | string | number | undefined
} & PropsWithChildren

const DatePicker = function DatePicker({date, children}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className="shc-input-base items-center">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">{children}</PopoverContent>
    </Popover>
  )
}

export default DatePicker
