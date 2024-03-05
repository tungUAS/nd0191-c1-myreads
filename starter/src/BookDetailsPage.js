import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BookDetailsPage = ({ id, getBookById }) => {
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const book = await getBookById(id);
        console.log(book);
        setBook(book);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBook();
  }, []);

  return (
    <div>
      <Link to="/">Back</Link>
      <div className="book-container">
        <div className="book-image-container">
          <img
            className="book-image"
            src={
              book.imageLinks
                ? book.imageLinks.thumbnail || book.imageLinks.smallThumbnail
                : ""
            }
            alt="Book Cover"
          />
        </div>
        <div className="book-details">
          <p>{book.title}</p>
          <p>
            {book.authors && book.authors.length > 0
              ? book.authors.join(",")
              : "unknown"}
          </p>
          <p>
            {book.categories && book.categories.length > 0
              ? book.categories.join(",")
              : "unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
