import { useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

const SearchBooks = ({updateBookShelf}) => {
  const [query, setQuery] = useState("");
  const [searchBooks, setSearchBooks] = useState([]);
  const [noBooksFound, setNoBooksFound] = useState(false);

  const updateQuery = async (query) => {
    setQuery(query);
    if (query === "") {
      setSearchBooks([]);
      setNoBooksFound(true);
      return;
    }
    const searchResult = await BooksAPI.search(query);
    const booksOnShelf = await BooksAPI.getAll();
    if (searchResult.error) {
      setSearchBooks([]);
      setNoBooksFound(true);
      return;
    } else {
      setSearchBooks(applyShelfToSearchBooks(searchResult, booksOnShelf));
      setNoBooksFound(false);
      return;
    }
  };

  const applyShelfToSearchBooks = (searchBooks, booksOnShelf) => {
    return searchBooks.map((searchBook) => {
      const bookOnShelf = booksOnShelf.find((book) => book.id === searchBook.id);
      if (bookOnShelf) {
        searchBook.shelf = bookOnShelf.shelf;
      } else {
        searchBook.shelf = "none";
      }
      return searchBook;
    });
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
          {noBooksFound && query !== "" && <h2>No books found</h2>}
          {!noBooksFound && searchBooks.length > 0 && searchBooks.map((book) => {
            console.log(book.shelf);
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
