const BOOK_READ = ["Not read", "Read"];
const myLibrary = [];
const addBookButton = document.querySelector("button.add-btn");
const container = document.querySelector(".container");
const bookDialog = document.querySelector("dialog.book-prompt");
const addBookForm = document.querySelector("form#book-form");
const bookSection = document.querySelector(".book-section");
const formError = document.querySelector("span.error");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

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

const displayBooks = () => {
  // reset books
  bookSection.innerHTML = "";

  // add books
  myLibrary.forEach((book) => {
    bookSection.append(book.generateBookCard());
  });
};

const addBookToLibrary = (title, author, pages, read) => {
  myLibrary.push(new Book(title, author, pages, read));
  displayBooks();
};

const checkBookExists = (title, author) => {
  return (
    myLibrary.filter((book) => book.title === title && book.author === author)
      .length != 0
  );
};

const openFormModal = () => {
  bookDialog.showModal();
};

const closeFormModal = () => {
  bookDialog.close();
};

addBookButton.addEventListener("click", function (e) {
  openFormModal();
});

addBookForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.dir(e);
  if (checkBookExists(e.target[0].value, e.target[1].value)) {
    // book exists, should not be able to add book
    formError.textContent =
      "Book with matching title and author already exists!";
  } else {
    formError.textContent = "";
    addBookToLibrary(
      e.target[0].value,
      e.target[1].value,
      e.target[2].value,
      e.target[3].checked
    );
    closeFormModal();
    addBookForm.reset();
  }
});
