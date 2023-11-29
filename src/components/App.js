import React from "react";
import Signup from "./Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard"
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile";
import Index from "./Index";


function App() {
  return (
    
    <AuthProvider>
      
      
          <Router>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute> <Index/> </PrivateRoute>}/>
              <Route path="/update-profile" element={<PrivateRoute> <UpdateProfile /> </PrivateRoute>}/>
              <Route path="/forgot-password" element={<ForgotPassword/>}/>
            </Routes>
          </Router>

        
    </AuthProvider>
  )
}

export default App;
