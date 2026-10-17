import { STATUSES } from "../data/initialStudents.js";

/**
 * Search box and status filter. Both inputs are controlled by the parent (App).
 * Props: query, status, onQueryChange(text), onStatusChange(text)
 */
export default function SearchFilter({ query, status, onQueryChange, onStatusChange }) {
  return (
    <div className="toolbar-filters">
      <input
        type="search"
        placeholder="Search by name, email, ID or course"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        aria-label="Search students"
      />
      <select
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
        aria-label="Filter by enrollment status"
      >
        <option value="All">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
