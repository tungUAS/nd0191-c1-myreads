import "./App.css";
import { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";
import { Routes, Route } from 'react-router-dom';
import List from "./List";
import SearchBooks from "./SearchBooks";
import BookDetailsPage from "./BookDetailsPage";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        const books = await BooksAPI.getAll();
        setBooks(books);
      } catch (error) {
        console.error(error);
      }
    };

    getAllBooks();
  }, []);

  const updateBookShelf = async (updatedBook, updatedShelf) => {
    updatedBook.shelf = updatedShelf;

    await BooksAPI.update(updatedBook, updatedShelf);

    setBooks(
      [...books.filter((book) => book.id !== updatedBook.id), updatedBook]
    );

  };

  const getBookById = async (id) => {
    return await BooksAPI.get(id);
  };

  return (
    <Routes>
      <Route path="/" element={<List books={books} updateBookShelf={updateBookShelf} />} />
      <Route path="/search" element={<SearchBooks updateBookShelf={updateBookShelf} />} />
      {books.map((book) => (
        <Route key={book.id} path={`/book/${book.id}`} element={<BookDetailsPage getBookById={getBookById} id={book.id} />} />
      ))}
    </Routes>
  );
}

export default App;

