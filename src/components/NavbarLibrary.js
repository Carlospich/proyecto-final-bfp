import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
export default function NavbarLibrary() {
  

  const { currentUser,logout } = useAuth();
  const navigate = useNavigate();
  
  
  const user = {
    name: currentUser ? currentUser.displayName : 'Guest',
    email: currentUser ? currentUser.email : '',
    image: 'https://via.placeholder.com/30x30',
  };
  async function handleLogout(){
    

    try{
        await logout()
        navigate("/login")
    }catch{
        
    }

}

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => navigate('/')}  style={{ cursor: 'pointer' }}>Libreria</Navbar.Brand>

        <div className="d-flex align-items-center">
         
        
            <Dropdown >
              <Dropdown.Toggle variant="primary" id="user-dropdown">
                {user.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate('/dashboard')}>Mi perfil</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Cerrar Sesión</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          
        </div>
      </Container>
    </Navbar>
  );
}
