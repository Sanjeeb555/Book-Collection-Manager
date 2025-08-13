import React, { createContext, useState, useEffect } from "react";
import bookService from "../services/bookService";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);

  const fetchBooks = async () => {
    const data = await bookService.getBooks();
    setBooks(data);
  };

  const addBook = async (book) => {
    const newBook = await bookService.createBook(book);
    setBooks([...books, newBook]);
  };

  const editBook = async (updatedBook) => {
    const res = await bookService.updateBook(updatedBook._id, updatedBook);
    setBooks(books.map((b) => (b._id === res._id ? res : b)));
  };

  const deleteBook = async (id) => {
    await bookService.deleteBook(id);
    setBooks(books.filter((b) => b._id !== id));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider
      value={{
        books,
        addBook,
        editBook,
        deleteBook,
        currentBook,
        setCurrentBook
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
