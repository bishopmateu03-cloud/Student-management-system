// Automated tests for the logic in src/utils/studentUtils.js.
// Run with: npm test   (uses Node's built-in test runner, no extra packages needed)

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  addStudent,
  updateStudent,
  deleteStudent,
  validateStudent,
  filterStudents,
  generateStudentId,
  averageAge,
  countByStatus,
  loadStudents,
} from "../src/utils/studentUtils.js";
import { INITIAL_STUDENTS } from "../src/data/initialStudents.js";

const validForm = {
  fullName: "Mpho Sebata",
  age: "21",
  email: "mpho@example.com",
  course: "Diploma in Networking",
  status: "Enrolled",
  fullTime: true,
};

test("ADD: adds a student with a new ID and correct types", () => {
  const result = addStudent(INITIAL_STUDENTS, validForm);
  assert.equal(result.length, INITIAL_STUDENTS.length + 1);
  const added = result[result.length - 1];
  assert.equal(added.id, "STU-0006");
  assert.equal(typeof added.age, "number");
  assert.equal(typeof added.fullTime, "boolean");
  assert.equal(INITIAL_STUDENTS.length, 5, "original array must not be mutated");
});

test("EDIT: updates only the matching student", () => {
  const result = updateStudent(INITIAL_STUDENTS, "STU-0002", { ...validForm, fullName: "Lerato N." });
  assert.equal(result.find((s) => s.id === "STU-0002").fullName, "Lerato N.");
  assert.equal(result.find((s) => s.id === "STU-0001").fullName, "Thabo Mokoena");
});

test("DELETE: removes the student and keeps the others", () => {
  const result = deleteStudent(INITIAL_STUDENTS, "STU-0003");
  assert.equal(result.length, 4);
  assert.equal(result.some((s) => s.id === "STU-0003"), false);
});

test("DELETE: unknown ID changes nothing", () => {
  assert.equal(deleteStudent(INITIAL_STUDENTS, "STU-9999").length, 5);
});

test("VALIDATION: valid form has no errors", () => {
  assert.deepEqual(validateStudent(validForm, INITIAL_STUDENTS), {});
});

test("VALIDATION: required fields", () => {
  const errors = validateStudent({ fullName: "", age: "", email: "", course: "", status: "" }, []);
  assert.ok(errors.fullName && errors.age && errors.email && errors.course && errors.status);
});

test("VALIDATION: age limits and whole numbers", () => {
  assert.ok(validateStudent({ ...validForm, age: "10" }).age);
  assert.ok(validateStudent({ ...validForm, age: "150" }).age);
  assert.ok(validateStudent({ ...validForm, age: "20.5" }).age);
  assert.equal(validateStudent({ ...validForm, age: "16" }).age, undefined);
});

test("VALIDATION: email format", () => {
  assert.ok(validateStudent({ ...validForm, email: "not-an-email" }).email);
  assert.ok(validateStudent({ ...validForm, email: "a@b" }).email);
});

test("VALIDATION: duplicate email rejected, but allowed for the same student when editing", () => {
  const dup = { ...validForm, email: "thabo.mokoena@example.com" };
  assert.ok(validateStudent(dup, INITIAL_STUDENTS).email);
  assert.equal(validateStudent(dup, INITIAL_STUDENTS, "STU-0001").email, undefined);
});

test("SEARCH / FILTER: by text and by status", () => {
  assert.equal(filterStudents(INITIAL_STUDENTS, "lerato").length, 1);
  assert.equal(filterStudents(INITIAL_STUDENTS, "", "Deferred").length, 1);
  assert.equal(filterStudents(INITIAL_STUDENTS, "zzz").length, 0);
});

test("EMPTY STATE: helpers handle an empty list", () => {
  assert.equal(generateStudentId([]), "STU-0001");
  assert.equal(averageAge([]), 0);
  assert.deepEqual(countByStatus([]), {});
  assert.equal(filterStudents([], "a").length, 0);
});

test("STATS: average age and status counts", () => {
  assert.equal(averageAge(INITIAL_STUDENTS), 22);
  assert.equal(countByStatus(INITIAL_STUDENTS).Enrolled, 3);
});

test("STORAGE: falls back to sample data when localStorage is unavailable", () => {
  assert.equal(loadStudents().length, INITIAL_STUDENTS.length);
});
