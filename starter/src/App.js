import "./App.css";
import { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";
import { Routes, Route } from 'react-router-dom';
import List from "./List";
import SearchBooks from "./SearchBooks";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        const books = await BooksAPI.getAll();
        console.log(books);
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

  return (
    <Routes>
      <Route path="/" element={<List books={books} updateBookShelf={updateBookShelf} />} />
      <Route path="/search" element={<SearchBooks updateBookShelf={updateBookShelf} />} />
    </Routes>
  );
}

export default App;

