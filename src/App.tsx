import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Complaints from './pages/Complaints';
import Marketplace from './pages/Marketplace';
import Blog from './pages/Blog';
import Education from './pages/Education';
import Quiz from './pages/Quiz';
import AdminDashboard from './pages/admin/Dashboard';
import DriverManagement from './pages/admin/DriverManagement';
import RouteMap from './pages/admin/RouteMap';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/education" element={<Education />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/drivers" element={<DriverManagement />} />
          <Route path="/admin/route-map" element={<RouteMap />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;