export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  order: number;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Settings {
  restaurantName: string;
  whatsappNumber: string;
  whatsappMessage: string;
  address: string;
  phone: string;
  email: string;
  openingHours: {
    weekdays: string;
    weekends: string;
  };
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
}
