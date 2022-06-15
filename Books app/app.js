const addBookBtn = document.querySelector('.add-book-btn');

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
