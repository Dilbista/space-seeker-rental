
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building,
  Search,
  Plus,
  Filter,
  Edit,
  Trash,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import DashboardLayout from "@/components/admin/DashboardLayout";

// Mock data for properties
const propertiesData = [
  {
    id: 1,
    title: "Modern 2BHK Apartment with Balcony",
    type: "2BHK",
    location: "Koramangala, Bangalore",
    price: 25000,
    status: "Active",
    isRent: true,
    featured: true,
    owner: "John Doe",
    ownerId: 101,
    createdAt: "2023-06-20"
  },
  {
    id: 2,
    title: "Spacious 3BHK Villa with Garden",
    type: "3BHK",
    location: "HSR Layout, Bangalore",
    price: 45000,
    status: "Active",
    isRent: true,
    featured: false,
    owner: "Sarah Johnson",
    ownerId: 102,
    createdAt: "2023-06-15"
  },
  {
    id: 3,
    title: "Cozy 1RK Studio Apartment",
    type: "1RK",
    location: "Indiranagar, Bangalore",
    price: 15000,
    status: "Pending",
    isRent: true,
    featured: false,
    owner: "David Wilson",
    ownerId: 103,
    createdAt: "2023-06-18"
  },
  {
    id: 4,
    title: "Premium 1BHK Apartment",
    type: "1BHK",
    location: "Whitefield, Bangalore",
    price: 18000,
    status: "Active",
    isRent: true,
    featured: true,
    owner: "Michael Brown",
    ownerId: 104,
    createdAt: "2023-06-12"
  },
  {
    id: 5,
    title: "Residential Plot in Premium Area",
    type: "Land",
    location: "Electronic City, Bangalore",
    price: 5000000,
    status: "Active",
    isRent: false,
    featured: false,
    owner: "Emma Davis",
    ownerId: 105,
    createdAt: "2023-06-10"
  }
];

const AdminProperties = () => {
  const [properties, setProperties] = useState(propertiesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);

  // Handle property deletion
  const handleDeleteProperty = (id: number) => {
    setProperties(properties.filter(property => property.id !== id));
  };

  // Handle bulk selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProperties(properties.map(property => property.id));
    } else {
      setSelectedProperties([]);
    }
  };

  // Handle individual property selection
  const handleSelectProperty = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedProperties([...selectedProperties, id]);
    } else {
      setSelectedProperties(selectedProperties.filter(propId => propId !== id));
    }
  };

  // Filter properties based on search and filters
  const filteredProperties = properties.filter(property => {
    // Search filter
    const matchesSearch = 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.owner.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = 
      statusFilter === "all" || 
      property.status.toLowerCase() === statusFilter.toLowerCase();
    
    // Type filter
    const matchesType = 
      typeFilter === "all" || 
      property.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    if (action === "delete" && selectedProperties.length > 0) {
      setProperties(properties.filter(property => !selectedProperties.includes(property.id)));
      setSelectedProperties([]);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">Properties</h1>
          <Link to="/admin/properties/add">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Property
            </Button>
          </Link>
        </div>
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search properties..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Property Types</SelectItem>
                <SelectItem value="1rk">1 RK</SelectItem>
                <SelectItem value="1bhk">1 BHK</SelectItem>
                <SelectItem value="2bhk">2 BHK</SelectItem>
                <SelectItem value="3bhk">3 BHK</SelectItem>
                <SelectItem value="land">Land</SelectItem>
                <SelectItem value="house">House</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {selectedProperties.length > 0 && (
            <div className="mt-4 flex items-center justify-between bg-gray-50 p-2 rounded">
              <p className="text-sm">
                {selectedProperties.length} {selectedProperties.length === 1 ? 'property' : 'properties'} selected
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedProperties([])}>
                  Cancel
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleBulkAction("delete")}>
                  Delete Selected
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Properties Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="p-4">
                    <Checkbox 
                      checked={selectedProperties.length === filteredProperties.length && filteredProperties.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="p-4">Property</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Owner</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProperties.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-gray-500">
                      No properties found matching your criteria
                    </td>
                  </tr>
                ) : (
                  filteredProperties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <Checkbox 
                          checked={selectedProperties.includes(property.id)}
                          onCheckedChange={(checked) => handleSelectProperty(property.id, checked as boolean)}
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                            <Building className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <div className="font-medium">{property.title}</div>
                            <div className="text-gray-500 text-xs">{property.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-gray-900">
                          ₹{property.price.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {property.isRent ? "/ month" : "one time"}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <Badge variant="outline">{property.type}</Badge>
                          {property.featured && (
                            <Badge className="ml-2" variant="secondary">Featured</Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <Link to={`/admin/users/${property.ownerId}`} className="text-primary hover:underline">
                          {property.owner}
                        </Link>
                      </td>
                      <td className="p-4">
                        <Badge 
                          variant={
                            property.status === "Active" ? "default" :
                            property.status === "Pending" ? "outline" :
                            "secondary"
                          }
                          className="flex items-center space-x-1"
                        >
                          {property.status === "Active" ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <AlertCircle className="h-3 w-3 mr-1" />
                          )}
                          <span>{property.status}</span>
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Link to={`/property/${property.id}`} target="_blank">
                            <Button size="icon" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link to={`/admin/properties/edit/${property.id}`}>
                            <Button size="icon" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                className="text-red-600 focus:text-red-600"
                                onClick={() => handleDeleteProperty(property.id)}
                              >
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination - Can be expanded in a real implementation */}
          <div className="p-4 border-t flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {filteredProperties.length} of {properties.length} properties
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminProperties;
