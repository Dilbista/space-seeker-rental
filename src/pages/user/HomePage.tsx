
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SearchFilter from "@/components/user/SearchFilter";
import PropertyCard, { PropertyProps } from "@/components/user/PropertyCard";
import { ArrowDown } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Mock data - would come from API in real implementation
const featuredProperties: PropertyProps[] = [
  {
    id: 1,
    title: "Modern 2BHK Apartment with Balcony",
    type: "2BHK",
    price: 25000,
    location: "Koramangala, Bangalore",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    isRent: true
  },
  {
    id: 2,
    title: "Spacious 3BHK Villa with Garden",
    type: "3BHK",
    price: 45000,
    location: "HSR Layout, Bangalore",
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    isRent: true
  },
  {
    id: 3,
    title: "Cozy 1RK Studio Apartment",
    type: "1RK",
    price: 15000,
    location: "Indiranagar, Bangalore",
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    isRent: true
  },
  {
    id: 4,
    title: "Premium 1BHK Apartment",
    type: "1BHK",
    price: 18000,
    location: "Whitefield, Bangalore",
    bedrooms: 1,
    bathrooms: 1,
    area: 750,
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    isRent: true
  },
];

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="hero-section relative h-[600px] flex items-center justify-center text-white">
          <div className="container mx-auto px-4 text-center z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Dream Property
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Search from thousands of rental and sale properties without any brokerage
            </p>
            
            <div className="max-w-4xl mx-auto">
              <SearchFilter />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
              onClick={() => {
                document.getElementById('featured')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              <ArrowDown className="h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Featured Properties */}
        <section id="featured" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our handpicked selection of properties that might be your next home
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/properties">
                <Button>View All Properties</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Easy steps to find and rent your dream property without any broker
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-white rounded-lg p-8 shadow-md">
                <div className="mx-auto bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Search</h3>
                <p className="text-gray-600">
                  Browse through thousands of verified properties according to your requirements
                </p>
              </div>
              
              <div className="text-center bg-white rounded-lg p-8 shadow-md">
                <div className="mx-auto bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Visit</h3>
                <p className="text-gray-600">
                  Schedule visits to your shortlisted properties at your convenience
                </p>
              </div>
              
              <div className="text-center bg-white rounded-lg p-8 shadow-md">
                <div className="mx-auto bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Finalize</h3>
                <p className="text-gray-600">
                  Connect directly with owners and finalize your rental without any brokerage
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Are You a Property Owner?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              List your property for free and connect with genuine tenants directly
            </p>
            <Link to="/register?type=owner">
              <Button variant="secondary" size="lg">
                List Your Property
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
