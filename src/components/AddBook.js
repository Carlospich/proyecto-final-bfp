import React, { useState } from 'react';
import { db } from '../firebase';
import "bootstrap/dist/css/bootstrap.min.css"
import { Button } from 'react-bootstrap'

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
        name="genre"
        value={newBook.genre}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Año de publicación"
        name="year"
        value={newBook.year}
        onChange={handleInputChange}
      />
      <Button className="w-100 mt-3" onClick={handleAddBook}>Agregar Libro</Button>
    </div>
  );
};

export default AddBook;
