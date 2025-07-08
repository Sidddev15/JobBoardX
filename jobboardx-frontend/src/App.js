import './App.css';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import LandingPage from './pages/landing/LandingPage';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import RecruiterDashboard from './pages/dashboards/RecruiterDashboard';
import CandidateDashboard from './pages/dashboards/CandidateDashboard';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoutes';
import React from 'react';
import AllJobs from './pages/jobs/AllJobs';
import PostJobs from './pages/jobs/PostJobs';
import MyPostedJobs from './pages/jobs/MyPostedJob';
import MyApplications from './pages/jobs/MyApplications';

function App() {
  return (
    // <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<Register />}/>
          <Route path='/jobs' element={<AllJobs />} />
          <Route path='/post-job' element={
            <ProtectedRoute role="recruiter">
              <PostJobs />
            </ProtectedRoute>
          } />
          <Route path='/my-posted-jobs' element={
            <ProtectedRoute role="recruiter">
              <MyPostedJobs />
            </ProtectedRoute>
          } />
          <Route path='/my-application' element={
            <ProtectedRoute role="candidate">
              <MyApplications />
            </ProtectedRoute>
          } />
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
