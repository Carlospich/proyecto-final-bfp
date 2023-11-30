import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { Container, Row, Card, Col, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function ListBooks() {
  const [books, setBooks] = useState([]);
  const [enlargedImage, setEnlargedImage] = useState('');
  const [searchText, setSearchText] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleAuthorInputChange = (event) => {
    setAuthorFilter(event.target.value);
  };

  useEffect(() => {
    db.collection('books').onSnapshot((snapshot) => {
      const filteredBooks = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          image: `data:image/${doc.data().imageType};base64,${doc.data().image}`,
        }))
        .filter((book) =>
          book.title.toLowerCase().includes(searchText.toLowerCase()) &&
          book.author.toLowerCase().includes(authorFilter.toLowerCase())
        );

      setBooks(filteredBooks);
    });
  }, [searchText, authorFilter]);

  const handleMouseEnter = (book) => {
    setEnlargedImage(book.id);
  };

  const handleMouseLeave = () => {
    setEnlargedImage('');
  };

  return (
    
    <Container className="w-100">
    
      <Row className="mb-3">
        <Col>
          <label >Buscar Por titulo:</label>
          <InputGroup>
            <FormControl
              placeholder="Titulo"
              onChange={handleSearchInputChange}
              value={searchText}
            />
            
          </InputGroup>
        </Col>
        <Col>
        <label>Buscar Por autor:</label><br></br>
          <InputGroup>
            <FormControl
              placeholder="Autor"
              onChange={handleAuthorInputChange}
              value={authorFilter}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row className="w-100">
        {books.map((book) => (
          <Col key={book.id} xs={12} sm={6} md={3} className="mb-3">
            <Link to={`/books/${book.id}`}>
              <Card
                style={{
                  transform: book.id === enlargedImage ? 'scale(1.2)' : 'scale(1)',
                  transition: 'transform 0.2s ease-in-out',
                  height: 'auto',
                  maxWidth: '200px',
                  zIndex: book.id === enlargedImage ? 1 : 0,
                }}
              >
                <div
                  onMouseEnter={() => handleMouseEnter(book)}
                  onMouseLeave={handleMouseLeave}
                  style={{ height: '100%' }}
                >
                  <Card.Img
                    src={book.image}
                    alt={book.title}
                    className="flex-grow-1"
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
                  />
                  <Card.Header>{book.title}</Card.Header>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
