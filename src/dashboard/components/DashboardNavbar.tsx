import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  ShoppingBag, 
  BookOpen, 
  Sparkles, 
  TrendingUp,
  User,
  Settings,
  LogOut,
  Bell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    {
      id: 'home',
      label: 'Accueil',
      icon: Home,
      path: '/dashboard',
      size: 'large' // Make icons bigger as requested
    },
    {
      id: 'marketplace',
      label: 'Magasin',
      icon: ShoppingBag,
      path: '/dashboard/marketplace',
      size: 'large'
    },
    {
      id: 'learn',
      label: 'Learn Hub',
      icon: BookOpen,
      path: '/dashboard/learn',
      size: 'large'
    },
    {
      id: 'studio',
      label: 'AI Studio',
      icon: Sparkles,
      path: '/dashboard/studio',
      size: 'large'
    },
    {
      id: 'invest',
      label: 'Club Investisseur',
      icon: TrendingUp,
      path: '/dashboard/invest',
      size: 'large'
    }
  ];

  const isActivePath = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-secondary-light border-b border-white/10 px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-white font-bold text-xl">AyanBridge</h1>
            <p className="text-white/60 text-xs">Dashboard</p>
          </div>
        </div>

        {/* Main Navigation - Larger Icons */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                title={item.label}
              >
                <Icon className="w-8 h-8 sm:w-6 sm:h-6" />
                <span className="text-xs font-medium hidden sm:block">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <button className="relative p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-white text-sm font-medium">{user?.name || 'User'}</span>
              <span className="text-white/60 text-xs">{user?.role || 'Member'}</span>
            </div>
            
            <div className="relative group">
              <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium group-hover:bg-primary/80 transition-colors">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-12 w-48 bg-secondary-light border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  <button
                    onClick={() => navigate('/dashboard/profile')}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">Profil</span>
                  </button>
                  <button
                    onClick={() => navigate('/dashboard/settings')}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Paramètres</span>
                  </button>
                  <hr className="border-white/10 my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/5 rounded-lg transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Déconnexion</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;