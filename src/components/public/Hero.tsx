import React from 'react';
import { useApp } from '../../context/AppContext';

export const Hero: React.FC = () => {
  const { settings } = useApp();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          {settings.restaurantName}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          Pengalaman kuliner Italia autentik dengan bahan-bahan premium
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollToSection('menu')}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full transition-all transform hover:scale-105"
          >
            Lihat Menu
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-4 border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold rounded-full transition-all"
          >
            Reservasi
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
