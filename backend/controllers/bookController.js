import Book from "../models/Book.js";

export const getBooks = async (req, res) => {
  const books = await Book.find({ user: req.user });
  res.json(books);
};

export const addBook = async (req, res) => {
  const { title, author, genre, status } = req.body;
  const book = await Book.create({
    title,
    author,
    genre,
    status,
    user: req.user
  });
  res.json(book);
};

export const updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
};

export const deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
};
