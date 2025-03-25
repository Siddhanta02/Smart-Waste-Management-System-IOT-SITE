import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Users, MapPin, LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';

const AdminNavbar = () => {
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Successfully logged out');
    } catch (error: any) {
      toast.error(error.message || 'Error signing out');
    }
  };

  return (
    <nav className="bg-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/admin" className="flex items-center space-x-2">
            <Recycle className="h-8 w-8" />
            <span className="text-xl font-bold">Admin Dashboard</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link 
              to="/admin/drivers" 
              className="flex items-center space-x-2 hover:text-green-200"
            >
              <Users className="h-5 w-5" />
              <span>Drivers</span>
            </Link>

            <Link 
              to="/admin/route-map" 
              className="flex items-center space-x-2 hover:text-green-200"
            >
              <MapPin className="h-5 w-5" />
              <span>Route Map</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 hover:text-green-200"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;