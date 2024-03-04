import Book from "./Book";

export const BookShelf = ({ books, bookShelfTitle, bookShelf, updateBookShelf }) => {

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{bookShelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => {
            return (
              <li key={book.id}>
                <Book
                  book={book}
                  bookShelf={bookShelf}
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
