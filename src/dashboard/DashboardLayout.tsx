import React from 'react';
import DashboardNavbar from './components/DashboardNavbar';
import { CartProvider } from '../contexts/CartContext';
import CartSidebar from '../components/CartSidebar';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <CartProvider>
      <div className="w-full min-h-screen bg-secondary">
        {/* Dashboard Navbar */}
        <DashboardNavbar />

        {/* Main Content */}
        <main className="w-full">
          {children}
        </main>

        {/* Cart Sidebar */}
        <CartSidebar />
      </div>
    </CartProvider>
  );
};

export default DashboardLayout; 