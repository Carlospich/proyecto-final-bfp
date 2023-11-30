import React, { useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {Link} from 'react-router-dom'
import { Button, Card, Form, Alert, Container,} from 'react-bootstrap'
import { useDatabase } from '../contexts/DatabaseContext';
import { useNavigate } from 'react-router-dom/dist';
import NavbarLibrary from './NavbarLibrary';
const AddBook = () => {
    const titleRef = useRef()
    const authorRef = useRef()
    const genreRef = useRef()
    const yearRef = useRef()
    const imageRef = useRef()
    const [error, setError] = useState('')
    const { addBook } = useDatabase()
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const imageFile = imageRef.current.files[0];
            const fileSize = imageFile.size * 1.33

            if (fileSize > 1048576) {
                setError('La imagen excede el tamaño máximo de 750kb');
                setMessage('')
                return;
            }

            const reader = new FileReader();
            reader.onload = async (e) => {
                const base64Image = e.target.result.split(',')[1];
                await addBook(titleRef.current.value, authorRef.current.value, genreRef.current.value, yearRef.current.value, base64Image);
            };
            reader.readAsDataURL(imageFile);
            setError('')
            setMessage('Libro subido con exito')

        } catch {
            setError('Fallo al añadir libro');
            setMessage('')
        }

    }


    return (
        <><NavbarLibrary></NavbarLibrary>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}
            >
                <div className="w-100" style={{ maxWidth: '550px' }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Agregar nuevo libro</h2>
                            {message && <Alert variant="success">{message}</Alert>}
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="title">
                                    <Form.Label>Titulo</Form.Label>
                                    <Form.Control type="text" ref={titleRef} required />
                                </Form.Group>
                                <Form.Group id="author">
                                    <Form.Label>Autor</Form.Label>
                                    <Form.Control type="text" ref={authorRef} required />
                                </Form.Group>
                                <Form.Group id="genre">
                                    <Form.Label>Género literario</Form.Label>
                                    <Form.Control type="text" ref={genreRef} required />
                                </Form.Group>
                                <Form.Group id="year">
                                    <Form.Label>Año de publicación</Form.Label>
                                    <Form.Control type="number" min="0" max="2100" ref={yearRef} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Foto de portada</Form.Label>
                                    <Form.Control type="file" multiple={false} ref={imageRef} required />
                                </Form.Group>
                                <Button className="w-100 mt-3" type="submit">Agregar Libro</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="W-100 text-center mt-2">
                        ¿No tienes una cuenta aún? <Link to="/">Volver</Link>
                    </div>

                </div>

            </Container>
        </>
    );

};

export default AddBook;