
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// User Pages
import HomePage from "./pages/user/HomePage";
import PropertyListingPage from "./pages/user/PropertyListingPage";
import PropertyDetailPage from "./pages/user/PropertyDetailPage";
import LoginPage from "./pages/user/LoginPage";
import RegisterPage from "./pages/user/RegisterPage";
import AboutPage from "./pages/user/AboutPage";
import ContactPage from "./pages/user/ContactPage";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProperties from "./pages/admin/AdminProperties";
import AdminAddProperty from "./pages/admin/AdminAddProperty";

// Auth Guard
import AuthGuard from "./components/admin/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertyListingPage />} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Admin Routes - Protected by AuthGuard */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <AuthGuard>
              <AdminDashboard />
            </AuthGuard>
          } />
          <Route path="/admin/properties" element={
            <AuthGuard>
              <AdminProperties />
            </AuthGuard>
          } />
          <Route path="/admin/properties/add" element={
            <AuthGuard>
              <AdminAddProperty />
            </AuthGuard>
          } />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
