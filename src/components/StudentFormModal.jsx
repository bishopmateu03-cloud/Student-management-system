import { useState } from "react";
import Modal from "./Modal.jsx";
import { COURSES, STATUSES } from "../data/initialStudents.js";
import { EMPTY_FORM, MIN_AGE, MAX_AGE, validateStudent } from "../utils/studentUtils.js";

/**
 * Add / Edit modal with a controlled form.
 * Props:
 *  - mode: "add" | "edit"
 *  - student: the student being edited (null when adding)
 *  - students: full list (used for the duplicate-email check)
 *  - onSave(values): called with valid form values
 *  - onClose(): closes the modal without saving
 */
export default function StudentFormModal({ mode, student, students, onSave, onClose }) {
  const isEdit = mode === "edit";

  // Form values live in state. Editing starts from the student's current values.
  const [values, setValues] = useState(
    isEdit && student
      ? {
          fullName: student.fullName,
          age: String(student.age),
          email: student.email,
          course: student.course,
          status: student.status,
          fullTime: student.fullTime,
        }
      : EMPTY_FORM
  );
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    // Clear the error for a field as soon as the user starts fixing it.
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validateStudent(values, students, isEdit && student ? student.id : null);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return; // prevent invalid submissions
    }
    onSave(values);
  };

  const fieldError = (name) =>
    errors[name] ? (
      <span className="error-text" id={`${name}-error`} role="alert">
        {errors[name]}
      </span>
    ) : null;

  return (
    <Modal title={isEdit ? "Edit Student" : "Add New Student"} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        {isEdit && student && (
          <p className="muted">
            Student ID: <strong>{student.id}</strong>
          </p>
        )}

        <div className="form-group">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={values.fullName}
            onChange={handleChange}
            className={errors.fullName ? "invalid" : ""}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            autoFocus
          />
          {fieldError("fullName")}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              name="age"
              type="number"
              min={MIN_AGE}
              max={MAX_AGE}
              value={values.age}
              onChange={handleChange}
              className={errors.age ? "invalid" : ""}
              aria-invalid={Boolean(errors.age)}
              aria-describedby={errors.age ? "age-error" : undefined}
            />
            {fieldError("age")}
          </div>

          <div className="form-group">
            <label htmlFor="status">Enrollment status</label>
            <select
              id="status"
              name="status"
              value={values.status}
              onChange={handleChange}
              className={errors.status ? "invalid" : ""}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {fieldError("status")}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className={errors.email ? "invalid" : ""}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {fieldError("email")}
        </div>

        <div className="form-group">
          <label htmlFor="course">Course of study</label>
          <select
            id="course"
            name="course"
            value={values.course}
            onChange={handleChange}
            className={errors.course ? "invalid" : ""}
            aria-invalid={Boolean(errors.course)}
            aria-describedby={errors.course ? "course-error" : undefined}
          >
            <option value="">-- Select a course --</option>
            {COURSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {fieldError("course")}
        </div>

        <label className="checkbox">
          <input type="checkbox" name="fullTime" checked={values.fullTime} onChange={handleChange} />
          Full-time student
        </label>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEdit ? "Save Changes" : "Add Student"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
