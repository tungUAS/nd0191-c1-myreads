import { BookShelf } from "./BookShelf";

import { useNavigate } from 'react-router-dom';

const List = ({books,updateBookShelf}) => {

  let navigate = useNavigate();

    return (
        <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf
                books={books.filter(
                  (book) => book.shelf === "currentlyReading"
                )}
                bookShelf="currentlyReading"
                bookShelfTitle="Currently Reading"
                updateBookShelf={updateBookShelf}
              />
              <BookShelf
                books={books.filter((book) => book.shelf === "wantToRead")}
                bookShelf="wantToRead"
                bookShelfTitle="Want to Read"
                updateBookShelf={updateBookShelf}
              />
              <BookShelf
                books={books.filter((book) => book.shelf === "read")}
                bookShelf="read"
                bookShelfTitle="Read"
                updateBookShelf={updateBookShelf}
              />
            </div>
          </div>
          <div className="open-search">
            <a onClick={()=>{navigate("/search")}}>Add a book</a>
          </div>
        </div>
    </div>
    )
};

export default List;