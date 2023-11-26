import React,{useState} from 'react'
import {Alert, Button, Card} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom' 
import {useAuth} from '../contexts/AuthContext'

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
        <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Perfil</h2>  
          {error &&<Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>{currentUser.email}
          <Link to= "/update-profile" className='btn btn-primary w-100 mt-3'> Actualizar perfil </Link> 
        </Card.Body>

        </Card>
        <div className='w-100 text-center mt-2'>
           <Button varian="link" onClick={handleLogout}>Cerrar Sesión</Button>
        </div>
    </>
  )
}