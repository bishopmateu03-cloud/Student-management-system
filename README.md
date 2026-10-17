# Student Management System


An interactive Student Management System built with **React** and **JavaScript** (Vite). Users can view, search, add, edit and delete student records using modal dialogs. Data is kept in React state and saved to `localStorage`, so it survives a page refresh.

## Features

- Student dashboard (table on desktop, cards on mobile) with summary statistics
- Each record: student ID, full name, age, email, course of study, enrollment status (plus full-time/part-time)
- **Add**, **Edit** and **Delete-confirmation** modals (open/close with buttons, backdrop click or Escape)
- Form validation with clear messages (required fields, age range, email format, duplicate email)
- Search and status filter, empty-state messages, toast notifications
- Instant UI updates after every operation (no page refresh)
- Persistent storage using `localStorage`

## Run locally

```bash
npm install
npm run dev      # development server
npm test         # automated logic tests
npm run build    # production build into /dist
npm run preview  # preview the production build
```

Requires Node.js 18 or newer.

## Project structure

```
src/
  main.jsx                     app entry point
  App.jsx                      main state (students, modal, filters) and layout
  components/
    Modal.jsx                  reusable modal shell (Escape, backdrop, scroll lock)
    StudentFormModal.jsx       add / edit form with validation
    DeleteConfirmModal.jsx     delete confirmation
    StudentTable.jsx           table / card list (+ StudentRow)
    SearchFilter.jsx           search box and status filter
    StatsBar.jsx               summary cards
    EmptyState.jsx             empty / no-results message
    Toast.jsx                  temporary notification
  data/initialStudents.js      sample data, COURSES and STATUSES lists
  utils/studentUtils.js        add / update / delete / validate / filter / storage functions
  styles/index.css             responsive styling
tests/studentUtils.test.js     automated tests (node:test)
```

## JavaScript data types and variable declarations

| Data | Type | Why |
| --- | --- | --- |
| `id`, `fullName`, `email`, `course`, `status` | string | Text values |
| `age` | number | Needs numeric comparison (min/max). Converted from the form's string with `Number()` |
| `fullTime` | boolean | Simple yes/no value |
| list of students | array | Ordered collection; handled with `map`, `filter`, `reduce`, `some` |
| one student | object | Groups the related fields |

- **`const`** is used for values that are never re-assigned: constants, functions, arrays and objects (the array itself is never reassigned; updates create new arrays).
- **`let`** is used where a value changes, e.g. the loop counter in `averageAge`.
- **`var`** is demonstrated once in `averageAge()` in `src/utils/studentUtils.js` to show function scope (it is still visible after the loop), in contrast with block-scoped `let` and `const`.

## Functions and application logic

`studentUtils.js` contains reusable functions with parameters and return values:
`addStudent`, `updateStudent`, `deleteStudent`, `validateStudent`, `filterStudents`, `generateStudentId`, `buildStudent`, `averageAge`, `countByStatus`, `loadStudents`, `saveStudents`.
Both normal functions and arrow functions are used. They return **new** arrays instead of changing the old one, because React state must not be mutated.

## React concepts used

- Functional components, JSX and props (data flows down; callbacks like `onEdit` flow up)
- `useState` for students, search text, filter, the open modal and the toast
- `useEffect` for saving to `localStorage`, Escape-key handling and toast timing
- `useCallback` for stable `onClose` handlers
- Controlled form inputs and event handlers (`onChange`, `onSubmit`, `onClick`)

**Modal state:** one state value, `modal`, is `null` (closed) or `{ type: "add" | "edit" | "delete", student }`. This guarantees only one modal is open at a time.

## Testing

**Automated** (`npm test`): add, edit, delete (including unknown ID), required-field validation, age limits, email format, duplicate email, search/filter, empty-list behavior, statistics and storage fallback.

**Manual checklist** (run through these in the browser after `npm run dev` and tick them off as evidence):

| Test | Expected result |
| --- | --- |
| Add valid student | Appears in table immediately, toast shown, ID auto-generated |
| Add with empty form | Error messages shown, nothing saved |
| Age 10 or 150, or 20.5 | Age error shown |
| Email `abc` | Email error shown |
| Duplicate email | Duplicate error shown |
| Edit student | Form pre-filled, changes appear immediately |
| Cancel / Escape / backdrop click | Modal closes, no changes saved |
| Delete then Cancel | Student kept |
| Delete then Confirm | Student removed |
| Delete everyone | "No students yet" empty state |
| Search with no match | "No matching students" message |
| Refresh the page | Data still there (`localStorage`) |
| Narrow the window below 760px | Rows turn into cards |

To reset the data, clear the site's `localStorage` in the browser developer tools.

## Deployment

1. Push this folder to GitHub (`node_modules` and `dist` are ignored by `.gitignore`).
2. On **Vercel** or **Netlify**, import the repository.
   - Build command: `npm run build`
   - Output directory: `dist`
3. Open the public URL and check that the app loads and add/edit/delete work.
4. Submit the GitHub repository URL and the live application URL.

## Author

Name: _your name here_ · Student ID: _your ID here_
