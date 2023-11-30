import React from 'react';
import NavbarLibrary from './NavbarLibrary';
import ListBooks from './ListBooks';

const Home = () => {

  return (
    <>
      <NavbarLibrary/>
      <div style={{ marginTop: '50px' }}>
      <ListBooks/>
      
      </div>
    </>
  );
};
export default Home;