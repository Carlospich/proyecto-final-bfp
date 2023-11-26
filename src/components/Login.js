import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuth } from '../contexts/AuthContext'
import { Link } from "react-router-dom";


export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
        } catch {
            setError('Tu cuenta no pudo ser creada')
        }
        setLoading(false)
    }
  

return (
    <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
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
                    
                    <Button disabled={loading} className="w-100 mt-3" type="submit">Iniciar Sesión</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="W-100 text-center mt-2">
            ¿No tienes una cuenta aun? <Link to="/signup">Regístrate</Link>
        </div>
    </>
)
}