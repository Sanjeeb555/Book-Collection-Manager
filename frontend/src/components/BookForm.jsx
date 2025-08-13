import React, { useState, useContext, useEffect } from "react";
import { BookContext } from "../context/BookContext";

export default function BookForm() {
  const { addBook, editBook, currentBook, setCurrentBook } = useContext(BookContext);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    status: "Unread"
  });

  useEffect(() => {
    if (currentBook) {
      setFormData(currentBook);
    }
  }, [currentBook]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentBook) {
      editBook(formData);
    } else {
      addBook(formData);
    }

    setFormData({ title: "", author: "", genre: "", status: "Unread" });
    setCurrentBook(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">{currentBook ? "Edit Book" : "Add New Book"}</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        required
      />

      <input
        type="text"
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        required
      />

      <input
        type="text"
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        required
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      >
        <option value="Unread">Unread</option>
        <option value="Read">Read</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {currentBook ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
}
