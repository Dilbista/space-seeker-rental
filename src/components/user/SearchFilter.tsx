
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

type SearchFilterProps = {
  className?: string;
  compact?: boolean;
};

const SearchFilter = ({ className = "", compact = false }: SearchFilterProps) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("rent");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query parameters
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (propertyType) params.append("type", propertyType);
    if (priceRange) params.append("price", priceRange);
    params.append("status", propertyStatus);
    
    // Navigate to properties page with filters
    navigate(`/properties?${params.toString()}`);
  };

  if (compact) {
    return (
      <form 
        onSubmit={handleSearch} 
        className={`flex items-center space-x-2 ${className}`}
      >
        <Input
          type="text"
          placeholder="Search locations..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </form>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-1">
              Location
            </label>
            <Input
              id="location"
              type="text"
              placeholder="City, neighborhood, or address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium mb-1">
              Property Type
            </label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1rk">1 RK</SelectItem>
                <SelectItem value="1bhk">1 BHK</SelectItem>
                <SelectItem value="2bhk">2 BHK</SelectItem>
                <SelectItem value="3bhk">3 BHK</SelectItem>
                <SelectItem value="land">Land</SelectItem>
                <SelectItem value="house">House</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label htmlFor="priceRange" className="block text-sm font-medium mb-1">
              Price Range
            </label>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-10000">₹0 - ₹10,000</SelectItem>
                <SelectItem value="10000-20000">₹10,000 - ₹20,000</SelectItem>
                <SelectItem value="20000-30000">₹20,000 - ₹30,000</SelectItem>
                <SelectItem value="30000-50000">₹30,000 - ₹50,000</SelectItem>
                <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
                <SelectItem value="100000+">₹1,00,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label htmlFor="propertyStatus" className="block text-sm font-medium mb-1">
              Property Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={propertyStatus === "rent" ? "default" : "outline"}
                className="w-full"
                onClick={() => setPropertyStatus("rent")}
              >
                For Rent
              </Button>
              <Button
                type="button"
                variant={propertyStatus === "sale" ? "default" : "outline"}
                className="w-full"
                onClick={() => setPropertyStatus("sale")}
              >
                For Sale
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <Button type="submit" className="w-full">
            <Search className="mr-2 h-4 w-4" /> Search Properties
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;
