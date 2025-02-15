'use client'

import { format } from "date-fns"

interface FormattedDateProps {
  date: string
  className?: string
}

export function FormattedDate({ date, className }: FormattedDateProps) {
  return (
    <span className={className}>
      {format(new Date(date), "MMM d")}
    </span>
  )
} 