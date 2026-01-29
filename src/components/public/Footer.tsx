import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { settings } = useApp();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-amber-500 mb-4">
              🍽️ {settings.restaurantName}
            </h3>
            <p className="text-gray-400 mb-4">
              Pengalaman kuliner Italia autentik dengan bahan-bahan premium dan pelayanan terbaik.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Menu Cepat</h4>
            <ul className="space-y-2">
              {[
                { id: 'home', label: 'Beranda' },
                { id: 'menu', label: 'Menu' },
                { id: 'about', label: 'Tentang Kami' },
                { id: 'contact', label: 'Kontak' }
              ].map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={20} className="flex-shrink-0 mt-1" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={20} />
                <span>{settings.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={20} />
                <span>{settings.email}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Jam Buka</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <span className="font-medium">Senin - Jumat:</span>
                <br />
                {settings.openingHours.weekdays}
              </li>
              <li>
                <span className="font-medium">Sabtu - Minggu:</span>
                <br />
                {settings.openingHours.weekends}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {settings.restaurantName}. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};
