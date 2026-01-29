import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem, Category, OrderItem, Settings, AdminUser } from '../types';
import { User } from 'firebase/auth';
import {
  getMenuItems,
  getCategories,
  getSettings,
  addMenuItem as addMenuItemToDb,
  updateMenuItem as updateMenuItemInDb,
  deleteMenuItem as deleteMenuItemFromDb,
  addCategory as addCategoryToDb,
  updateCategory as updateCategoryInDb,
  deleteCategory as deleteCategoryFromDb,
  updateSettings as updateSettingsInDb,
  loginWithEmail,
  logoutUser,
  onAuthChange,
  seedInitialData
} from '../services/firebaseService';

interface AppContextType {
  // Menu Items
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
  
  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  
  // Cart
  cart: OrderItem[];
  addToCart: (menuItem: MenuItem, quantity?: number, notes?: string) => void;
  removeFromCart: (menuItemId: string) => void;
  updateCartItemQuantity: (menuItemId: string, quantity: number) => void;
  updateCartItemNotes: (menuItemId: string, notes: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  
  // Settings
  settings: Settings;
  updateSettings: (settings: Settings) => Promise<void>;
  
  // Auth
  isAuthenticated: boolean;
  currentUser: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  
  // Loading states
  isLoading: boolean;
  authLoading: boolean;

  // Refresh data
  refreshData: () => Promise<void>;
}

const defaultSettings: Settings = {
  restaurantName: "La Bella Cucina",
  whatsappNumber: "6281234567890",
  whatsappMessage: "Halo, saya ingin memesan:\n\n{orderDetails}\n\nTotal: {totalPrice}\n\nTerima kasih!",
  address: "Jl. Sudirman No. 123, Jakarta Pusat",
  phone: "(021) 1234-5678",
  email: "info@labellacucina.com",
  openingHours: {
    weekdays: "11:00 - 22:00",
    weekends: "10:00 - 23:00"
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange((user: User | null) => {
      if (user) {
        setIsAuthenticated(true);
        setCurrentUser({
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || undefined
        });
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('restaurant_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('restaurant_cart', JSON.stringify(cart));
  }, [cart]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Try to seed initial data if empty
      await seedInitialData();
      
      const [itemsData, categoriesData, settingsData] = await Promise.all([
        getMenuItems(),
        getCategories(),
        getSettings()
      ]);
      
      setMenuItems(itemsData);
      setCategories(categoriesData);
      setSettings(settingsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    await loadData();
  };

  // Menu Items CRUD
  const addMenuItem = async (item: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await addMenuItemToDb(item);
      await refreshData();
    } catch (error) {
      console.error('Error adding menu item:', error);
      throw error;
    }
  };

  const updateMenuItem = async (id: string, item: Partial<MenuItem>) => {
    try {
      await updateMenuItemInDb(id, item);
      await refreshData();
    } catch (error) {
      console.error('Error updating menu item:', error);
      throw error;
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      await deleteMenuItemFromDb(id);
      await refreshData();
    } catch (error) {
      console.error('Error deleting menu item:', error);
      throw error;
    }
  };

  // Categories CRUD
  const addCategory = async (category: Omit<Category, 'id'>) => {
    try {
      await addCategoryToDb(category);
      await refreshData();
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  };

  const updateCategory = async (id: string, category: Partial<Category>) => {
    try {
      await updateCategoryInDb(id, category);
      await refreshData();
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await deleteCategoryFromDb(id);
      await refreshData();
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };

  // Cart functions
  const addToCart = (menuItem: MenuItem, quantity: number = 1, notes?: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.menuItem.id === menuItem.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { menuItem, quantity, notes }];
    });
  };

  const removeFromCart = (menuItemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.menuItem.id !== menuItemId));
  };

  const updateCartItemQuantity = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(menuItemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.menuItem.id === menuItemId ? { ...item, quantity } : item
      )
    );
  };

  const updateCartItemNotes = (menuItemId: string, notes: string) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.menuItem.id === menuItemId ? { ...item, notes } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.menuItem.price * item.quantity, 0);
  };

  // Settings
  const updateSettingsHandler = async (newSettings: Settings) => {
    try {
      await updateSettingsInDb(newSettings);
      setSettings(newSettings);
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  };

  // Auth
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await loginWithEmail(email, password);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        updateCartItemNotes,
        clearCart,
        getCartTotal,
        settings,
        updateSettings: updateSettingsHandler,
        isAuthenticated,
        currentUser,
        login,
        logout,
        isLoading,
        authLoading,
        refreshData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
