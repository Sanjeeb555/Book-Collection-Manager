import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/books`;

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`
});

const getBooks = async () => {
  try {
    const res = await axios.get(API_URL, { headers: getAuthHeaders() });
    return res.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

const createBook = async (bookData) => {
  try {
    const res = await axios.post(API_URL, bookData, {
      headers: getAuthHeaders()
    });
    return res.data;
  } catch (error) {
    console.error("Error creating book:", error);
    return null;
  }
};

const updateBook = async (id, bookData) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, bookData, {
      headers: getAuthHeaders()
    });
    return res.data;
  } catch (error) {
    console.error("Error updating book:", error);
    return null;
  }
};

const deleteBook = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeaders()
    });
  } catch (error) {
    console.error("Error deleting book:", error);
  }
};

export default {
  getBooks,
  createBook,
  updateBook,
  deleteBook
};
