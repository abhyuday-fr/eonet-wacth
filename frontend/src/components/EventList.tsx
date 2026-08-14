import { EventCard } from './EventCard'
import type { Event } from '../types/events'

interface Props {
  events: Event[]
  isLoading: boolean
  error: Error | null
}

export function EventList({ events, isLoading, error }: Props) {
  if (isLoading) return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="backdrop-blur-md bg-blue-950/20 rounded-lg p-4 border border-blue-900/30 animate-pulse">
          <div className="h-4 bg-slate-700/50 rounded w-3/4 mb-2" />
          <div className="h-3 bg-slate-800/50 rounded w-1/4" />
        </div>
      ))}
    </div>
  )

  if (error) return (
    <div className="bg-rose-950/40 border border-rose-900/50 rounded-lg p-4 backdrop-blur-md">
      <p className="text-rose-300/80 text-sm">Server Issue, please try again in a few seconds.</p>
    </div>
  )

  if (events.length === 0) return (
    <p className="text-blue-200/50 text-sm text-center py-8">No events found for the current filters.</p>
  )

  return (
    <div className="space-y-4">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
