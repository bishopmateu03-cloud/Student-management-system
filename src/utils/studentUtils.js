// Reusable logic for the Student Management System.
// These are plain JavaScript functions (no React) so they are easy to test.

import { INITIAL_STUDENTS } from "../data/initialStudents.js";

// `const` for values that never change.
export const STORAGE_KEY = "student-management-students";
export const MIN_AGE = 16;
export const MAX_AGE = 100;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A blank form. `age` starts as "" (a string) because it comes from an <input>.
export const EMPTY_FORM = {
  fullName: "",
  age: "",
  email: "",
  course: "",
  status: "Enrolled",
  fullTime: true,
};

/**
 * Demonstrates `var` (function-scoped) versus `let` / `const` (block-scoped).
 * `var total` is visible in the whole function, even outside the `for` block.
 * `let` is used for the loop counter because it is re-assigned; the block-scoped
 * `student` constant is created fresh on every iteration.
 * Returns the average age of the students, or 0 for an empty list.
 */
export function averageAge(students) {
  var total = 0; // var: function scoped, re-assigned inside the loop
  for (let i = 0; i < students.length; i++) {
    const student = students[i]; // const: never re-assigned inside one iteration
    total += student.age;
  }
  // `total` is still accessible here because `var` ignores block scope.
  return students.length === 0 ? 0 : Math.round(total / students.length);
}

/**
 * Validates form values. Returns an object of error messages keyed by field name.
 * An empty object means the form is valid.
 * `editingId` lets us ignore the student being edited in the duplicate-email check.
 */
export function validateStudent(values, students = [], editingId = null) {
  const errors = {};
  const name = String(values.fullName ?? "").trim();
  const email = String(values.email ?? "").trim();
  const ageText = String(values.age ?? "").trim();

  if (name === "") {
    errors.fullName = "Full name is required.";
  } else if (name.length < 3) {
    errors.fullName = "Full name must be at least 3 characters.";
  } else if (!/^[A-Za-z][A-Za-z\s'.-]*$/.test(name)) {
    errors.fullName = "Name may only contain letters, spaces, apostrophes, dots and hyphens.";
  }

  if (ageText === "") {
    errors.age = "Age is required.";
  } else {
    const age = Number(ageText);
    if (!Number.isInteger(age)) {
      errors.age = "Age must be a whole number.";
    } else if (age < MIN_AGE || age > MAX_AGE) {
      errors.age = `Age must be between ${MIN_AGE} and ${MAX_AGE}.`;
    }
  }

  if (email === "") {
    errors.email = "Email address is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address (e.g. name@example.com).";
  } else {
    const duplicate = students.some(
      (s) => s.email.toLowerCase() === email.toLowerCase() && s.id !== editingId
    );
    if (duplicate) {
      errors.email = "Another student already uses this email address.";
    }
  }

  if (!values.course) {
    errors.course = "Please choose a course of study.";
  }

  if (!values.status) {
    errors.status = "Please choose an enrollment status.";
  }

  return errors;
}

/** Generates the next ID such as "STU-0006" from the highest existing number. */
export function generateStudentId(students) {
  const highest = students.reduce((max, s) => {
    const number = parseInt(String(s.id).replace("STU-", ""), 10);
    return Number.isNaN(number) ? max : Math.max(max, number);
  }, 0);
  return `STU-${String(highest + 1).padStart(4, "0")}`;
}

/** Converts raw form values (all strings) into a clean student object with correct types. */
export function buildStudent(values, id) {
  return {
    id,
    fullName: values.fullName.trim().replace(/\s+/g, " "),
    age: Number(values.age), // string -> number
    email: values.email.trim().toLowerCase(),
    course: values.course,
    status: values.status,
    fullTime: Boolean(values.fullTime), // -> boolean
  };
}

/** Returns a NEW array with the student added (React state must not be mutated). */
export const addStudent = (students, values) => [
  ...students,
  buildStudent(values, generateStudentId(students)),
];

/** Returns a NEW array where the matching student is replaced. */
export const updateStudent = (students, id, values) =>
  students.map((s) => (s.id === id ? buildStudent(values, id) : s));

/** Returns a NEW array without the student that has the given id. */
export const deleteStudent = (students, id) => students.filter((s) => s.id !== id);

/** Filters by a search text (name, email, id, course) and an optional status. */
export function filterStudents(students, query = "", status = "All") {
  const text = query.trim().toLowerCase();
  return students.filter((s) => {
    const matchesStatus = status === "All" || s.status === status;
    const matchesText =
      text === "" ||
      [s.id, s.fullName, s.email, s.course].some((field) => field.toLowerCase().includes(text));
    return matchesStatus && matchesText;
  });
}

/** Counts students per status, e.g. { Enrolled: 3, Deferred: 1 }. */
export function countByStatus(students) {
  return students.reduce((counts, s) => {
    counts[s.status] = (counts[s.status] || 0) + 1;
    return counts;
  }, {});
}

/** Loads students from localStorage, falling back to the sample data. */
export function loadStudents() {
  try {
    if (typeof localStorage === "undefined") return INITIAL_STUDENTS;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return INITIAL_STUDENTS;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : INITIAL_STUDENTS;
  } catch {
    // Corrupted or blocked storage: start with the sample data instead of crashing.
    return INITIAL_STUDENTS;
  }
}

/** Saves students to localStorage. Silently ignores storage errors (e.g. private mode). */
export function saveStudents(students) {
  try {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch {
    // Nothing else to do; the app keeps working with in-memory state.
  }
}
