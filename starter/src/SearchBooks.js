import { useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

const SearchBooks = ({updateBookShelf}) => {
  const [query, setQuery] = useState("");
  const [searchBooks, setSearchBooks] = useState([]);

  const updateQuery = async (query) => {
    setQuery(query);
    if(query === "") 
        return setSearchBooks([]);
    const searchBooks = await BooksAPI.search(query);
    if (searchBooks.error) 
        return setSearchBooks([]);
    setSearchBooks(searchBooks);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchBooks.length > 0 && searchBooks.map((book) => {
            return (
              <li key={book.id}>
                <Book
                  book={book}
                  bookShelf={book.shelf}
                  updateBookShelf={updateBookShelf}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default SearchBooks;
