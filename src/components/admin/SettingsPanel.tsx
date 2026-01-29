import React, { useState, useEffect } from 'react';
import { Save, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Settings } from '../../types';

export const SettingsPanel: React.FC = () => {
  const { settings, updateSettings } = useApp();
  const [formData, setFormData] = useState<Settings>(settings);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateSettings(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Gagal menyimpan pengaturan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Pengaturan</h1>
        <p className="text-gray-600">Konfigurasi informasi restoran dan WhatsApp</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* WhatsApp Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MessageCircle className="text-green-500" size={24} />
            Pengaturan WhatsApp
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="6281234567890"
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: kode negara + nomor (tanpa + atau spasi). Contoh: 6281234567890
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template Pesan Pesanan
              </label>
              <textarea
                value={formData.whatsappMessage}
                onChange={(e) => setFormData({ ...formData, whatsappMessage: e.target.value })}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Gunakan placeholder: {'{orderDetails}'} untuk daftar pesanan, {'{totalPrice}'} untuk total harga
              </p>
            </div>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="text-amber-500" size={24} />
            Informasi Restoran
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Restoran
              </label>
              <input
                type="text"
                value={formData.restaurantName}
                onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alamat
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telepon
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="text-blue-500" size={24} />
            Jam Operasional
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senin - Jumat
              </label>
              <input
                type="text"
                value={formData.openingHours.weekdays}
                onChange={(e) => setFormData({
                  ...formData,
                  openingHours: { ...formData.openingHours, weekdays: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="11:00 - 22:00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sabtu - Minggu
              </label>
              <input
                type="text"
                value={formData.openingHours.weekends}
                onChange={(e) => setFormData({
                  ...formData,
                  openingHours: { ...formData.openingHours, weekends: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10:00 - 23:00"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              saved
                ? 'bg-green-500 text-white'
                : 'bg-amber-500 hover:bg-amber-600 text-white'
            } disabled:opacity-50`}
          >
            <Save size={20} />
            {isSubmitting ? 'Menyimpan...' : saved ? 'Tersimpan!' : 'Simpan Pengaturan'}
          </button>
        </div>
      </form>
    </div>
  );
};
