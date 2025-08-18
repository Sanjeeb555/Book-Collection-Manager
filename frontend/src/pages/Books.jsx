import React, { useState, useEffect } from "react";
import api from "../api"; // central axios instance

export default function Books() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      if (Array.isArray(res.data)) {
        setBooks(res.data.filter((b) => b && b.title));
      } else {
        setBooks([]);
      }
    } catch (err) {
      console.error("Error fetching books:", err);
      setBooks([]);
    }
  };

  const handleAddOrUpdateBook = async () => {
    if (!title || !author || !year || !genre) {
      alert("Please fill all fields!");
      return;
    }

    const bookData = { title, author, year, genre };

    try {
      if (editingId) {
        const res = await api.put(`/books/${editingId}`, bookData);
        setBooks(
          books.map((b) => (b && b._id === editingId ? res.data : b))
        );
        setEditingId(null);
      } else {
        const res = await api.post("/books", bookData);
        setBooks([...books, res.data]);
      }

      setTitle("");
      setAuthor("");
      setYear("");
      setGenre("");
    } catch (err) {
      console.error("Error saving book:", err);
    }
  };

  const handleEdit = (book) => {
    if (!book) return;
    setEditingId(book._id);
    setTitle(book.title || "");
    setAuthor(book.author || "");
    setYear(book.year || "");
    setGenre(book.genre || "");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await api.delete(`/books/${id}`);
      setBooks(books.filter((b) => b && b._id !== id));
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-teal-200 to-green-200 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          📚 Book Management
        </h1>

        {/* Form */}
        <div className="flex flex-wrap gap-4 mb-8">
          <input
            type="text"
            placeholder="Title"
            className="flex-1 border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author"
            className="flex-1 border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="number"
            placeholder="Year"
            className="w-28 border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <input
            type="text"
            placeholder="Genre"
            className="flex-1 border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <button
            onClick={handleAddOrUpdateBook}
            className={`${
              editingId
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white font-semibold px-5 py-3 rounded-lg transition`}
          >
            {editingId ? "Update Book" : "Add Book"}
          </button>
        </div>

        {/* Table */}
        {books.length === 0 ? (
          <p className="text-gray-500 text-center">No books found</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 text-gray-700">
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Author</th>
                <th className="p-3 border">Year</th>
                <th className="p-3 border">Genre</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map(
                (book) =>
                  book && (
                    <tr
                      key={book._id}
                      className="hover:bg-blue-50 transition text-center"
                    >
                      <td className="p-3 border">{book.title}</td>
                      <td className="p-3 border">{book.author}</td>
                      <td className="p-3 border">{book.year}</td>
                      <td className="p-3 border">{book.genre}</td>
                      <td className="p-3 border space-x-2">
                        <button
                          onClick={() => handleEdit(book)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(book._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
