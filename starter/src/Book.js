import { useState } from "react";

const Book = ({ book, bookShelf, updateBookShelf }) => { 
  const [shelfSelected, setShelfSelected] = useState(bookShelf);

  const handleShelfChange = (event) => {
    setShelfSelected(event.target.value);
    updateBookShelf(book, event.target.value);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks.thumbnail})` || "",
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            value={shelfSelected !== undefined ? shelfSelected : ""}
            onChange={handleShelfChange}
          >
            <option value="" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors && book.authors.length > 0 ? book.authors[0] : "unknown"}</div>
    </div>
  );
};

export default Book;
