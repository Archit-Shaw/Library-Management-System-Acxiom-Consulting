#  Library Management System — Project README

##  Overview

This project is a simple Library Management System that I built using HTML, CSS, and JavaScript. The goal was to simulate how a real library works — managing books, memberships, issuing and returning books, and calculating fines.

The system supports two roles:

* **Admin** → can manage everything
* **User** → can only use transactions and view reports

---

##  What this project does

###  Login System

* Simple login with role-based redirection
* Admin and User land on different dashboards
* Password field is hidden

---

##  Admin Side

Admin has full control over the system:

* Add / Update Books
* Add / Update Memberships
* Manage Users
* Access all reports and transactions

---

##  User Side

User has limited access:

* Can search books
* Can issue and return books
* Can pay fines
* Can view reports

---

##  Modules Breakdown

###  Maintenance (Admin Only)

Used for managing core data:

* Add Membership
* Update Membership
* Add Book / Movie
* Update Book / Movie
* User Management

All forms include basic validation and required field checks.

---

###  Transactions

####  Book Availability

* User can search by book name or author
* At least one field must be selected
* Shows whether the book exists

---

####  Book Issue

* Book is selected from dropdown
* Author gets auto-filled
* Issue date cannot be in the past
* Return date is limited to 15 days
* Data is stored in localStorage

---

####  Return Book

* Only issued books are shown in dropdown
* Author is auto-filled
* Serial number is dynamic
* Dates are auto-filled
* Redirects to fine page after confirmation

---

####  Pay Fine

* Issue date and return date are auto-filled
* Return date is automatically calculated (+15 days)
* User selects actual return date
* Fine is calculated automatically (₹10 per day late)
* If fine exists → payment checkbox is required

---

###  Reports

Includes:

* List of Books
* Active Memberships
* Active Issues
* Overdue Returns
* Issue Requests

All reports are generated using data from localStorage.

---

##  Product Details (Categories)

This section shows book categories.

| Code Range | Category             |
| ---------- | -------------------- |
| SC(B/M)    | Science              |
| EC(B/M)    | Economics            |
| FC(B/M)    | Fiction              |
| CH(B/M)    | Children             |
| PD(B/M)    | Personal Development |

* Same view for Admin and User
* Static data (used as reference)

---

##  Data Storage

The project uses **localStorage** instead of a database.

Main keys used:

* `books` → stores book data
* `issuedBooks` → stores issued records
* `members` → membership data
* `products` → category data
* `role` → login role

---

## ⚙️ Tech Used

* HTML
* CSS
* JavaScript (Vanilla JS)

No frameworks or libraries are used.

---

##  How to Run

1. Open `index.html`
2. Login as Admin or User
3. Try:

   * Adding books
   * Issuing books
   * Returning books
   * Paying fine
4. Check reports

---

##  Final Note

This project focuses on understanding:

* How data flows between pages
* How to manage state using localStorage
* How to handle validations and user interactions

It’s a simple but complete implementation of a library system.

---

##  Author

Archit Shaw
