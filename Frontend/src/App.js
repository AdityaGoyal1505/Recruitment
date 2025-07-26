import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ApplyModal from './pages/ApplyModal';
import StudentDashboard from './pages/StudentDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import Job from './pages/Job';
import Complete from './pages/completestudent';
import Completerec from './pages/completerecrutirer';
import AddJob from './pages/AddJob';
import NotFound from './pages/NotFoundPage'; // Optional fallback

function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage with job listings */}
        <Route path="/" element={<Home />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/apply/:jobId" element={<ApplyModal />} />
        <Route path="/jobs" element={<Job />} />
        <Route
          path="/studentdashboard"
          element={
            localStorage.getItem('user') ? <StudentDashboard /> : <Navigate to="/login" />
          }
        />
        <Route path="/recruiterdashboard" element={<RecruiterDashboard />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="/completerec" element={<Completerec />} />
        <Route path="/Addjob" element={<AddJob/>} />
        {/* Optional: fallback for unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
