import React from 'react';

const BookList = ({ books, handleEdit, handleDelete }) => {
  return (
    <div>
      <h2>Lista de Libros</h2>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Genero</th>
            <th>Año de Publicación</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button onClick={() => handleEdit(book.id)}>Editar</button>
                <button onClick={() => handleDelete(book.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
