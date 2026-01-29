import React, { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../data/initialData';

export const OrderCart: React.FC = () => {
  const { cart, updateCartItemQuantity, removeFromCart, clearCart, getCartTotal, settings } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSendOrder = () => {
    if (!customerName.trim()) {
      alert('Mohon masukkan nama Anda');
      return;
    }

    // Build order details
    const orderDetails = cart.map(item => 
      `• ${item.quantity}x ${item.menuItem.name} - ${formatPrice(item.menuItem.price * item.quantity)}`
    ).join('%0A');

    const totalPrice = formatPrice(getCartTotal());

    // Replace placeholders in message template
    let message = settings.whatsappMessage
      .replace('{orderDetails}', orderDetails)
      .replace('{totalPrice}', totalPrice);

    // Add customer info
    message = `*Nama:* ${customerName}%0A*Telepon:* ${customerPhone}%0A%0A${message}`;

    if (notes.trim()) {
      message += `%0A%0A*Catatan:* ${notes}`;
    }

    // Encode for URL
    message = message.replace(/\n/g, '%0A');

    // Open WhatsApp
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${message}`, '_blank');

    // Clear cart after sending
    clearCart();
    setIsOpen(false);
    setCustomerName('');
    setCustomerPhone('');
    setNotes('');
  };

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110"
      >
        <ShoppingCart size={28} />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-7 h-7 rounded-full flex items-center justify-center font-bold">
            {cartItemCount}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Cart Panel */}
          <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <ShoppingCart size={24} />
                Pesanan Anda
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">Keranjang kosong</p>
                  <p className="text-gray-400 text-sm mt-2">Tambahkan menu untuk memesan</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div
                        key={item.menuItem.id}
                        className="bg-gray-50 rounded-xl p-4 flex gap-4"
                      >
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{item.menuItem.name}</h4>
                          <p className="text-amber-600 font-medium">
                            {formatPrice(item.menuItem.price)}
                          </p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateCartItemQuantity(item.menuItem.id, item.quantity - 1)}
                                className="p-1 bg-white border rounded hover:bg-gray-100 transition-colors"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateCartItemQuantity(item.menuItem.id, item.quantity + 1)}
                                className="p-1 bg-white border rounded hover:bg-gray-100 transition-colors"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.menuItem.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Customer Info */}
                  <div className="border-t pt-6 space-y-4">
                    <h3 className="font-semibold text-gray-800">Informasi Pemesan</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Nama lengkap"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nomor Telepon
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="08xxxxxxxxxx"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Catatan (opsional)
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Catatan khusus untuk pesanan..."
                      />
                    </div>
                  </div>

                  {/* Total & Order Button */}
                  <div className="border-t mt-6 pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-semibold text-gray-800">Total</span>
                      <span className="text-2xl font-bold text-amber-600">
                        {formatPrice(getCartTotal())}
                      </span>
                    </div>

                    <button
                      onClick={handleSendOrder}
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-3 text-lg"
                    >
                      <MessageCircle size={24} />
                      Pesan via WhatsApp
                    </button>

                    <button
                      onClick={clearCart}
                      className="w-full mt-3 text-gray-500 hover:text-red-500 py-2 transition-colors text-sm"
                    >
                      Kosongkan Keranjang
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
