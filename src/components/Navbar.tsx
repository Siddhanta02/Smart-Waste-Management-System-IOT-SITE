import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, User, LogOut, Shield } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      setShowUserMenu(false);
      toast.success('Successfully logged out');
    } catch (error: any) {
      toast.error(error.message || 'Error signing out');
    }
  };

  return (
    <nav className="bg-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Recycle className="h-8 w-8" />
            <span className="text-xl font-bold">Recyclean</span>
          </Link>

          <div className="flex space-x-4">
            <Link to="/marketplace" className="hover:text-green-200">Marketplace</Link>
            <Link to="/blog" className="hover:text-green-200">Blog</Link>
            <Link to="/education" className="hover:text-green-200">Education</Link>
            <Link to="/quiz" className="hover:text-green-200">Quiz</Link>
            {user && <Link to="/complaints" className="hover:text-green-200">Complaints</Link>}
            <Link to="/admin" className="flex items-center space-x-1 hover:text-green-200">
              <Shield className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 hover:text-green-200"
                >
                  <User className="h-6 w-6" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="hover:text-green-200"
                >
                  Login
                </Link>
                <Link 
                  to="/login" 
                  className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-100 transition duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;