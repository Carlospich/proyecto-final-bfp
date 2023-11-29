import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert,Container} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom";


export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfimRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfimRef.current.value) {

            return setError('Las contraseñas no coinciden')
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch {
            setError('Fallo al registrarse')
        }
        setLoading(false)
    }


    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}
            >
                <div className="w-100" style={{ maxWidth: '550px' }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Registrarme</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required />
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label>Confirma tu contraseña</Form.Label>
                                    <Form.Control type="password" ref={passwordConfimRef} required />
                                </Form.Group>
                                <Button disabled={loading} className="w-100 mt-3" type="submit">Registrarme</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="W-100 text-center mt-2">
                        ¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
                    </div>
                </div>
            </Container>
        </>
    )
}