import axios from 'axios'
import type { EventsResponse, EventsFilter } from '../types/events'

// In development, Vite proxies /api to localhost:8080
// In production, Vite injects VITE_API_URL to point to the deployed Go backend
const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/api/v1` 
    : '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function fetchEvents(filter: EventsFilter = {}): Promise<EventsResponse> {
  const params = new URLSearchParams()

  if (filter.status)   params.set('status', filter.status)
  if (filter.limit)    params.set('limit', String(filter.limit))
  if (filter.days)     params.set('days', String(filter.days))
  if (filter.category) params.set('category', filter.category)

  const { data } = await client.get<EventsResponse>('/events', { params })
  return data
}
