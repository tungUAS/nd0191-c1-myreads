import { useState } from "react";
import PropTypes from "prop-types";

const Book = ({ book, bookShelf, updateBookShelf }) => {
  const shelves = [
    {
      id: "1",
      shelfValue: "currentlyReading",
      shelfNameDisplay: "Currently Reading",
    },
    { id: "2", shelfValue: "wantToRead", shelfNameDisplay: "Want to Read" },
    { id: "3", shelfValue: "read", shelfNameDisplay: "Read" },
    { id: "4", shelfValue: "none", shelfNameDisplay: "None" },
  ];
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
            backgroundImage: book.imageLinks.thumbnail
              ? `url(${book.imageLinks.thumbnail})`
              : "",
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
            {shelves.map((shelf) => (
              <option key={shelf.id} value={shelf.shelfValue}>
                {shelf.shelfNameDisplay}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {book.authors && book.authors.length > 0
          ? book.authors.join(",")
          : "unknown"}
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  bookShelf: PropTypes.string,
  updateBookShelf: PropTypes.func.isRequired,
};

export default Book;
