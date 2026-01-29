import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, settings } = useApp();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className={`text-2xl font-bold ${isScrolled ? 'text-amber-600' : 'text-white'}`}>
              🍽️ {settings.restaurantName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['home', 'menu', 'about', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize font-medium transition-colors hover:text-amber-500 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {item === 'home' ? 'Beranda' : item === 'menu' ? 'Menu' : item === 'about' ? 'Tentang' : 'Kontak'}
              </button>
            ))}
            <Link
              to="/admin"
              className={`font-medium transition-colors hover:text-amber-500 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Admin
            </Link>
          </nav>

          {/* Cart Button */}
          <button
            onClick={() => scrollToSection('menu')}
            className={`relative p-2 rounded-full transition-colors ${
              isScrolled ? 'bg-amber-100 text-amber-600' : 'bg-white/20 text-white'
            }`}
          >
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-lg mt-2 py-4">
            {['home', 'menu', 'about', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 capitalize"
              >
                {item === 'home' ? 'Beranda' : item === 'menu' ? 'Menu' : item === 'about' ? 'Tentang' : 'Kontak'}
              </button>
            ))}
            <Link
              to="/admin"
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
