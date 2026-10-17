
import { useCallback, useEffect, useState } from "react";

import StatsBar from "./components/StatsBar.jsx";
import SearchFilter from "./components/SearchFilter.jsx";
import StudentTable from "./components/StudentTable.jsx";
import StudentFormModal from "./components/StudentFormModal.jsx";
import DeleteConfirmModal from "./components/DeleteConfirmModal.jsx";
import EmptyState from "./components/EmptyState.jsx";
import Toast from "./components/Toast.jsx";

import {
  addStudent,
  updateStudent,
  deleteStudent,
  filterStudents,
  loadStudents,
  saveStudents,
} from "./utils/studentUtils.js";

export default function App() {
  const [students, setStudents] = useState(() => loadStudents());

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    saveStudents(students);
  }, [students]);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  const clearToast = useCallback(() => {
    setToast("");
  }, []);

  const handleAddStudent = () => {
    setModal({ type: "add" });
  };

  const handleSave = (values) => {
    if (!modal) return;

    try {
      if (modal.type === "edit") {
        setStudents((currentStudents) =>
          updateStudent(
            currentStudents,
            modal.student.id,
            values
          )
        );

        setToast("Student updated successfully.");
      } else {
        setStudents((currentStudents) =>
          addStudent(currentStudents, values)
        );

        setToast("Student added successfully.");
      }

      closeModal();
    } catch (error) {
      console.error("Unable to save student:", error);
      setToast("Unable to save student. Please try again.");
    }
  };

  const handleEditStudent = (student) => {
    setModal({
      type: "edit",
      student,
    });
  };

  const handleDeleteStudent = (student) => {
    setModal({
      type: "delete",
      student,
    });
  };

  const handleConfirmDelete = () => {
    if (!modal || modal.type !== "delete") return;

    const studentToDelete = modal.student;

    try {
      setStudents((currentStudents) =>
        deleteStudent(currentStudents, studentToDelete.id)
      );

      setToast(
        `${studentToDelete.fullName} was deleted successfully.`
      );

      closeModal();
    } catch (error) {
      console.error("Unable to delete student:", error);
      setToast("Unable to delete student. Please try again.");
    }
  };

  const visibleStudents = filterStudents(
    students,
    query,
    statusFilter
  );

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Student Management System</h1>

          <p className="muted">
            Manage student records, courses, and enrollment status.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddStudent}
        >
          + Add Student
        </button>
      </header>

      <main>
        <StatsBar students={students} />

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Student Records</h2>

              <p className="muted">
                View, search, edit, and delete student information.
              </p>
            </div>
          </div>

          <SearchFilter
            query={query}
            status={statusFilter}
            onQueryChange={setQuery}
            onStatusChange={setStatusFilter}
          />

          {visibleStudents.length === 0 ? (
            <EmptyState
              hasStudents={students.length > 0}
              onAdd={handleAddStudent}
            />
          ) : (
            <StudentTable
              students={visibleStudents}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
            />
          )}

          <p className="muted small">
            Showing {visibleStudents.length} of {students.length} students
          </p>
        </section>
      </main>

      {modal &&
        (modal.type === "add" || modal.type === "edit") && (
          <StudentFormModal
            mode={modal.type}
            student={modal.student || null}
            students={students}
            onSave={handleSave}
            onClose={closeModal}
          />
        )}

      {modal && modal.type === "delete" && (
        <DeleteConfirmModal
          student={modal.student}
          onConfirm={handleConfirmDelete}
          onClose={closeModal}
        />
      )}

      {toast && (
        <Toast
          message={toast}
          onDone={clearToast}
        />
      )}
    </div>
  );
}
