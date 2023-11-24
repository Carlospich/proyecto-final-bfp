import React, { useRef } from "react";
import { Form, Button, Card } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
export default function Signup() {
    const emailRef = useRef();
    const passwordRef= useRef();
    const passwordConfimRef= useRef();
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Registrarme</h2>
                    <Form>
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
                        <Button className="w-100" type="submit">Registrarme</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="W-100 text-center mt-2">
                ¿Ya tienes una cuenta? Iniciar Sesión
            </div>
        </>
    )
}