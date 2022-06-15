const titleEl = document.getElementById('title');
const authorEl = document.getElementById('author');
const isbnEl = document.getElementById('isbn');
const addBookBtn = document.querySelector('.add-book-btn');
const tbodyEl = document.querySelector('tbody');
const messagesContainer = document.querySelector('.messages-container');

class Store {
  static getBooks() {
    const books = JSON.parse(localStorage.getItem('books'));
    return books ? books : [];
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static deleteBook(isbn) {
    let books = Store.getBooks();
    books = books.filter(book => book.isbn !== isbn);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  static displayBooks() {
    tbodyEl.innerHTML = '';
    const books = Store.getBooks();
    books.forEach(book => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><button class="delete-book-btn"><i class="fa-solid fa-circle-xmark"></i></button></td>
      `;

      tbodyEl.appendChild(tr);
    });
  }

  // types: info, warning
  static showMessage(type, text) {
    const div = document.createElement('div');
    div.classList.add('message', type);
    div.innerText = text;
    messagesContainer.appendChild(div);
    setTimeout(() => div.remove(), 3000);
  }

  static clearForm() {
    titleEl.value = '';
    authorEl.value = '';
    isbnEl.value = '';
  }
}

// Delete book
tbodyEl.addEventListener('click', ev => {
  if (!ev.target.classList.contains('delete-book-btn')) {
    return;
  }

  const isbn = ev.target.parentElement.previousElementSibling.innerText;
  Store.deleteBook(isbn);
  UI.displayBooks();
  UI.showMessage('warning', `Deleted book with isbn ${isbn}`);
});

// Add book
addBookBtn.addEventListener('click', ev => {
  ev.preventDefault();
  const title = titleEl.value;
  const author = authorEl.value;
  const isbn = isbnEl.value;
  
  if (title === '' || author === '' || isbn === '') {
    UI.showMessage('warning', 'Please fill all fields.')
    return;
  }
  
  const newBook = new Book(title, author, isbn);
  Store.addBook(newBook);
  UI.displayBooks();
  UI.showMessage('info', 'Book added');
  UI.clearForm();
});

UI.displayBooks();