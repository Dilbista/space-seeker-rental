import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Move, MapPin } from "lucide-react";

export interface PropertyProps {
  id: number;
  title: string;
  type: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  isRent: boolean;
  createdAt?: string; // Added createdAt as optional property
}

const PropertyCard = ({ property }: { property: PropertyProps }) => {
  const { id, title, type, price, location, bedrooms, bathrooms, area, imageUrl, isRent } = property;

  return (
    <Link to={`/property/${id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <img
          src={imageUrl}
          alt={title}
          className="aspect-video w-full object-cover rounded-md"
        />
        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold truncate">{title}</CardTitle>
          <div className="flex items-center space-x-2 text-gray-500 mt-1">
            <MapPin className="h-4 w-4" />
            <span className="text-sm truncate">{location}</span>
          </div>
          <div className="mt-2">
            <Badge variant="secondary">{type}</Badge>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-600">
              {isRent ? "Rent" : "Sale"}
            </span>
            <span className="text-lg font-bold">₹{price}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-500">
              <Bed className="h-4 w-4" />
              <span>{bedrooms}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <Bath className="h-4 w-4" />
              <span>{bathrooms}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <Move className="h-4 w-4" />
              <span>{area} sqft</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PropertyCard;
