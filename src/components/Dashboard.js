import React,{useState} from 'react'
import {Alert, Button, Card,Container} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom' 
import {useAuth} from '../contexts/AuthContext'
import NavbarLibrary from './NavbarLibrary'

export default function Dashboard() {
    const[error, setError]=useState('')
    const{ currentUser, logout}= useAuth()
    const navigate = useNavigate()

    async function handleLogout(){
        setError('')

        try{
            await logout()
            navigate("/login")
        }catch{
            setError('Cerrar sesión fallido')
        }

    }
  return (
    <>
    <NavbarLibrary/>
    <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "550px" }}>
        <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Perfil</h2>  
          {error &&<Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>{currentUser.email}
          <Link to= "/update-profile" className='btn btn-primary w-100 mt-3'> Actualizar perfil </Link> 
        </Card.Body>

        </Card>
        <div className='w-100 text-center mt-2'>
           <Button variant="link" onClick={handleLogout}>Cerrar Sesión</Button>
        </div>
        </div>
        </Container>
    </>
  )
}
