
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User, LogIn, Menu, X, Home } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="text-2xl font-bold text-primary">RealEstate</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
          <Link to="/properties" className="text-gray-700 hover:text-primary">Properties</Link>
          <Link to="/about" className="text-gray-700 hover:text-primary">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-primary">Contact</Link>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="flex items-center space-x-2">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Button>
            </Link>
            <Link to="/register">
              <Button className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Register</span>
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-gray-700"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 shadow-lg">
          <nav className="flex flex-col space-y-3">
            <Link to="/" className="text-gray-700 hover:text-primary py-2" onClick={toggleMenu}>Home</Link>
            <Link to="/properties" className="text-gray-700 hover:text-primary py-2" onClick={toggleMenu}>Properties</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary py-2" onClick={toggleMenu}>About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary py-2" onClick={toggleMenu}>Contact</Link>
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
              <Link to="/login" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start">
                  <LogIn className="h-4 w-4 mr-2" />
                  <span>Login</span>
                </Button>
              </Link>
              <Link to="/register" onClick={toggleMenu}>
                <Button className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  <span>Register</span>
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
