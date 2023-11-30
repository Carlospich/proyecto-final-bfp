import React from "react";
import Signup from "./Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile";
import Home from "./Home"
import AddBook from "./AddBook"
import { DatabaseProvider } from "../contexts/DatabaseContext";
import ListBooks from "./ListBooks";
import BookDetails from "./BookDetails";
import Dashboard from "./Dashboard";
function App() {
  return (
    <AuthProvider>
    <DatabaseProvider>
   
          <Router>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute> <Home /> </PrivateRoute>}/>
              <Route path="/add-book" element={<PrivateRoute><AddBook /></PrivateRoute>} />
              <Route path="/update-profile" element={<PrivateRoute> <UpdateProfile /> </PrivateRoute>}/>
              <Route path="/forgot-password" element={<ForgotPassword/>}/>
              <Route path="/list-books" element={<PrivateRoute><ListBooks/></PrivateRoute>}/>
              <Route path="/books/:id" element={<PrivateRoute><BookDetails/></PrivateRoute>}/>
              <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
            </Routes>
          </Router>
       
       
      </DatabaseProvider>
    </AuthProvider>
  )
}


export default App;
