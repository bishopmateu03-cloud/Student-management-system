import Modal from "./Modal.jsx";

/**
 * Confirmation modal shown before a student is deleted.
 * Props: student, onConfirm(), onClose()
 */
export default function DeleteConfirmModal({ student, onConfirm, onClose }) {
  return (
    <Modal title="Delete Student" onClose={onClose}>
      <p>
        Are you sure you want to delete <strong>{student.fullName}</strong> ({student.id})?
      </p>
      <p className="muted">This action cannot be undone.</p>
      <div className="modal-actions">
        <button type="button" className="btn btn-secondary" onClick={onClose} autoFocus>
          Cancel
        </button>
        <button type="button" className="btn btn-danger" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </Modal>
  );
}
