/** Message shown when there are no students to display. Props: hasStudents, onAdd() */
export default function EmptyState({ hasStudents, onAdd }) {
  return (
    <div className="empty-state">
      <h3>{hasStudents ? "No matching students" : "No students yet"}</h3>
      <p className="muted">
        {hasStudents
          ? "Try a different search or clear the status filter."
          : "Get started by adding your first student record."}
      </p>
      {!hasStudents && (
        <button type="button" className="btn btn-primary" onClick={onAdd}>
          + Add Student
        </button>
      )}
    </div>
  );
}
