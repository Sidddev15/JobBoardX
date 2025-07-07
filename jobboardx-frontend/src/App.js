import './App.css';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import RecruiterDashboard from './pages/dashboards/RecruiterDashboard';
import CandidateDashboard from './pages/dashboards/CandidateDashboard';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoutes';
import React from 'react';

function App() {
  return (
    // <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<Register />}/>
          <Route path='/admin' element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/recruiter" element={
            <ProtectedRoute role="recruiter">
              <RecruiterDashboard />
            </ProtectedRoute>
          } />
          <Route path='/candidate' element={
            <ProtectedRoute role="candidate">
              <CandidateDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;
