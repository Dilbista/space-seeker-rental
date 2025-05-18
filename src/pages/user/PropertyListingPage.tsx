
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchFilter from "@/components/user/SearchFilter";
import PropertyCard, { PropertyProps } from "@/components/user/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Home, Search } from "lucide-react";

// Mock data - would come from API in real implementation
const allProperties: PropertyProps[] = [
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
  {
    id: 5,
    title: "Residential Plot in Premium Area",
    type: "Land",
    price: 5000000,
    location: "Electronic City, Bangalore",
    bedrooms: 0,
    bathrooms: 0,
    area: 2400,
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    isRent: false
  },
  {
    id: 6,
    title: "Furnished 2BHK with Modern Amenities",
    type: "2BHK",
    price: 28000,
    location: "Marathahalli, Bangalore",
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    isRent: true
  },
  {
    id: 7,
    title: "Spacious 1BHK Near Metro",
    type: "1BHK",
    price: 16000,
    location: "MG Road, Bangalore",
    bedrooms: 1,
    bathrooms: 1,
    area: 700,
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    isRent: true
  },
  {
    id: 8,
    title: "Independent House with Garden",
    type: "House",
    price: 7500000,
    location: "Jayanagar, Bangalore",
    bedrooms: 3,
    bathrooms: 3,
    area: 2000,
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    isRent: false
  }
];

const PropertyListingPage = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(6);
  
  // Filter properties based on URL parameters
  useEffect(() => {
    let filteredProperties = [...allProperties];
    
    const location = searchParams.get("location");
    const type = searchParams.get("type");
    const price = searchParams.get("price");
    const status = searchParams.get("status");
    
    if (location) {
      filteredProperties = filteredProperties.filter(
        (p) => p.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (type) {
      filteredProperties = filteredProperties.filter(
        (p) => p.type.toLowerCase() === type.toLowerCase()
      );
    }
    
    if (price) {
      const [min, max] = price.split("-").map(Number);
      filteredProperties = filteredProperties.filter((p) => {
        if (max) {
          return p.price >= min && p.price <= max;
        } else {
          // For price ranges like "100000+"
          return p.price >= min;
        }
      });
    }
    
    if (status) {
      filteredProperties = filteredProperties.filter(
        (p) => (status === "rent" ? p.isRent : !p.isRent)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        filteredProperties.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filteredProperties.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // In a real app, you would sort by date
        break;
      default:
        // No sorting
        break;
    }
    
    setProperties(filteredProperties);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchParams, sortOption]);

  // Get current properties for pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen pb-12">
        <div className="bg-primary text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">Find Your Perfect Property</h1>
            <SearchFilter />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Results header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-semibold flex items-center">
                <Home className="mr-2 h-5 w-5" /> Properties
                <span className="ml-2 text-lg text-gray-500">
                  ({properties.length} results)
                </span>
              </h2>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-full sm:w-auto">
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-auto">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Quick search..."
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Property grid */}
          {properties.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No properties found</h3>
              <p className="text-gray-600 mb-6">
                Try changing your search criteria or check back later for new listings
              </p>
              <Button onClick={() => window.history.back()}>Go Back</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="inline-flex">
                <Button
                  variant="outline"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-r-none"
                >
                  Previous
                </Button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    onClick={() => paginate(i + 1)}
                    className="rounded-none border-l-0"
                  >
                    {i + 1}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded-l-none border-l-0"
                >
                  Next
                </Button>
              </nav>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PropertyListingPage;
