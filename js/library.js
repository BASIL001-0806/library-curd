const defaultBooks = [
  { bookId: "B001", title: "Clean Code", author: "Robert C. Martin", category: "Programming", quantity: 5 },
  { bookId: "B002", title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Programming", quantity: 4 },
  { bookId: "B003", title: "Introduction to Algorithms", author: "Cormen", category: "Computer Science", quantity: 3 },
  { bookId: "B004", title: "Atomic Habits", author: "James Clear", category: "Self Help", quantity: 6 },
  { bookId: "B005", title: "Deep Work", author: "Cal Newport", category: "Productivity", quantity: 2 },
  { bookId: "B006", title: "1984", author: "George Orwell", category: "Fiction", quantity: 4 },
  { bookId: "B007", title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Finance", quantity: 5 },
  { bookId: "B008", title: "Think Like a Programmer", author: "V. Anton Spraul", category: "Programming", quantity: 3 },
  { bookId: "B009", title: "Cyber Security Basics", author: "Chuck Easttom", category: "Security", quantity: 2 },
  { bookId: "B010", title: "Python Crash Course", author: "Eric Matthes", category: "Programming", quantity: 6 }
];

// Load once
let books = JSON.parse(localStorage.getItem("books"));
if (!books) {
  books = defaultBooks;
  localStorage.setItem("books", JSON.stringify(books));
}

const form = document.getElementById("bookForm");
const table = document.getElementById("bookTable");
const search = document.getElementById("search");

function renderBooks(data = books) {
  table.innerHTML = "";
  data.forEach((b, i) => {
    table.innerHTML += `
      <tr>
        <td>${b.bookId}</td>
        <td>${b.title}</td>
        <td>${b.author}</td>
        <td>${b.category}</td>
        <td>${b.quantity}</td>
        <td>
          <button class="edit" onclick="editBook(${i})">Edit</button>
          <button class="delete" onclick="deleteBook(${i})">Delete</button>
        </td>
      </tr>`;
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const index = document.getElementById("index").value;
  const book = {
    bookId: bookId.value,
    title: title.value,
    author: author.value,
    category: category.value,
    quantity: quantity.value
  };

  if (index === "") books.push(book);
  else books[index] = book;

  localStorage.setItem("books", JSON.stringify(books));
  form.reset();
  index.value = "";
  renderBooks();
});

function editBook(i) {
  const b = books[i];
  index.value = i;
  bookId.value = b.bookId;
  title.value = b.title;
  author.value = b.author;
  category.value = b.category;
  quantity.value = b.quantity;
}

function deleteBook(i) {
  books.splice(i, 1);
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
}

search.addEventListener("input", () => {
  const v = search.value.toLowerCase();
  renderBooks(
    books.filter(b =>
      b.title.toLowerCase().includes(v) ||
      b.author.toLowerCase().includes(v)
    )
  );
});

renderBooks();
