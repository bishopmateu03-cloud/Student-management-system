import { STATUSES } from "../data/initialStudents.js";
import { averageAge, countByStatus } from "../utils/studentUtils.js";

/** Summary cards at the top of the dashboard. Props: students (array). */
export default function StatsBar({ students }) {
  const counts = countByStatus(students);
  return (
    <section className="stats" aria-label="Summary">
      <div className="stat-card">
        <span className="stat-value">{students.length}</span>
        <span className="stat-label">Total students</span>
      </div>
      {STATUSES.map((s) => (
        <div className="stat-card" key={s}>
          <span className="stat-value">{counts[s] || 0}</span>
          <span className="stat-label">{s}</span>
        </div>
      ))}
      <div className="stat-card">
        <span className="stat-value">{averageAge(students)}</span>
        <span className="stat-label">Average age</span>
      </div>
    </section>
  );
}
