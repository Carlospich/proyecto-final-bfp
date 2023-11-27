import React, { useState } from 'react';
import { db } from '../firebase';

const AddBook = () => {
  const [newBook, setNewBook] = useState({ title: '', author: '' , genre:'', year:''});

  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleAddBook = () => {
    try {
      const booksRef = db.ref('books');
      booksRef.push(newBook); 
      setNewBook({ title: '', author: '' }); 
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div>
      <h2>Agregar Nuevo Libro</h2>
      <input
        type="text"
        placeholder="Título"
        name="title"
        value={newBook.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Autor"
        name="author"
        value={newBook.author}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Genero"
        name="author"
        value={newBook.author}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Año de publicación"
        name="author"
        value={newBook.author}
        onChange={handleInputChange}
      />
      <button onClick={handleAddBook}>Agregar Libro</button>
    </div>
  );
};

export default AddBook;
