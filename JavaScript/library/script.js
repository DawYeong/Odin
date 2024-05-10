const BOOK_READ = ["Not read", "Read"];
const myLibrary = [
  new Book("test", "test", 10, false),
  new Book("test1", "test1", 10, true),
];
const addBookButton = document.querySelector("button.add-btn");
const container = document.querySelector(".container");
const bookDialog = document.querySelector("dialog.book-prompt");
const addBookForm = document.querySelector("form#book-form");
const bookSection = document.querySelector(".book-section");

console.log(addBookForm);
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Book.prototype.info = function () {
//   return `${this.title} by ${this.author}, ${this.pages} pages, ${
//     this.read ? "read" : "not read yet"
//   }`;
// };

Book.prototype.generateBookCard = function () {
  const book = document.createElement("div");
  book.className = "book";

  const title = document.createElement("p");
  title.className = "book-title";
  title.textContent = this.title;
  book.appendChild(title);

  const author = document.createElement("p");
  author.className = "book-author";
  author.textContent = this.author;
  book.appendChild(author);

  const pages = document.createElement("p");
  pages.className = "book-pages";
  pages.textContent = `${this.pages} page${this.pages > 1 ? "s" : ""}`;
  book.appendChild(pages);

  const read = document.createElement("button");
  read.className = BOOK_READ[+this.read];
  read.innerText = BOOK_READ[+this.read];
  book.appendChild(read);

  const remove = document.createElement("button");
  remove.className = "remove";
  remove.innerText = "Remove";
  book.appendChild(remove);

  return book;
};

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

const displayBooks = () => {
  // reset books
  bookSection.innerHTML = "";

  // add books
  myLibrary.forEach((book) => {
    bookSection.append(book.generateBookCard());
  });
};

addBookButton.addEventListener("click", function (e) {
  bookDialog.showModal();
});

addBookForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.dir(e);
});
