import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert,Container } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuth } from '../contexts/AuthContext'
import { Link , useNavigate} from "react-router-dom";


export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/Home")
        } catch {
            setError('Fallo al iniciar sesión')
        }
        setLoading(false)
    }
  

return (
    <><Container className="d-flex align-items-center justify-content-center mt-1" style={{ minHeight: "100vh" }}
    >
      <div className="w-100 mt-1" style={{ maxWidth: '550px' }}>
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
                <div className="w-100 text-center mt-3">
                    <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
                </div>
            </Card.Body>
        </Card>
        <div className="W-100 text-center mt-2">
            ¿No tienes una cuenta aún? <Link to="/signup">Regístrate</Link>
        </div>
        </div>
        </Container>
    </>
)
}