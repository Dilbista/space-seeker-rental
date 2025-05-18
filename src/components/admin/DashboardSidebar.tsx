
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Building,
  Star,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon: Icon, label, active, onClick }) => {
  return (
    <Link to={to} onClick={onClick}>
      <Button
        variant="ghost"
        className={cn(
          'w-full justify-start mb-1', 
          active ? 'bg-primary text-white hover:bg-primary/90' : 'hover:bg-gray-100'
        )}
      >
        <Icon className="h-5 w-5 mr-3" />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const sidebarContent = (
    <div className="space-y-6">
      <div className="flex items-center px-4 py-2">
        <Home className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold text-primary ml-2">Admin Panel</span>
      </div>

      <div className="space-y-1 px-3">
        <SidebarLink 
          to="/admin/dashboard" 
          icon={Home} 
          label="Dashboard" 
          active={isActive('/admin/dashboard')}
          onClick={closeMobileMenu}
        />
        <SidebarLink 
          to="/admin/properties" 
          icon={Building} 
          label="Properties" 
          active={isActive('/admin/properties')}
          onClick={closeMobileMenu}
        />
        <SidebarLink 
          to="/admin/users" 
          icon={Users} 
          label="Users" 
          active={isActive('/admin/users')}
          onClick={closeMobileMenu}
        />
        <SidebarLink 
          to="/admin/reviews" 
          icon={Star} 
          label="Reviews" 
          active={isActive('/admin/reviews')}
          onClick={closeMobileMenu}
        />
        <SidebarLink 
          to="/admin/settings" 
          icon={Settings} 
          label="Settings" 
          active={isActive('/admin/settings')}
          onClick={closeMobileMenu}
        />
      </div>

      <div className="px-3 pt-6 mt-6 border-t border-gray-200">
        <Link to="/admin/logout">
          <Button 
            variant="outline" 
            className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50"
            onClick={closeMobileMenu}
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span>Logout</span>
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          size="icon" 
          variant="outline" 
          className="rounded-full" 
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={closeMobileMenu}>
          <div 
            className="fixed inset-y-0 left-0 w-64 bg-white z-50" 
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
        {sidebarContent}
      </div>
    </>
  );
};

export default DashboardSidebar;
