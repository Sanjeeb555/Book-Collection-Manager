import React, { useContext } from "react";
import { BookContext } from "../context/BookContext";

export default function BookTable() {
  const { books, deleteBook, setCurrentBook } = useContext(BookContext);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Author</th>
            <th className="border border-gray-300 px-4 py-2">Genre</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{book.title}</td>
                <td className="border px-4 py-2">{book.author}</td>
                <td className="border px-4 py-2">{book.genre}</td>
                <td className="border px-4 py-2">{book.status}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => setCurrentBook(book)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBook(book._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No books found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
