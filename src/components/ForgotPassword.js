import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuth } from '../contexts/AuthContext'
import { Link} from "react-router-dom";


export default function ForgotPassword() {
    const emailRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const {resetPassword}= useAuth()
    const[message,setMessage]=useState("")
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value )
            setMessage('Las instrucciones fueron enviadas a tu correo electronico')
           
        } catch {
            setError('Fallo al reiniciar la contraseña')
        }
        setLoading(false)
    }
  

return (
    <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Recuperacion de contraseña</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    
                    
                    <Button disabled={loading} className="w-100 mt-3" type="submit">Reinicia tu contraseña</Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to="/login">Login</Link>
                </div>
            </Card.Body>
        </Card>
        <div className="W-100 text-center mt-2">
            ¿No tienes una cuenta aún? <Link to="/signup">Regístrate</Link>
        </div>
    </>
)
}
