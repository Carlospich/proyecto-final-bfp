import React, { useState, useEffect } from 'react';
import firebase from '../firebase';


import EditBook from './EditBook';
import NavbarLibrary from './NavbarLibrary';
import ListBooks from './ListBooks';

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

 
  

  return (
    <>
      <NavbarLibrary/>
      <div style={{ marginTop: '50px' }}>
      <ListBooks/>
      
      </div>
    </>
  );
};
export default Home;