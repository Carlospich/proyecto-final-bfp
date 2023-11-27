import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import BookList from './BookList';
import AddBook from './AddBook';

const Home = () => {
  const [books, setBooks] = useState([]);

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

  const handleAddBook = (newBook) => {
    const booksRef = firebase.database().ref('books');
    booksRef.push(newBook);
  };

  const handleDeleteBook = (id) => {
    const bookRef = firebase.database().ref(`books/${id}`);
    bookRef.remove();
  };

  return (
    <div>
      <AddBook handleAdd={handleAddBook} />
      <BookList
        books={books}
        handleDelete={handleDeleteBook}
      />
    </div>
  );
};

export default Home;
