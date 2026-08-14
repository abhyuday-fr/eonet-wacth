import type { EventsFilter } from '../types/events'

const CATEGORIES = [
  { id: '', label: 'All Categories' },
  { id: 'wildfires', label: '🔥 Wildfires' },
  { id: 'severeStorms', label: '⛈️ Severe Storms' },
  { id: 'volcanoes', label: '🌋 Volcanoes' },
  { id: 'seaLakeIce', label: '🧊 Sea & Lake Ice' },
  { id: 'earthquakes', label: '🫨 Earthquakes' },
  { id: 'floods', label: '🌊 Floods' },
  { id: 'landslides', label: '⛰️ Landslides' },
  { id: 'snow', label: '❄️ Snow' },
  { id: 'dustHaze', label: '🌫️ Dust & Haze' },
]

const STATUS_OPTIONS = [
  { value: 'open', label: 'Ongoing' },
  { value: 'closed', label: 'Closed' },
  { value: 'all', label: 'All' },
]

interface Props {
  filter: EventsFilter
  onChange: (filter: EventsFilter) => void
}

export function FilterBar({ filter, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <div className="flex rounded-lg overflow-hidden border border-blue-900/60 bg-blue-950/20">
        {STATUS_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange({ ...filter, status: opt.value as EventsFilter['status'] })}
            className={`px-4 py-1.5 text-sm transition-all duration-200 ${
              filter.status === opt.value
                ? 'bg-blue-800/60 text-blue-50 shadow-inner'
                : 'text-blue-300 hover:text-blue-100 hover:bg-blue-900/40'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <select
        value={filter.category ?? ''}
        onChange={e => onChange({ ...filter, category: e.target.value })}
        className="bg-blue-950/40 border border-blue-900/60 text-blue-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-700/80 transition-colors"
      >
        {CATEGORIES.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.label}</option>
        ))}
      </select>

      <select
        value={filter.days ?? 0}
        onChange={e => onChange({ ...filter, days: Number(e.target.value) })}
        className="bg-blue-950/40 border border-blue-900/60 text-blue-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-700/80 transition-colors"
      >
        <option value={0}>All time</option>
        <option value={7}>Last 7 days</option>
        <option value={30}>Last 30 days</option>
        <option value={90}>Last 90 days</option>
      </select>
    </div>
  )
}
