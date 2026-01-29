import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../data/initialData';
import { MenuItem } from '../../types';

export const MenuSection: React.FC = () => {
  const { menuItems, categories, addToCart, cart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const availableItems = menuItems.filter(item => item.isAvailable);
  
  const filteredItems = selectedCategory === 'all'
    ? availableItems
    : availableItems.filter(item => item.categoryId === selectedCategory);

  const getItemQuantityInCart = (itemId: string) => {
    const cartItem = cart.find(item => item.menuItem.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const getQuantity = (itemId: string) => quantities[itemId] || 1;

  const setQuantity = (itemId: string, qty: number) => {
    if (qty < 1) qty = 1;
    if (qty > 99) qty = 99;
    setQuantities(prev => ({ ...prev, [itemId]: qty }));
  };

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item, getQuantity(item.id));
    setQuantities(prev => ({ ...prev, [item.id]: 1 }));
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

  return (
    <section id="menu" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Menu Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hidangan lezat yang dibuat dengan bahan-bahan segar berkualitas tinggi
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-white'
                : 'bg-white text-gray-700 hover:bg-amber-100'
            }`}
          >
            Semua
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-amber-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {getCategoryName(item.categoryId)}
                </div>
                {getItemQuantityInCart(item.id) > 0 && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <ShoppingCart size={14} />
                    {getItemQuantityInCart(item.id)}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-amber-600">
                    {formatPrice(item.price)}
                  </span>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(item.id, getQuantity(item.id) - 1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="px-4 font-medium">{getQuantity(item.id)}</span>
                    <button
                      onClick={() => setQuantity(item.id, getQuantity(item.id) + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    Tambah
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada menu tersedia dalam kategori ini</p>
          </div>
        )}
      </div>
    </section>
  );
};
