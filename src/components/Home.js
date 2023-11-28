import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import BookList from './BookList';
import NavigationBar from './NavigationBar';
import EditBook from './EditBook';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); 

  useEffect(() => {
    const booksRef = firebase.database().ref('books');

    booksRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const bookList = Object.entries(data).map(([id, book]) => ({ id, ...book }));
        setBooks(bookList);
      }
    });

    return () => {
      firebase.database().ref('books').off();
    };
  }, []);

  const handleEditBook = (book) => {
    setSelectedBook(book); 
  };

  const handleDeleteBook = (id) => {
    const bookRef = firebase.database().ref(`books/${id}`);
    bookRef.remove();
  };

  return (
    <div>
      <NavigationBar />
      <BookList
        books={books}
        handleEdit={handleEditBook}
        handleDelete={handleDeleteBook}
      />
      {selectedBook && (
        <EditBook
          book={selectedBook}
          closeModal={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
};
export default Home;