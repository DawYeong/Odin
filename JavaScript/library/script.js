const BOOK_READ_CLASS = ["not-read", "read"];
const BOOK_READ_TEXT = ["Not read", "Read"];
const myLibrary = [];

const container = document.querySelector(".container");
const bookDialog = document.querySelector("dialog.book-prompt");
const bookForm = document.querySelector("form#book-form");
const bookSection = document.querySelector(".book-section");
const formError = document.querySelector("p.error");

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
  title.value = this.title;
  book.appendChild(title);

  const author = document.createElement("p");
  author.className = "book-author";
  author.textContent = this.author;
  author.value = this.author;
  book.appendChild(author);

  const pages = document.createElement("p");
  pages.className = "book-pages";
  pages.textContent = `${this.pages} page${this.pages > 1 ? "s" : ""}`;
  pages.value = this.pages;
  book.appendChild(pages);

  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";

  const read = document.createElement("button");
  read.className = BOOK_READ_CLASS[+this.read];
  read.innerText = BOOK_READ_TEXT[+this.read];
  read.value = this.read;
  read.type = "button";
  btnGroup.appendChild(read);

  const edit = document.createElement("button");
  edit.className = "edit";
  edit.innerText = "Edit";
  edit.type = "button";
  btnGroup.appendChild(edit);

  const remove = document.createElement("button");
  remove.className = "remove";
  remove.innerText = "Remove";
  remove.type = "button";
  btnGroup.appendChild(remove);

  book.appendChild(btnGroup);

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

const findBookIndex = (title, author) => {
  return myLibrary.findIndex(
    (book) => book.title === title && book.author === author
  );
};

const isBookContentSame = (book) => {
  return (
    book.title === bookForm[0].value &&
    book.author === bookForm[1].value &&
    book.page === bookForm[2].value &&
    book.read === bookForm[3].checked
  );
};

const addBookToLibrary = (title, author, pages, read) => {
  myLibrary.push(new Book(title, author, pages, read));
  displayBooks();
};

const editBook = (index) => {
  if (index === -1) return;
  const book = myLibrary[index];

  // check if form is the same as book content => if it is skip
  if (!isBookContentSame(book)) {
    book.title = bookForm[0].value;
    book.author = bookForm[1].value;
    book.pages = bookForm[2].value;
    book.read = bookForm[3].checked;
    displayBooks();
  }
};

const removeBookFromLibrary = (title, author) => {
  const bookIndex = findBookIndex(title, author);
  if (bookIndex != -1) {
    myLibrary.splice(bookIndex, 1);
    displayBooks();
  }
};

const toggleRead = (title, author, readElement) => {
  const bookIndex = findBookIndex(title, author);
  if (bookIndex != -1) {
    myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
    readElement.className = BOOK_READ_CLASS[+myLibrary[bookIndex].read];
    readElement.innerText = BOOK_READ_TEXT[+myLibrary[bookIndex].read];
    readElement.value = myLibrary[bookIndex].read;
  }
};

const openFormModal = () => {
  bookDialog.showModal();
};

const closeFormModal = () => {
  bookForm.reset();
  bookForm.setAttribute("type", "");
  bookForm.setAttribute("index", "");
  bookForm.children[0].textContent = "";
  formError.classList.remove("active");
  bookDialog.close();
};

const addForm = () => {
  bookForm.setAttribute("type", "add");
  bookForm.children[0].textContent = "Add Book";
  openFormModal();
};

const editForm = (title, author) => {
  const bookIndex = findBookIndex(title, author);

  if (bookIndex != -1) {
    bookForm.setAttribute("type", "edit");
    bookForm.setAttribute("index", bookIndex.toString());
    bookForm.children[0].textContent = "Edit Book";

    bookForm[0].value = myLibrary[bookIndex].title;
    bookForm[1].value = myLibrary[bookIndex].author;
    bookForm[2].value = myLibrary[bookIndex].pages;
    bookForm[3].checked = myLibrary[bookIndex].read;
    openFormModal();
  }
};

const handleAddSubmit = () => {
  if (findBookIndex(bookForm[0].value, bookForm[1].value) != -1) {
    // book exists, should not be able to add book
    // formError.textContent = MATCHING_BOOK_ERROR;
    formError.classList.add("active");
  } else {
    formError.classList.remove("active");
    addBookToLibrary(
      bookForm[0].value,
      bookForm[1].value,
      bookForm[2].value,
      bookForm[3].checked
    );
    closeFormModal();
  }
};

const handleEditSubmit = (index) => {
  const existingBookIndex = findBookIndex(bookForm[0].value, bookForm[1].value);

  if (existingBookIndex != index && existingBookIndex != -1) {
    formError.classList.add("active");
  } else {
    formError.classList.remove("active");
    editBook(index);
    closeFormModal();
  }
};

document.addEventListener("click", function (e) {
  if (e.target.type === "button") {
    switch (e.target.className) {
      case "add":
        addForm();
        break;
      case "cancel":
        closeFormModal();
        break;
      case "remove":
        removeBookFromLibrary(
          e.target.parentNode.parentNode.children[0].value,
          e.target.parentNode.parentNode.children[1].value
        );
        break;
      case "not-read":
      case "read":
        toggleRead(
          e.target.parentNode.parentNode.children[0].value,
          e.target.parentNode.parentNode.children[1].value,
          e.target
        );
        break;
      case "edit":
        editForm(
          e.target.parentNode.parentNode.children[0].value,
          e.target.parentNode.parentNode.children[1].value
        );
        break;
    }
  }
});

bookDialog.addEventListener("close", function (e) {
  formError.classList.remove("active");
  bookForm.reset();
});

bookForm.addEventListener("submit", function (e) {
  e.preventDefault();

  switch (bookForm.attributes["type"].value) {
    case "add":
      handleAddSubmit();
      break;
    case "edit":
      handleEditSubmit(parseInt(e.target.attributes["index"].value));
      break;
  }
});
