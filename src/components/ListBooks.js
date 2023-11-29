import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { Container, Row, Card, Col } from 'react-bootstrap';

export default function ListBooks() {
  const [books, setBooks] = useState([]);
  const [enlargedImage, setEnlargedImage] = useState('');

  const handleMouseEnter = (book) => {
    setEnlargedImage(book.id);
  };

  const handleMouseLeave = () => {
    setEnlargedImage('');
  };

  useEffect(() => {
    db.collection('books').onSnapshot((snapshot) => {
      setBooks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          image: `data:image/${doc.data().imageType};base64,${doc.data().image}`,
        }))
      );
    });
  }, []);

  return (
    <Container className="w-100">
      <Row className="w-100 ">
        {books.map((book) => (
          <Col key={book.id} xs={12} sm={6} md={3} className="mb-3">
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
          </Col>
        ))}
      </Row>
    </Container>
  );
}
