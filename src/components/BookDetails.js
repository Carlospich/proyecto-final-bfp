import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { Card, Container, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import NavbarLibrary from './NavbarLibrary';
import { useNavigate } from 'react-router-dom';
import '../style/index.css'

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getDocumentFields(id);
  });

  async function getDocumentFields(id) {
    const docRef = db.collection('books').doc(id);

    try {
      const doc = await docRef.get();
      if (doc.exists) {
        const bookData = doc.data();
        setBook({
          id: doc.id,
          title: bookData.title,
          author: bookData.author,
          genre: bookData.genre,
          image: bookData.image,
          year: bookData.year,
        });
      } else {
        console.log('No such book exists');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  }
  const handleDeleteBook = async () => {
    try {
      await db.collection('books').doc(book.id).delete();
      alert('Libro eliminado');
      navigate('/'); // Redireccionar al listado de libros
    } catch (error) {
      console.error('Error eliminando el libro:', error);
    }
  };

  const handleEdit = async (field) => {
    const { title, author, genre, year } = book;
    let updatedBook = { ...book };

    if (field === 'title') {
      const newTitle = prompt('Enter new title:', title);
      if (newTitle !== null) {
        updatedBook.title = newTitle;
        updateDatabase(updatedBook);
      }
    } else if (field === 'author') {
      const newAuthor = prompt('Enter new author:', author);
      if (newAuthor !== null) {
        updatedBook.author = newAuthor;
        updateDatabase(updatedBook);
      }
    } else if (field === 'genre') {
      const newGenre = prompt('Enter new genre:', genre);
      if (newGenre !== null) {
        updatedBook.genre = newGenre;
        updateDatabase(updatedBook);
      }
    } else if (field === 'year') {
      const newYear = parseInt(prompt('Enter new year:', year));
      if (!isNaN(newYear)) {
        updatedBook.year = newYear;
        updateDatabase(updatedBook);
      }
    } else if (field === 'image') {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = async (e) => {
            const base64Image = e.target.result.split(',')[1];
            const updatedImage = {
              image: base64Image,
            };
            const updatedBookWithImage = { ...book, ...updatedImage };
            await updateDatabase(updatedBookWithImage);
          };
          reader.readAsDataURL(file);
        }
      });
      fileInput.click();
    }
  };

  const updateDatabase = async (updatedBook) => {
    try {
      await db.collection('books').doc(book.id).update(updatedBook);
      setBook(updatedBook);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <>
      <NavbarLibrary />
      <Container className="d-flex align-items-center justify-content-center mt-1" style={{ minHeight: '100vh' }}>
        <div className="w-100" style={{ maxWidth: '650px' }}>
          <Card className="d-flex flex-row-reverse">
            <Card.Body>
              <h2>
                {book.title}
                <Button variant="link" onClick={() => handleEdit('title')}>
                  <FaEdit />
                </Button>
              </h2>
              <p>
                Autor: {book.author}{' '}
                <Button variant="link" onClick={() => handleEdit('author')}>
                  <FaEdit />
                </Button>
              </p>
              <p>
                Año: {book.year}{' '}
                <Button variant="link" onClick={() => handleEdit('year')}>
                  <FaEdit />
                </Button>
              </p>
              <p>
                Género: {book.genre}{' '}
                <Button variant="link" onClick={() => handleEdit('genre')}>
                  <FaEdit />
                </Button>
              </p>
              <div className="d-flex justify-content-between"></div>

              <Button variant="danger" onClick={handleDeleteBook}>Eliminar</Button>
            </Card.Body>
            <div class="container2">
              <Card.Img class="img2" src={`data:image;base64,${book.image}`} alt={book.title} />
              <div class="overlay2"></div>
              <div class="button2">
                <Button variant="link" onClick={() => handleEdit('image')}>
                  <FaEdit style={{ fontSize: '24px' }} /> 
                </Button>
              </div>
            </div>


          </Card>
        </div>
      </Container>





    </>
  );
}

export default BookDetails;
