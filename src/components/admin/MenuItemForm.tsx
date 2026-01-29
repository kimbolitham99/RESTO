import React, { useState } from 'react';
import { ArrowLeft, Save, Image } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../data/initialData';
import { MenuItem } from '../../types';

interface MenuItemFormProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const MenuItemForm: React.FC<MenuItemFormProps> = ({ item, onClose }) => {
  const { categories, addMenuItem, updateMenuItem } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: item?.name || '',
    description: item?.description || '',
    price: item?.price || 0,
    categoryId: item?.categoryId || (categories[0]?.id || ''),
    image: item?.image || '',
    isAvailable: item?.isAvailable ?? true,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Nama menu wajib diisi';
    if (!formData.description.trim()) newErrors.description = 'Deskripsi wajib diisi';
    if (formData.price <= 0) newErrors.price = 'Harga harus lebih dari 0';
    if (!formData.categoryId) newErrors.categoryId = 'Kategori wajib dipilih';
    if (!formData.image.trim()) newErrors.image = 'URL gambar wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      if (item) {
        await updateMenuItem(item.id, formData);
      } else {
        await addMenuItem(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving menu item:', error);
      alert('Gagal menyimpan menu. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {item ? 'Edit Menu' : 'Tambah Menu Baru'}
          </h1>
          <p className="text-gray-600">
            {item ? 'Perbarui informasi menu' : 'Buat menu baru untuk restoran'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Menu <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Contoh: Spaghetti Carbonara"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Deskripsi menu..."
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Harga (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0"
                  min="0"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                {formData.price > 0 && (
                  <p className="text-sm text-gray-500 mt-1">Preview: {formatPrice(formData.price)}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.categoryId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Gambar <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.image ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
              <p className="text-xs text-gray-500 mt-1">
                Gunakan URL gambar dari Unsplash atau layanan hosting gambar lainnya
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isAvailable"
                checked={formData.isAvailable}
                onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
              />
              <label htmlFor="isAvailable" className="text-sm font-medium text-gray-700">
                Menu tersedia untuk dipesan
              </label>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <Save size={20} />
                {isSubmitting ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>

        {/* Preview */}
        <div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Image size={20} />
              Preview
            </h3>
            <div className="rounded-lg overflow-hidden border">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Invalid+Image';
                  }}
                />
              ) : (
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <div className="p-4">
                <h4 className="font-semibold text-gray-800">
                  {formData.name || 'Nama Menu'}
                </h4>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {formData.description || 'Deskripsi menu akan muncul di sini'}
                </p>
                <p className="text-amber-600 font-bold mt-2">
                  {formData.price > 0 ? formatPrice(formData.price) : 'Rp 0'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
