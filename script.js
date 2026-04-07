// login function
const products = [
  { from: "SC(B/M)000001", to: "SC(B/M)999999", category: "Science" },
  { from: "EC(B/M)000001", to: "EC(B/M)999999", category: "Economics" },
  { from: "FC(B/M)000001", to: "FC(B/M)999999", category: "Fiction" },
  { from: "CH(B/M)000001", to: "CH(B/M)999999", category: "Children" },
  { from: "PD(B/M)000001", to: "PD(B/M)999999", category: "Personal Development" }
];

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (!user || !pass) {
    document.getElementById("error").innerText = "All fields required";
    return;
  }

  // Simple logic
  if (user === "adm" && pass === "adm") {
    localStorage.setItem("role", "admin"); 
    window.location.href = "adminDashboard.html";
  } else {
    localStorage.setItem("role", "user"); 
    window.location.href = "userDashboard.html";
  }
}
function goBack() {
  window.history.back();
}

function resetForm() {
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

function checkRole() {
  const role = localStorage.getItem("role");

  if (role === "user") {
    document.getElementById("maintenanceLink").style.display = "none";
    document.getElementById("pageTitle").innerText = "User Home Page";
  } else {
    document.getElementById("pageTitle").innerText = "Admin Home Page";
  }
}

// initial shows dumy data

function loadProducts() {
  const products = [
    { from: "SC(B/M)000001", to: "SC(B/M)999999", category: "Science" },
    { from: "EC(B/M)000001", to: "EC(B/M)999999", category: "Economics" },
    { from: "FC(B/M)000001", to: "FC(B/M)999999", category: "Fiction" },
    { from: "CH(B/M)000001", to: "CH(B/M)999999", category: "Children" },
    { from: "PD(B/M)000001", to: "PD(B/M)999999", category: "Personal Development" }
  ];

  let table = document.getElementById("productTable");

  if (!table) return;

  table.innerHTML = "";

  products.forEach(p => {
    table.innerHTML += `
      <tr>
        <td>${p.from}</td>
        <td>${p.to}</td>
        <td>${p.category}</td>
      </tr>
    `;
  });
}

//get books

function getBooks() {
  return (
    JSON.parse(localStorage.getItem("books")) || [
      { name: "Science", author: "Author A" },
      { name: "Economics", author: "Author B" },
      { name: "Fiction", author: "Author C" },
    ]
  );
}

// INIT RETURN PAGE
function initReturnPage() {
  let issued = JSON.parse(localStorage.getItem("issuedBook"));

  if (issued) {
    document.getElementById("book").value = issued.book || "";
    document.getElementById("author").value = issued.author || "";
    document.getElementById("issueDate").value = issued.issueDate || "";
    document.getElementById("returnDate").value = issued.returnDate || "";
  }
}

// RETURN BOOK FUNCTION
function returnBook() {
  let serial = document.getElementById("serial").value;
  let issueDate = document.getElementById("issueDate").value;
  let returnDate = document.getElementById("returnDate").value;

  let returns = JSON.parse(localStorage.getItem("returns")) || [];

  returns.push({
    serial,
    issueDate,
    returnDate,
  });

  localStorage.setItem("returns", JSON.stringify(returns));

  window.location.href = "fine.html";
}
// INIT FINE PAGE
function initFinePage() {
  let issued = JSON.parse(localStorage.getItem("issuedBook"));
  let returned = JSON.parse(localStorage.getItem("returnData"));

  if (!issued || !returned) return;

  document.getElementById("book").value = issued.book || "";
  document.getElementById("author").value = issued.author || "";
  document.getElementById("serial").value = returned.serial || "";
  document.getElementById("issueDate").value = issued.issueDate || "";
  document.getElementById("returnDate").value = issued.returnDate || "";

  // Default actual return date = today
  let today = new Date().toISOString().split("T")[0];
  document.getElementById("actualDate").value = today;

  calculateFine();
}

// CALCULATE FINE
function calculateFine() {
  let returnDate = new Date(document.getElementById("returnDate").value);
  let actualDate = new Date(document.getElementById("actualDate").value);

  let diff = Math.ceil((actualDate - returnDate) / (1000 * 60 * 60 * 24));

  let fine = diff > 0 ? diff * 10 : 0;

  document.getElementById("fine").value = fine;
}

// Recalculate when actual date changes
document.addEventListener("change", function (e) {
  if (e.target && e.target.id === "actualDate") {
    calculateFine();
  }
});

// PAY FINE
function payFine() {
  let fine = parseInt(document.getElementById("fine").value);
  let paid = document.getElementById("paid").checked;

  if (fine > 0 && !paid) {
    document.getElementById("error").innerText =
      "Please pay fine before completing";
    return;
  }

  alert("Transaction Completed Successfully");

  // Clear data after completion
  localStorage.removeItem("issuedBook");
  localStorage.removeItem("returnData");

  goHome();
}
//report data
function loadBooksReport() {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  let table = document.getElementById("booksTable");

  let rows = "";

  books.forEach((b, i) => {
    rows += `
      <tr>
        <td>${i + 1}</td>
        <td>${b.name || "-"}</td>
        <td>${b.author || "-"}</td>
        <td>${b.category || "General"}</td>
        <td>${b.status || "Available"}</td>
        <td>${b.cost || "500"}</td>
        <td>${b.date || new Date().toISOString().split("T")[0]}</td>
      </tr>
    `;
  });
  table.innerHTML = rows || `<tr><td colspan="7">No Data Available</td></tr>`;
}

function loadMoviesReport() {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  let table = document.getElementById("moviesTable");

  let rows = "";

  books.forEach((b, i) => {
    rows += `
      <tr>
        <td>${i + 1}</td>
        <td>${b.name}</td>
        <td>${b.author}</td>
        <td>${b.category}</td>
        <td>Available</td>
        <td>500</td>
        <td>2024</td>
      </tr>
    `;
  });

  table.innerHTML = rows || "<tr><td colspan='7'>No Data</td></tr>";
}

function loadMembers() {
  let members = JSON.parse(localStorage.getItem("members")) || [];
  let table = document.getElementById("memberTable");

  let rows = "";

  members.forEach((m) => {
    rows += `
      <tr>
        <td>${m.id || ""}</td>
        <td>${m.name || ""}</td>
        <td>${m.contact || ""}</td>
        <td>${m.address || ""}</td>
        <td>${m.aadhar || ""}</td>
        <td>${m.startDate || ""}</td>
        <td>${m.endDate || ""}</td>
        <td>${m.status || ""}</td>
        <td>${m.fine || ""}</td>
      </tr>
    `;
  });

  table.innerHTML = rows || `<tr><td colspan="9">No Data Available</td></tr>`;
}

function loadIssues() {
  let issues = JSON.parse(localStorage.getItem("issuedBooks")) || [];
  let table = document.getElementById("issuesTable");

  let rows = "";

  issues.forEach((i, index) => {
    rows += `
      <tr>
        <td>${index + 1}</td>
        <td>${i.book || ""}</td>
        <td>${i.memberId || ""}</td>
        <td>${i.issueDate || ""}</td>
        <td>${i.returnDate || ""}</td>
      </tr>
    `;
  });

  table.innerHTML = rows || `<tr><td colspan="5">No Active Issues</td></tr>`;
}

function loadOverdue() {
  let issues = JSON.parse(localStorage.getItem("issuedBooks")) || [];
  let table = document.getElementById("overdueTable");

  let today = new Date();
  let rows = "";

  issues.forEach((i, index) => {
    let returnDate = new Date(i.returnDate);

    if (today > returnDate) {
      let diff = Math.ceil((today - returnDate) / (1000 * 60 * 60 * 24));
      let fine = diff * 10;

      rows += `
        <tr>
          <td>${index + 1}</td>
          <td>${i.book || ""}</td>
          <td>${i.memberId || ""}</td>
          <td>${i.issueDate || ""}</td>
          <td>${i.returnDate || ""}</td>
          <td>${fine}</td>
        </tr>
      `;
    }
  });

  table.innerHTML = rows || `<tr><td colspan="6">No Overdue Records</td></tr>`;
}
function loadRequests() {
  let requests = JSON.parse(localStorage.getItem("requests")) || [];
  let table = document.getElementById("requestTable");

  let rows = "";

  requests.forEach((r) => {
    rows += `
      <tr>
        <td>${r.memberId || ""}</td>
        <td>${r.book || ""}</td>
        <td>${r.requestDate || ""}</td>
        <td>${r.fulfilledDate || ""}</td>
      </tr>
    `;
  });

  table.innerHTML = rows || `<tr><td colspan="4">No Requests Found</td></tr>`;
}

// INIT FUNCTION (runs on page load)
function initAddMembership() {
  const startDate = document.getElementById("startDate");

  if (startDate) {
    startDate.addEventListener("change", calculateEndDate);
  }

  document.querySelectorAll('input[name="dur"]').forEach((r) => {
    r.addEventListener("change", calculateEndDate);
  });
}

// CALCULATE END DATE
function calculateEndDate() {
  let start = document.getElementById("startDate").value;
  let duration = document.querySelector('input[name="dur"]:checked').value;

  if (!start) return;

  let date = new Date(start);
  date.setMonth(date.getMonth() + parseInt(duration));

  document.getElementById("endDate").value = date.toISOString().split("T")[0];
}

// ADD MEMBER

// INIT FUNCTION (runs on page load)
function initAddMembership() {
  const startDate = document.getElementById("startDate");

  if (startDate) {
    startDate.addEventListener("change", calculateEndDate);
  }

  document.querySelectorAll('input[name="dur"]').forEach((r) => {
    r.addEventListener("change", calculateEndDate);
  });
}

// CALCULATE END DATE
function calculateEndDate() {
  let start = document.getElementById("startDate").value;
  let duration = document.querySelector('input[name="dur"]:checked').value;

  if (!start) return;

  let date = new Date(start);
  date.setMonth(date.getMonth() + parseInt(duration));

  document.getElementById("endDate").value = date.toISOString().split("T")[0];
}

// ADD MEMBER
function addMember() {
  let name = document.getElementById("name").value;
  let contact = document.getElementById("contact").value;
  let address = document.getElementById("address").value;
  let aadhar = document.getElementById("aadhar").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;

  if (!name || !contact || !address || !aadhar || !startDate || !endDate) {
    document.getElementById("error").innerText = "All fields are required";
    return;
  }

  let members = JSON.parse(localStorage.getItem("members")) || [];

  members.push({
    id: "M" + (members.length + 1),
    name,
    contact,
    address,
    aadhar,
    startDate,
    endDate,
    status: "Active",
    fine: 0,
  });

  localStorage.setItem("members", JSON.stringify(members));

  alert("Membership Added Successfully");

  goBack();
}

// goHome redirect function
function goHome() {
  const role = localStorage.getItem("role");

  if (role === "admin") {
    window.location.href = "adminDashboard.html";
  } else {
    window.location.href = "userDashboard.html";
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

function goTo(page) {
  window.location.href = page;
}

// Add Book
function addBook() {
  const name = document.getElementById("bookName").value.trim();
  const author = document.getElementById("author").value.trim();
  const date = document.getElementById("date").value;
  const qty = document.getElementById("qty").value;
  const error = document.getElementById("bookError");

  if (!name || !author || !date || !qty) {
    error.innerText = "All fields are required";
    return;
  }

  let books = JSON.parse(localStorage.getItem("books")) || [];

  books.push({
    id: "B" + (books.length + 1),
    name,
    author,
    date,
    qty,
    status: "Available",
  });

  localStorage.setItem("books", JSON.stringify(books));

  alert("Book Added Successfully");

  // Clear form
  document.getElementById("bookName").value = "";
  document.getElementById("author").value = "";
  document.getElementById("date").value = "";
  document.getElementById("qty").value = 1;
  error.innerText = "";
}

// Add Membership
function addMembership() {
  const name = document.getElementById("memberName").value;

  if (!name) {
    document.getElementById("memberError").innerText = "All fields required";
    return;
  }

  alert("Membership Added");
}

// Search Book

function updateBook() {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  let name = document.getElementById("bookName").value;

  let index = books.findIndex((b) => b.name === name);

  if (index === -1) {
    document.getElementById("error").innerText = "Book not found";
    return;
  }

  books[index].status = document.getElementById("status").value;
  books[index].date = document.getElementById("date").value;

  localStorage.setItem("books", JSON.stringify(books));

  alert("Updated Successfully");
  goBack();
}
function loadBookDetails() {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  let name = document.getElementById("bookName").value;

  let book = books.find((b) => b.name === name);

  if (!book) return;

  document.getElementById("serial").value = book.id || "";
  document.getElementById("status").value = book.status || "Available";
  document.getElementById("date").value = book.date || "";
}

// INIT PAGE
function initUpdateMembership() {
  const memberIdInput = document.getElementById("memberId");

  memberIdInput.addEventListener("change", loadMemberDetails);
}

// LOAD MEMBER DETAILS
function loadMemberDetails() {
  let id = document.getElementById("memberId").value;
  let members = JSON.parse(localStorage.getItem("members")) || [];

  let member = members.find((m) => m.id === id);

  if (!member) {
    document.getElementById("error").innerText = "Member not found";
    return;
  }

  document.getElementById("startDate").value = member.startDate;
  document.getElementById("endDate").value = member.endDate;
}

// UPDATE MEMBERSHIP
function updateMembership() {
  let id = document.getElementById("memberId").value;
  let action = document.querySelector('input[name="action"]:checked').value;
  let extension = document.querySelector('input[name="ext"]:checked').value;

  let members = JSON.parse(localStorage.getItem("members")) || [];

  let index = members.findIndex((m) => m.id === id);

  if (index === -1) {
    document.getElementById("error").innerText = "Member not found";
    return;
  }

  if (action === "remove") {
    members[index].status = "Inactive";
  } else {
    let currentEnd = new Date(members[index].endDate);
    currentEnd.setMonth(currentEnd.getMonth() + parseInt(extension));

    members[index].endDate = currentEnd.toISOString().split("T")[0];
  }

  localStorage.setItem("members", JSON.stringify(members));

  alert("Membership Updated Successfully");
  goBack();
}

function initSearchPage() {
  let books = JSON.parse(localStorage.getItem("books")) || [];

  console.log("Books:", books);

  let bookDropdown = document.getElementById("bookName");
  let authorDropdown = document.getElementById("author");

  if (!bookDropdown || !authorDropdown) {
    console.error("Dropdown elements not found");
    return;
  }

  // Reset dropdowns
  bookDropdown.innerHTML = '<option value="">-- Select Book --</option>';
  authorDropdown.innerHTML = '<option value="">-- Select Author --</option>';

  let authorsSet = new Set();

  books.forEach((b) => {
    // Add book
    let bookOpt = document.createElement("option");
    bookOpt.value = b.name;
    bookOpt.textContent = b.name;
    bookDropdown.appendChild(bookOpt);

    // Add author
    if (b.author) {
      authorsSet.add(b.author);
    }
  });

  // Add unique authors
  authorsSet.forEach((a) => {
    let authOpt = document.createElement("option");
    authOpt.value = a;
    authOpt.textContent = a;
    authorDropdown.appendChild(authOpt);
  });
}
function searchBook() {
  let book = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;

  if (!book && !author) {
    document.getElementById("error").innerText = "Select at least one field";
    return;
  }

  let books = JSON.parse(localStorage.getItem("books")) || [];

  let results = books.filter((b) => {
    return (!book || b.name === book) && (!author || b.author === author);
  });

  if (results.length > 0) {
    document.getElementById("result").innerHTML =
      `<p style="color:green;">Book Available (${results.length} found)</p>`;
  } else {
    document.getElementById("result").innerHTML =
      `<p style="color:red;">No Book Found </p>`;
  }
}
function initIssuePage() {
  let dropdown = document.getElementById("book");

  if (!dropdown) return;

  console.log("initIssuePage running");

  let books = JSON.parse(localStorage.getItem("books")) || [];

  dropdown.innerHTML = '<option value="">-- Select Book --</option>';

  books.forEach(b => {
    let option = document.createElement("option");
    option.value = b.name;
    option.textContent = b.name;
    dropdown.appendChild(option);
  });
}
function fillAuthor() {

  let books = JSON.parse(localStorage.getItem("books")) || [];
  let selected = document.getElementById("book").value;
  let book = books.find(b => b.name === selected);

  if (book) {
    document.getElementById("author").value = book.author || "";
  } else {
    document.getElementById("author").value = "";
  }
}
// INIT
function initUserManagement() {
  document.querySelectorAll('input[name="mode"]').forEach((r) => {
    r.addEventListener("change", resetUserForm);
  });
}

function initReturnPage() {
  let issues = JSON.parse(localStorage.getItem("issuedBooks")) || [];

  let bookDropdown = document.getElementById("book");

  if (!bookDropdown) return;

  bookDropdown.innerHTML = '<option value="">-- Select Book --</option>';

  // Unique books
  let uniqueBooks = [...new Set(issues.map((i) => i.book))];

  uniqueBooks.forEach((book) => {
    let option = document.createElement("option");
    option.value = book;
    option.textContent = book;
    bookDropdown.appendChild(option);
  });
}
function fillReturnDetails() {
    
  console.log(" fillReturnDetails called");

  let issues = JSON.parse(localStorage.getItem("issuedBooks")) || [];
  console.log("All issues:", issues);

  let selectedBook = document.getElementById("book").value;
  console.log("Selected book:", selectedBook);

  let serialDropdown = document.getElementById("serial");

  serialDropdown.innerHTML = '<option value="">-- Select Serial --</option>';

  let filtered = issues.filter((i) => i.book === selectedBook);

  if (filtered.length === 0) return;

  // Save globally
  window.selectedIssues = filtered;

  // Auto-fill author
  document.getElementById("author").value = filtered[0].author || "";

  // Populate serial dropdown
  filtered.forEach((item, index) => {
    let option = document.createElement("option");

    option.value = index; 
    option.textContent = "S" + (index + 1);

    serialDropdown.appendChild(option);
  });
}
function fillDates() {
  let index = document.getElementById("serial").value;

  if (index === "" || !window.selectedIssues) return;

  let data = window.selectedIssues[index];

  document.getElementById("issueDate").value = data.issueDate || "";
  document.getElementById("returnDate").value = data.returnDate || "";
}
function returnBook() {
  let serial = document.getElementById("serial").value;
  let issueDate = document.getElementById("issueDate").value;
  let returnDate = document.getElementById("returnDate").value;

  let error = document.getElementById("error");

  if (!serial || !issueDate || !returnDate) {
    error.innerText = "Please fill all required fields";
    return;
  }

  // Save return info
  localStorage.setItem(
    "returnData",
    JSON.stringify({
      serial,
      issueDate,
      returnDate,
    }),
  );

  // Redirect to fine page
  window.location.href = "fine.html";
}

// RESET FORM
function resetUserForm() {
  document.getElementById("username").value = "";
  document.getElementById("active").checked = false;
  document.getElementById("admin").checked = false;
  document.getElementById("error").innerText = "";
}

// HANDLE USER (ADD / UPDATE)
function handleUser() {
  let mode = document.querySelector('input[name="mode"]:checked').value;
  let name = document.getElementById("username").value.trim();
  let isActive = document.getElementById("active").checked;
  let isAdmin = document.getElementById("admin").checked;

  if (!name) {
    document.getElementById("error").innerText = "Name is required";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (mode === "new") {
    // ADD USER
    let exists = users.find((u) => u.name === name);

    if (exists) {
      document.getElementById("error").innerText = "User already exists";
      return;
    }

    users.push({
      id: "U" + (users.length + 1),
      name,
      active: isActive,
      admin: isAdmin,
    });

    alert("User Added Successfully");
  } else {
    // UPDATE USER
    let index = users.findIndex((u) => u.name === name);

    if (index === -1) {
      document.getElementById("error").innerText = "User not found";
      return;
    }

    users[index].active = isActive;
    users[index].admin = isAdmin;

    alert("User Updated Successfully");
  }

  localStorage.setItem("users", JSON.stringify(users));

  goBack();
}

// Issue Book
function issueBook() {

  let book = document.getElementById("book").value;
  let author = document.getElementById("author").value;
  let issueDate = document.getElementById("issueDate").value;
  let returnDate = document.getElementById("returnDate").value;

  console.log({ book, author, issueDate, returnDate }); // DEBUG

  let error = document.getElementById("error");

  if (!book) {
    error.innerText = "Select a book";
    return;
  }

  if (!author) {
    error.innerText = "Author not loaded";
    return;
  }

  if (!issueDate || !returnDate) {
    error.innerText = "Select dates";
    return;
  }

  // SAVE DATA
  let issuedBooks = JSON.parse(localStorage.getItem("issuedBooks")) || [];

  issuedBooks.push({
    book,
    author,
    memberId: "M1",
    issueDate,
    returnDate
  });

  localStorage.setItem("issuedBooks", JSON.stringify(issuedBooks));

  console.log("✅ Saved:", issuedBooks);

  alert("Book Issued Successfully");
}

// Fine
window.onload = function () {
  if (document.getElementById("fineAmount")) {
    document.getElementById("fineAmount").innerText = "100";
  }
};

function payFine() {
  const paid = document.getElementById("finePaid").checked;
  const fine = 100;

  if (fine > 0 && !paid) {
    document.getElementById("fineError").innerText = "Please pay fine";
    return;
  }

  alert("Transaction Complete");
  window.location.href = "dashboard.html";
}
document.addEventListener("DOMContentLoaded", function () {

  // Search Page
  if (document.getElementById("bookName")) {
    console.log("Search Page Loaded");
    initSearchPage();
  }

  // Issue Page
  if (document.getElementById("book")) {
    console.log("Issue Page Loaded");
    initIssuePage();
  }

});
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("productTable")) {
    loadProducts();
  }
});