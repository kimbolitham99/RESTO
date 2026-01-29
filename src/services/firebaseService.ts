import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  setDoc,
  Timestamp
} from "firebase/firestore";
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from "firebase/auth";
import { db, auth } from "../config/firebase";
import { MenuItem, Category, Settings } from "../types";

// Collections
const MENU_ITEMS_COLLECTION = "menuItems";
const CATEGORIES_COLLECTION = "categories";
const SETTINGS_COLLECTION = "settings";
const SETTINGS_DOC_ID = "appSettings";

// ==================== AUTH ====================

export const loginWithEmail = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// ==================== MENU ITEMS ====================

export const getMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const q = query(collection(db, MENU_ITEMS_COLLECTION), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    })) as MenuItem[];
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }
};

export const getMenuItem = async (id: string): Promise<MenuItem | null> => {
  try {
    const docRef = doc(db, MENU_ITEMS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: docSnap.data().updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as MenuItem;
    }
    return null;
  } catch (error) {
    console.error("Error fetching menu item:", error);
    return null;
  }
};

export const addMenuItem = async (item: Omit<MenuItem, "id" | "createdAt" | "updatedAt">): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, MENU_ITEMS_COLLECTION), {
      ...item,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding menu item:", error);
    throw error;
  }
};

export const updateMenuItem = async (id: string, item: Partial<MenuItem>): Promise<void> => {
  try {
    const docRef = doc(db, MENU_ITEMS_COLLECTION, id);
    await updateDoc(docRef, {
      ...item,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw error;
  }
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, MENU_ITEMS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }
};

// ==================== CATEGORIES ====================

export const getCategories = async (): Promise<Category[]> => {
  try {
    const q = query(collection(db, CATEGORIES_COLLECTION), orderBy("order", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Category[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getCategory = async (id: string): Promise<Category | null> => {
  try {
    const docRef = doc(db, CATEGORIES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Category;
    }
    return null;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
};

export const addCategory = async (category: Omit<Category, "id">): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, CATEGORIES_COLLECTION), category);
    return docRef.id;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

export const updateCategory = async (id: string, category: Partial<Category>): Promise<void> => {
  try {
    const docRef = doc(db, CATEGORIES_COLLECTION, id);
    await updateDoc(docRef, category);
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, CATEGORIES_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

// ==================== SETTINGS ====================

export const getSettings = async (): Promise<Settings> => {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Settings;
    }
    // Return default settings if not found
    return {
      restaurantName: "Kantin Mak Vika",
      whatsappNumber: "6281277112721",
      whatsappMessage: "Halo, saya ingin memesan:\n\n{orderDetails}\n\nTotal: {totalPrice}\n\nTerima kasih!",
      address: "Jl. Setia Lk II , Tanjungbalai",
      phone: "081277112721",
      email: "admin@kantinmakvika.com",
      openingHours: {
        weekdays: "08:00 - 13:00",
        weekends: "08:00 - 11:00"
      }
    };
  } catch (error) {
    console.error("Error fetching settings:", error);
    return {
      restaurantName: "Kantin Mak Vika",
      whatsappNumber: "6281277112721",
      whatsappMessage: "Halo, saya ingin memesan:\n\n{orderDetails}\n\nTotal: {totalPrice}\n\nTerima kasih!",
      address: "Jl. Setia Lk II , Tanjungbalai",
      phone: "081277112721",
      email: "admin@kantinmakvika.com",
      openingHours: {
        weekdays: "11:00 - 22:00",
        weekends: "10:00 - 23:00"
      }
    };
  }
};

export const updateSettings = async (settings: Settings): Promise<void> => {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
    await setDoc(docRef, settings, { merge: true });
  } catch (error) {
    console.error("Error updating settings:", error);
    throw error;
  }
};

// ==================== INITIAL DATA SEEDING ====================

export const seedInitialData = async (): Promise<void> => {
  try {
    // Check if data already exists
    const categoriesSnapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
    if (!categoriesSnapshot.empty) {
      console.log("Data already exists, skipping seed");
      return;
    }

    // Seed categories
    const categories = [
      { name: "Appetizers", description: "Hidangan pembuka yang menggugah selera", order: 1 },
      { name: "Main Courses", description: "Hidangan utama pilihan chef", order: 2 },
      { name: "Desserts", description: "Hidangan penutup manis", order: 3 },
      { name: "Beverages", description: "Minuman segar dan nikmat", order: 4 },
    ];

    const categoryIds: { [key: string]: string } = {};
    for (const category of categories) {
      const docRef = await addDoc(collection(db, CATEGORIES_COLLECTION), category);
      categoryIds[category.name] = docRef.id;
    }

    // Seed menu items
    const menuItems = [
      {
        name: "Bruschetta Classica",
        description: "Roti panggang dengan tomat segar, basil, bawang putih, dan minyak zaitun extra virgin",
        price: 65000,
        categoryId: categoryIds["Appetizers"],
        image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400",
        isAvailable: true,
      },
      {
        name: "Calamari Fritti",
        description: "Cumi-cumi goreng tepung dengan saus marinara dan aioli lemon",
        price: 95000,
        categoryId: categoryIds["Appetizers"],
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400",
        isAvailable: true,
      },
      {
        name: "Caprese Salad",
        description: "Tomat segar, mozzarella, basil dengan balsamic glaze",
        price: 75000,
        categoryId: categoryIds["Appetizers"],
        image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400",
        isAvailable: true,
      },
      {
        name: "Spaghetti Carbonara",
        description: "Pasta dengan saus krim telur, pancetta, parmesan, dan lada hitam",
        price: 125000,
        categoryId: categoryIds["Main Courses"],
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400",
        isAvailable: true,
      },
      {
        name: "Osso Buco",
        description: "Betis sapi yang dimasak lambat dengan sayuran, anggur putih, dan gremolata",
        price: 285000,
        categoryId: categoryIds["Main Courses"],
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
        isAvailable: true,
      },
      {
        name: "Risotto ai Funghi",
        description: "Risotto krim dengan jamur porcini, truffle oil, dan parmesan",
        price: 165000,
        categoryId: categoryIds["Main Courses"],
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400",
        isAvailable: true,
      },
      {
        name: "Grilled Salmon",
        description: "Salmon panggang dengan lemon butter sauce dan asparagus",
        price: 225000,
        categoryId: categoryIds["Main Courses"],
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
        isAvailable: true,
      },
      {
        name: "Tiramisu",
        description: "Dessert klasik Italia dengan ladyfinger, mascarpone, espresso, dan cocoa",
        price: 75000,
        categoryId: categoryIds["Desserts"],
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400",
        isAvailable: true,
      },
      {
        name: "Panna Cotta",
        description: "Krim puding vanilla dengan saus berry segar",
        price: 65000,
        categoryId: categoryIds["Desserts"],
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
        isAvailable: true,
      },
      {
        name: "Gelato Trio",
        description: "Tiga scoop gelato pilihan: vanilla, cokelat, dan strawberry",
        price: 55000,
        categoryId: categoryIds["Desserts"],
        image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400",
        isAvailable: true,
      },
      {
        name: "Espresso",
        description: "Espresso shot klasik dari biji kopi premium",
        price: 35000,
        categoryId: categoryIds["Beverages"],
        image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400",
        isAvailable: true,
      },
      {
        name: "Fresh Lemonade",
        description: "Lemonade segar dengan mint dan madu",
        price: 45000,
        categoryId: categoryIds["Beverages"],
        image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400",
        isAvailable: true,
      },
      {
        name: "Italian Soda",
        description: "Soda Italia dengan sirup buah pilihan",
        price: 40000,
        categoryId: categoryIds["Beverages"],
        image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400",
        isAvailable: true,
      },
    ];

    for (const item of menuItems) {
      await addDoc(collection(db, MENU_ITEMS_COLLECTION), {
        ...item,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }

    // Seed settings
    await setDoc(doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID), {
      restaurantName: "Kantin Mak Vika",
      whatsappNumber: "6281277112721",
      whatsappMessage: "Halo, saya ingin memesan:\n\n{orderDetails}\n\nTotal: {totalPrice}\n\nTerima kasih!",
      address: "Jl. Setia Lk II , Tanjungbalai",
      phone: "081277112721",
      email: "admin@kantinmakvika.com",
      openingHours: {
        weekdays: "11:00 - 22:00",
        weekends: "10:00 - 23:00"
      }
    });

    console.log("Initial data seeded successfully!");
  } catch (error) {
    console.error("Error seeding initial data:", error);
    throw error;
  }
};
