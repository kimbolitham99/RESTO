# La Bella Cucina - Restaurant Menu Website

A comprehensive restaurant menu website with an administrative panel built with React, TypeScript, and Tailwind CSS.

## Features

### Public Website
- **Hero Section**: Beautiful landing page with restaurant branding
- **Menu Display**: Organized menu items by categories (Appetizers, Main Courses, Desserts, Beverages)
- **Category Filtering**: Filter menu items by category
- **About Section**: Restaurant story and features
- **Contact Section**: Contact information, hours, and reservation form
- **Responsive Design**: Fully mobile-responsive layout
- **Smooth Scrolling**: Enhanced navigation experience

### Admin Panel
- **Secure Login**: Authentication system with password hashing
- **Dashboard**: Overview statistics (total items, categories, average price, etc.)
- **Menu Item Management**: Full CRUD operations for menu items
  - Add, edit, and delete menu items
  - Set name, description, price, category, and image
  - Toggle item availability
- **Category Management**: Full CRUD operations for categories
  - Add, edit, and delete categories
  - Set display order
- **Form Validation**: Input validation with error messages
- **Responsive Admin UI**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Context API
- **Data Persistence**: LocalStorage (simulating database)
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Admin Panel Access

Navigate to `/admin` to access the admin panel.

### Demo Credentials
- **Username**: `admin`
- **Password**: `admin123`

## Project Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── AdminLayout.tsx      # Admin panel layout with sidebar
│   │   ├── AdminLogin.tsx       # Login form component
│   │   ├── CategoriesList.tsx   # Category management
│   │   ├── Dashboard.tsx        # Admin dashboard with stats
│   │   ├── MenuItemForm.tsx     # Add/Edit menu item form
│   │   └── MenuItemsList.tsx    # Menu items table/list
│   └── public/
│       ├── About.tsx            # About section
│       ├── Contact.tsx          # Contact & reservation form
│       ├── Footer.tsx           # Site footer
│       ├── Header.tsx           # Navigation header
│       ├── Hero.tsx             # Hero/landing section
│       └── MenuSection.tsx      # Public menu display
├── context/
│   └── AppContext.tsx           # Global state management
├── data/
│   └── initialData.ts           # Initial menu items & categories
├── pages/
│   ├── AdminPage.tsx            # Admin routes container
│   └── PublicPage.tsx           # Public site container
├── types/
│   └── index.ts                 # TypeScript interfaces
├── utils/
│   └── cn.ts                    # Tailwind class merge utility
├── App.tsx                      # Main app with routing
├── index.css                    # Global styles
└── main.tsx                     # App entry point
```

## Data Model

### MenuItem
```typescript
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;        // Category ID
  image: string;           // URL
  available: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### Category
```typescript
interface Category {
  id: string;
  name: string;
  description: string;
  order: number;           // Display order
}
```

## Security Features

- Password hashing for admin credentials
- Session management via localStorage
- Input sanitization and validation
- Protected admin routes

## Customization

### Restaurant Information
Edit `src/data/initialData.ts` to update:
- Restaurant name and tagline
- Contact information
- Operating hours
- Address

### Initial Menu Items
The initial menu items and categories are defined in `src/data/initialData.ts`. 
These serve as demo data and can be modified through the admin panel.

### Styling
The application uses Tailwind CSS. Customize colors and styles in:
- `src/index.css` for global styles
- Individual component files for component-specific styles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- This is a frontend-only implementation using localStorage for data persistence
- In a production environment, you would connect to a real backend API
- Images are loaded from Unsplash URLs for demo purposes
- The reservation form is non-functional (frontend only)

## License

MIT License - feel free to use this project as a template for your restaurant website.
