import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom";


export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {

            return setError('Las contraseñas no coinciden')
        }

        const promises = []
        setLoading(true)
        setError('')
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                navigate("/")
            }).catch(() => {
                setError("Fallo al actualizar el perfil ")
            }).finally(() => {
                setLoading(false)
            })


    }


    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Actualizar Perfil</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Dejalo en blanco para mantener la misma" />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Confirma tu contraseña</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder="Dejalo en blanco para mantener la misma" />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type="submit">Actualizar</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="W-100 text-center mt-2">
                <Link to="/">Cancelar</Link>
            </div>
        </>
    )
}