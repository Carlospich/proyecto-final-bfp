import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import SearchBook from './SearchBook';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const searchResults = await SearchBook.searchByTitleOrAuthor(searchTerm);
      console.log('Resultados de la búsqueda:', searchResults);
      navigate(`/search?term=${searchTerm}`);
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };

  return (
    <div>
        <Link to="/AddBook">
            <Button>Agregar Libro</Button>
        </Link>
      <Form inline>
        <Form.Control
          type="text"
          placeholder="Buscar por título o autor"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch}>Buscar</Button>
      </Form>
    </div>
  );
}

export default NavigationBar;
