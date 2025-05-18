
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Bed, 
  Bath, 
  Home, 
  MapPin, 
  User, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  Heart,
  Phone,
  Mail,
  Star,
  Share
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ReviewForm from "@/components/user/ReviewForm";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Mock property data - would come from API in a real implementation
const propertyData = {
  id: 1,
  title: "Modern 2BHK Apartment with Balcony",
  description: "This beautiful apartment offers contemporary living in the heart of the city. Featuring two spacious bedrooms, a modern kitchen, and a private balcony with stunning views. The property is well-maintained and comes with premium amenities including 24/7 security, power backup, and covered parking.",
  type: "2BHK",
  price: 25000,
  deposit: 100000,
  location: "Koramangala, Bangalore",
  address: "123 Residence Tower, 8th Block, Koramangala, Bangalore - 560034",
  bedrooms: 2,
  bathrooms: 2,
  area: 1200,
  furnished: "Semi-furnished",
  floor: "5th (out of 10)",
  carParking: "1 covered",
  facing: "East",
  balcony: "Yes (1)",
  availableFrom: "2023-07-15",
  preferredTenants: "Family/Bachelors",
  amenities: [
    "24/7 Security",
    "Power Backup",
    "Lift",
    "Swimming Pool",
    "Gym",
    "Children's Play Area",
    "Clubhouse",
    "Visitor Parking",
    "Gated Community"
  ],
  images: [
    "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
  ],
  owner: {
    id: 101,
    name: "John Doe",
    phone: "+91 9876543210",
    email: "john.doe@example.com",
    memberSince: "January 2022",
    properties: 3
  },
  isRent: true,
  postedDate: "2023-06-20",
  reviews: [
    {
      id: 201,
      userId: 301,
      userName: "Rajesh Kumar",
      rating: 4,
      comment: "Great property in a nice location. The owner was very responsive and helpful.",
      date: "2023-05-15"
    },
    {
      id: 202,
      userId: 302,
      userName: "Priya Sharma",
      rating: 5,
      comment: "Absolutely loved the apartment. It's spacious, well-maintained and has great amenities.",
      date: "2023-04-28"
    }
  ]
};

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState(propertyData);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // In a real implementation, you would fetch property data based on the ID
  useEffect(() => {
    // Fetch property data from API
    // setProperty(fetchedProperty);
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  const toggleSaveProperty = () => {
    setIsSaved(!isSaved);
  };

  const handleContactOwner = () => {
    setIsContactFormVisible(!isContactFormVisible);
  };

  const calculateAverageRating = () => {
    if (!property.reviews || property.reviews.length === 0) return 0;
    const totalRating = property.reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / property.reviews.length;
  };

  return (
    <>
      <Header />
      <main className="bg-gray-50 pb-12">
        {/* Property Images */}
        <div className="relative bg-gray-900 h-[400px] md:h-[500px]">
          {property.images && property.images.length > 0 ? (
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <Home className="h-16 w-16 text-gray-400" />
            </div>
          )}
          
          {property.images && property.images.length > 1 && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white rounded-full"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white rounded-full"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-1 flex space-x-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 w-2 rounded-full ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
          
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button
              size="icon"
              variant="ghost"
              className="bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white rounded-full"
              onClick={toggleSaveProperty}
            >
              <Heart className={`h-5 w-5 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white rounded-full"
            >
              <Share className="h-5 w-5" />
            </Button>
          </div>
          
          <Badge 
            className="absolute top-4 left-4 text-sm" 
            variant={property.isRent ? "default" : "secondary"}
          >
            {property.isRent ? "For Rent" : "For Sale"}
          </Badge>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Property Information */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h1 className="text-2xl md:text-3xl font-bold">{property.title}</h1>
                  <div className="mt-2 md:mt-0">
                    <span className="text-2xl font-bold text-primary">
                      ₹{property.price.toLocaleString()}{property.isRent ? "/month" : ""}
                    </span>
                    {property.isRent && property.deposit && (
                      <p className="text-sm text-gray-500">
                        Deposit: ₹{property.deposit.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.address}</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-gray-200">
                  <div className="flex flex-col items-center text-center">
                    <Bed className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm text-gray-500">Bedrooms</span>
                    <span className="font-semibold">{property.bedrooms}</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Bath className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm text-gray-500">Bathrooms</span>
                    <span className="font-semibold">{property.bathrooms}</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Home className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm text-gray-500">Area</span>
                    <span className="font-semibold">{property.area} sqft</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Calendar className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm text-gray-500">Available From</span>
                    <span className="font-semibold">
                      {new Date(property.availableFrom).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Property Details Tabs */}
              <Tabs defaultValue="description" className="bg-white rounded-lg shadow-md">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="reviews">
                    Reviews{" "}
                    {property.reviews && (
                      <span className="ml-1">({property.reviews.length})</span>
                    )}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="p-6">
                  <h3 className="text-xl font-semibold mb-4">About this property</h3>
                  <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
                </TabsContent>
                
                <TabsContent value="details" className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Property Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Property Type</span>
                      <span className="font-medium">{property.type}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Furnishing</span>
                      <span className="font-medium">{property.furnished}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Floor</span>
                      <span className="font-medium">{property.floor}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Car Parking</span>
                      <span className="font-medium">{property.carParking}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Facing</span>
                      <span className="font-medium">{property.facing}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Balcony</span>
                      <span className="font-medium">{property.balcony}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Preferred Tenants</span>
                      <span className="font-medium">{property.preferredTenants}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Posted On</span>
                      <span className="font-medium">
                        {new Date(property.postedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="amenities" className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Reviews & Ratings</h3>
                    <div className="flex items-center">
                      <div className="flex items-center mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= calculateAverageRating()
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold">
                        {calculateAverageRating().toFixed(1)} / 5
                      </span>
                    </div>
                  </div>
                  
                  {property.reviews && property.reviews.length > 0 ? (
                    <div className="space-y-6">
                      {property.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-4">
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold mr-2">
                                {review.userName.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium">{review.userName}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(review.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No reviews yet for this property.</p>
                  )}
                  
                  <Separator className="my-8" />
                  
                  <h4 className="text-lg font-semibold mb-4">Write a Review</h4>
                  <ReviewForm propertyId={Number(id)} />
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Owner Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Owner Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-2">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-semibold">{property.owner.name}</h4>
                    <p className="text-sm text-gray-500">
                      Member since {property.owner.memberSince}
                    </p>
                  </div>
                  
                  <Button
                    className="w-full mb-2 flex items-center justify-center"
                    onClick={handleContactOwner}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Owner
                  </Button>
                  
                  {isContactFormVisible && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <div className="mb-3">
                        <p className="text-sm font-medium mb-1">Phone Number</p>
                        <p className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-primary" />
                          {property.owner.phone}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Email</p>
                        <p className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-primary" />
                          {property.owner.email}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Similar Properties */}
              <Card>
                <CardHeader>
                  <CardTitle>Similar Properties</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex space-x-3">
                      <div className="h-16 w-16 bg-gray-200 rounded-md flex-shrink-0" />
                      <div className="space-y-1">
                        <Link to={`/property/${item + 10}`} className="block text-sm font-medium hover:text-primary">
                          {property.type} in {property.location.split(',')[0]}
                        </Link>
                        <p className="text-sm text-primary font-semibold">
                          ₹{(property.price * 0.8 + item * 1000).toLocaleString()}/month
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  <Link to="/properties" className="block text-sm text-center text-primary hover:underline mt-2">
                    View more properties
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PropertyDetailPage;
