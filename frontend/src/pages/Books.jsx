import { useState, useEffect } from "react";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(savedBooks);
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { title, author, year, genre };

    if (editIndex !== null) {
      const updated = [...books];
      updated[editIndex] = newBook;
      setBooks(updated);
      setEditIndex(null);
    } else {
      setBooks([...books, newBook]);
    }

    setTitle("");
    setAuthor("");
    setYear("");
    setGenre("");
  };

  const handleEdit = (index) => {
    const book = books[index];
    setTitle(book.title);
    setAuthor(book.author);
    setYear(book.year);
    setGenre(book.genre);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = books.filter((_, i) => i !== index);
    setBooks(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Book Management</h1>

      {}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md w-full max-w-md">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Year"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          {editIndex !== null ? "Update Book" : "Add Book"}
        </button>
      </form>

      {}
      <div className="mt-6 w-full max-w-md">
        {books.length === 0 ? (
          <p className="text-gray-500 text-center">No books added yet</p>
        ) : (
          books.map((book, index) => (
            <div
              key={index}
              className="bg-white shadow p-3 rounded mb-2 flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold">{book.title}</h2>
                <p>{book.author} — {book.year} — {book.genre}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
