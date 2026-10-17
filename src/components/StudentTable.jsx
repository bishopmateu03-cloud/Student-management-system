/**
 * Responsive student list. On desktop it looks like a table; on phones each row
 * becomes a card (see styles). Each cell has data-label for the mobile layout.
 * Props: students (array), onEdit(student), onDelete(student)
 */
function StudentRow({ student, onEdit, onDelete }) {
  return (
    <tr>
      <td data-label="ID">{student.id}</td>
      <td data-label="Full name">{student.fullName}</td>
      <td data-label="Age">{student.age}</td>
      <td data-label="Email">{student.email}</td>
      <td data-label="Course">
        {student.course}
        <div className="muted small">{student.fullTime ? "Full-time" : "Part-time"}</div>
      </td>
      <td data-label="Status">
        <span className={`badge badge-${student.status.toLowerCase()}`}>{student.status}</span>
      </td>
      <td data-label="Actions" className="actions">
        <button
          type="button"
          className="btn btn-small btn-secondary"
          onClick={() => onEdit(student)}
          aria-label={`Edit ${student.fullName}`}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-small btn-danger"
          onClick={() => onDelete(student)}
          aria-label={`Delete ${student.fullName}`}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default function StudentTable({ students, onEdit, onDelete }) {
  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Full name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Course</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentRow key={student.id} student={student} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
}
