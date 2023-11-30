import React, { useState } from 'react';
import firebase from '../firebase';
import { Button } from 'react-bootstrap';

const EditBook = ({ book, closeModal }) => {
  const [editedBook, setEditedBook] = useState(book);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({ ...editedBook, [name]: value });
  };

  const handleUpdateBook = () => {
    const bookRef = firebase.database().ref(`books/${book.id}`);
    bookRef.update(editedBook)
      .then(() => {
        console.log('Libro actualizado correctamente');
        closeModal(); 
      })
      .catch((error) => {
        console.error('Error al actualizar el libro:', error);
      });
  };

  return (
    <div>
      <h2>Editar Libro</h2>
      <form>
        <input
          type="text"
          placeholder="Título"
          name="title"
          value={editedBook.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Autor"
          name="author"
          value={editedBook.author}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Genero"
          name="genre"
          value={editedBook.genre}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Año de publicación"
          name="year"
          value={editedBook.year}
          onChange={handleInputChange}
        />
        <Button onClick={handleUpdateBook}>Actualizar</Button>
        <Button onClick={closeModal}>Cancelar</Button>
      </form>
    </div>
  );
};

export default EditBook;