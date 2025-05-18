import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface PropertyFormProps {
  property?: any;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

const PropertyForm: React.FC<PropertyFormProps> = ({
  property,
  onSubmit,
  isSubmitting
}) => {
  const isEditMode = !!property;
  const { toast } = useToast();
  
  // Initialize form state with property data or defaults
  const [formData, setFormData] = useState({
    title: property?.title || '',
    description: property?.description || '',
    type: property?.type || '',
    price: property?.price || '',
    deposit: property?.deposit || '',
    location: property?.location || '',
    address: property?.address || '',
    bedrooms: property?.bedrooms || '',
    bathrooms: property?.bathrooms || '',
    area: property?.area || '',
    furnished: property?.furnished || 'unfurnished',
    floor: property?.floor || '',
    carParking: property?.carParking || '',
    facing: property?.facing || '',
    balcony: property?.balcony || 'No',
    availableFrom: property?.availableFrom ? new Date(property.availableFrom) : new Date(),
    preferredTenants: property?.preferredTenants || '',
    isRent: property?.isRent ?? true,
    amenities: property?.amenities || [],
    images: property?.images || []
  });

  // List of potential amenities
  const amenitiesList = [
    '24/7 Security',
    'Power Backup',
    'Lift',
    'Swimming Pool',
    'Gym',
    'Children\'s Play Area',
    'Clubhouse',
    'Visitor Parking',
    'Gated Community',
    'CCTV',
    'Wifi',
    'Air Conditioning'
  ];

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle switch change
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };

  // Handle checkbox changes for amenities
  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenity]
      });
    } else {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter(a => a !== amenity)
      });
    }
  };

  // Handle date change for availability
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData({ ...formData, availableFrom: date });
    }
  };
  
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // In a real app, you would upload these images to a server and get back URLs
    // For this example, we'll create object URLs for the images
    const newImageUrls = Array.from(files).map(file => URL.createObjectURL(file));
    
    setFormData({
      ...formData,
      images: [...formData.images, ...newImageUrls]
    });

    // Show toast
    toast({
      title: "Images Added",
      description: `Added ${newImageUrls.length} new images`,
    });
  };

  // Remove image from the list
  const handleRemoveImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.price || !formData.location || !formData.type) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Submit data
    onSubmit({
      ...formData,
      price: Number(formData.price),
      deposit: Number(formData.deposit),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      area: Number(formData.area),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Modern 2BHK Apartment"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Property Type <span className="text-red-500">*</span></Label>
            <Select 
              value={formData.type} 
              onValueChange={(value) => handleSelectChange('type', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1RK">1 RK</SelectItem>
                <SelectItem value="1BHK">1 BHK</SelectItem>
                <SelectItem value="2BHK">2 BHK</SelectItem>
                <SelectItem value="3BHK">3 BHK</SelectItem>
                <SelectItem value="4BHK">4 BHK</SelectItem>
                <SelectItem value="House">House</SelectItem>
                <SelectItem value="Land">Land</SelectItem>
                <SelectItem value="PG">PG</SelectItem>
                <SelectItem value="Office">Office Space</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the property..."
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="isRent">Property For</Label>
              <div className="flex items-center space-x-2">
                <Label htmlFor="isRent" className={!formData.isRent ? "font-bold" : ""}>
                  Sale
                </Label>
                <Switch
                  id="isRent"
                  checked={formData.isRent}
                  onCheckedChange={(checked) => handleSwitchChange('isRent', checked)}
                />
                <Label htmlFor="isRent" className={formData.isRent ? "font-bold" : ""}>
                  Rent
                </Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="availableFrom">Available From</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.availableFrom ? (
                    format(formData.availableFrom, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.availableFrom}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      
      {/* Location */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Location</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="location">Locality/Area <span className="text-red-500">*</span></Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., Koramangala"
              required
            />
          </div>
          
          <div className="col-span-2 space-y-2">
            <Label htmlFor="address">Full Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Complete address with landmarks"
            />
          </div>
        </div>
      </div>
      
      {/* Property Details */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Property Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input
              id="bedrooms"
              name="bedrooms"
              type="number"
              min="0"
              value={formData.bedrooms}
              onChange={handleInputChange}
              placeholder="0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input
              id="bathrooms"
              name="bathrooms"
              type="number"
              min="0"
              value={formData.bathrooms}
              onChange={handleInputChange}
              placeholder="0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="area">Area (sq ft)</Label>
            <Input
              id="area"
              name="area"
              type="number"
              min="0"
              value={formData.area}
              onChange={handleInputChange}
              placeholder="0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="furnished">Furnishing Status</Label>
            <Select 
              value={formData.furnished} 
              onValueChange={(value) => handleSelectChange('furnished', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unfurnished">Unfurnished</SelectItem>
                <SelectItem value="semi-furnished">Semi-furnished</SelectItem>
                <SelectItem value="fully-furnished">Fully Furnished</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="floor">Floor</Label>
            <Input
              id="floor"
              name="floor"
              value={formData.floor}
              onChange={handleInputChange}
              placeholder="e.g., 3rd (of 10)"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="facing">Facing</Label>
            <Select 
              value={formData.facing} 
              onValueChange={(value) => handleSelectChange('facing', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select facing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="East">East</SelectItem>
                <SelectItem value="West">West</SelectItem>
                <SelectItem value="North">North</SelectItem>
                <SelectItem value="South">South</SelectItem>
                <SelectItem value="North East">North East</SelectItem>
                <SelectItem value="North West">North West</SelectItem>
                <SelectItem value="South East">South East</SelectItem>
                <SelectItem value="South West">South West</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="carParking">Car Parking</Label>
            <Input
              id="carParking"
              name="carParking"
              value={formData.carParking}
              onChange={handleInputChange}
              placeholder="e.g., 1 covered"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="balcony">Balcony</Label>
            <Select 
              value={formData.balcony} 
              onValueChange={(value) => handleSelectChange('balcony', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No">No</SelectItem>
                <SelectItem value="Yes (1)">Yes (1)</SelectItem>
                <SelectItem value="Yes (2)">Yes (2)</SelectItem>
                <SelectItem value="Yes (3+)">Yes (3+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="preferredTenants">Preferred Tenants</Label>
            <Select 
              value={formData.preferredTenants} 
              onValueChange={(value) => handleSelectChange('preferredTenants', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Family">Family only</SelectItem>
                <SelectItem value="Bachelors">Bachelors only</SelectItem>
                <SelectItem value="Family/Bachelors">Family/Bachelors</SelectItem>
                <SelectItem value="Company">Company</SelectItem>
                <SelectItem value="Any">Any</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Pricing */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="price">
              {formData.isRent ? 'Monthly Rent' : 'Price'} <span className="text-red-500">*</span>
            </Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                ₹
              </span>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Amount"
                className="rounded-l-none"
                required
              />
            </div>
          </div>
          
          {formData.isRent && (
            <div className="space-y-2">
              <Label htmlFor="deposit">Security Deposit</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                  ₹
                </span>
                <Input
                  id="deposit"
                  name="deposit"
                  type="number"
                  min="0"
                  value={formData.deposit}
                  onChange={handleInputChange}
                  placeholder="Amount"
                  className="rounded-l-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Amenities */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Amenities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {amenitiesList.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={formData.amenities.includes(amenity)}
                onCheckedChange={(checked) => 
                  handleAmenityChange(amenity, checked as boolean)
                }
              />
              <label
                htmlFor={`amenity-${amenity}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Images */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Images</h2>
        
        <div className="mb-4">
          <Label htmlFor="images" className="block mb-2">Upload Images</Label>
          <Input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
          <p className="text-sm text-gray-500 mt-1">
            You can upload multiple images at once. Recommended size: 1200x800 pixels.
          </p>
        </div>
        
        {formData.images.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Uploaded Images ({formData.images.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <img
                    src={imageUrl}
                    alt={`Property image ${index + 1}`}
                    className="h-24 w-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Property' : 'Add Property')}
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;
