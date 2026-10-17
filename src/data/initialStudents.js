// Initial sample data used the first time the app loads (before localStorage has anything).
//
// DATA TYPE CHOICES (explained for the assignment):
//  - id        : string  -> an identifier like "STU-0001"; never used for arithmetic.
//  - fullName  : string  -> text.
//  - age       : number  -> numeric so it can be compared (min / max validation).
//  - email     : string  -> text.
//  - course    : string  -> chosen from the COURSES array.
//  - status    : string  -> chosen from the STATUSES array.
//  - fullTime  : boolean -> a simple yes / no value.
// Each student is an OBJECT, and the whole list is an ARRAY of those objects.

// `const` is used because these lists are never re-assigned.
export const COURSES = [
  "Diploma in Information Technology",
  "Diploma in Business Information Technology",
  "Diploma in Software Engineering",
  "Diploma in Networking",
  "Diploma in Multimedia Design",
];

export const STATUSES = ["Enrolled", "Deferred", "Graduated", "Withdrawn"];

export const INITIAL_STUDENTS = [
  {
    id: "STU-0001",
    fullName: "Thabo Mokoena",
    age: 20,
    email: "thabo.mokoena@example.com",
    course: "Diploma in Information Technology",
    status: "Enrolled",
    fullTime: true,
  },
  {
    id: "STU-0002",
    fullName: "Lerato Nkosi",
    age: 22,
    email: "lerato.nkosi@example.com",
    course: "Diploma in Business Information Technology",
    status: "Enrolled",
    fullTime: true,
  },
  {
    id: "STU-0003",
    fullName: "Palesa Molapo",
    age: 24,
    email: "palesa.molapo@example.com",
    course: "Diploma in Networking",
    status: "Deferred",
    fullTime: false,
  },
  {
    id: "STU-0004",
    fullName: "Tumelo Khalema",
    age: 19,
    email: "tumelo.khalema@example.com",
    course: "Diploma in Software Engineering",
    status: "Enrolled",
    fullTime: true,
  },
  {
    id: "STU-0005",
    fullName: "Nthabiseng Letsie",
    age: 26,
    email: "nthabiseng.letsie@example.com",
    course: "Diploma in Multimedia Design",
    status: "Graduated",
    fullTime: false,
  },
];
