import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../data/initialData';
import { MenuItemForm } from './MenuItemForm';
import { MenuItem } from '../../types';

export const MenuItemsList: React.FC = () => {
  const { menuItems, categories, deleteMenuItem, updateMenuItem } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus menu ini?')) {
      await deleteMenuItem(id);
    }
  };

  const handleToggleAvailability = async (item: MenuItem) => {
    await updateMenuItem(item.id, { isAvailable: !item.isAvailable });
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || '-';
  };

  if (showForm) {
    return <MenuItemForm item={editingItem} onClose={handleFormClose} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Daftar Menu</h1>
          <p className="text-gray-600">Kelola semua menu restoran</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Tambah Menu
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="all">Semua Kategori</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className={`bg-white rounded-xl shadow-sm border overflow-hidden ${
              !item.isAvailable ? 'opacity-60' : ''
            }`}
          >
            <div className="relative h-40">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  item.isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {item.isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <span className="text-amber-600 font-bold">{formatPrice(item.price)}</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">{getCategoryName(item.categoryId)}</p>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">{item.description}</p>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleAvailability(item)}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 rounded transition-colors ${
                    item.isAvailable
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {item.isAvailable ? <EyeOff size={16} /> : <Eye size={16} />}
                  <span className="text-sm">{item.isAvailable ? 'Sembunyikan' : 'Tampilkan'}</span>
                </button>
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <p className="text-gray-500">Tidak ada menu ditemukan</p>
        </div>
      )}
    </div>
  );
};
