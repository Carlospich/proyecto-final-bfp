import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile";
import Home from "./Home"
import AddBook from "./AddBook"
import SearchBook from "./SearchBook";
import { DatabaseProvider } from "../contexts/DatabaseContext";
import ListBooks from "./ListBooks";

function App() {
  return (
    <AuthProvider>
    <DatabaseProvider>
      
          <Router>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute> <Home /> </PrivateRoute>}/>
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/search" element={<SearchBook />} />
              <Route path="/update-profile" element={<PrivateRoute> <UpdateProfile /> </PrivateRoute>}/>
              <Route path="/forgot-password" element={<ForgotPassword/>}/>
              <Route path="/list-books" element={<ListBooks/>}/>
            </Routes>
          </Router>

       
      </DatabaseProvider>
    </AuthProvider>
  )
}

export default App;
