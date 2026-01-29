import React from 'react';
import { Package, FolderOpen, DollarSign, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../data/initialData';

export const Dashboard: React.FC = () => {
  const { menuItems, categories } = useApp();

  const totalItems = menuItems.length;
  const availableItems = menuItems.filter(item => item.isAvailable).length;
  const unavailableItems = menuItems.filter(item => !item.isAvailable).length;
  const totalCategories = categories.length;
  
  const averagePrice = menuItems.length > 0
    ? menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length
    : 0;

  const itemsByCategory = categories.map(category => ({
    category: category.name,
    count: menuItems.filter(item => item.categoryId === category.id).length
  }));

  const recentItems = [...menuItems]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Selamat datang di panel admin restoran</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Menu</p>
              <p className="text-3xl font-bold text-gray-800">{totalItems}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Kategori</p>
              <p className="text-3xl font-bold text-gray-800">{totalCategories}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <FolderOpen className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Rata-rata Harga</p>
              <p className="text-2xl font-bold text-gray-800">{formatPrice(averagePrice)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Menu Tersedia</p>
              <p className="text-3xl font-bold text-green-600">{availableItems}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <TrendingUp className="text-amber-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Items by Category */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Menu per Kategori</h3>
          <div className="space-y-4">
            {itemsByCategory.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600">{item.category}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-amber-500 h-2 rounded-full"
                      style={{
                        width: `${totalItems > 0 ? (item.count / totalItems) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-800 w-8">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Availability Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Status Ketersediaan</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" size={24} />
                <span className="font-medium text-gray-800">Tersedia</span>
              </div>
              <span className="text-2xl font-bold text-green-600">{availableItems}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3">
                <XCircle className="text-red-600" size={24} />
                <span className="font-medium text-gray-800">Tidak Tersedia</span>
              </div>
              <span className="text-2xl font-bold text-red-600">{unavailableItems}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Items */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Menu Terbaru Diupdate</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Menu</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Kategori</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Harga</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Terakhir Update</th>
              </tr>
            </thead>
            <tbody>
              {recentItems.map(item => {
                const category = categories.find(c => c.id === item.categoryId);
                return (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <span className="font-medium text-gray-800">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{category?.name || '-'}</td>
                    <td className="py-3 px-4 text-gray-800 font-medium">{formatPrice(item.price)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {item.isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-sm">
                      {new Date(item.updatedAt).toLocaleDateString('id-ID')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
