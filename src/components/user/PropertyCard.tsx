
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Bed, Home, Image } from "lucide-react";
import { Link } from "react-router-dom";

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
}

const PropertyCard = ({ property }: { property: PropertyProps }) => {
  return (
    <Card className="property-card overflow-hidden">
      <div className="relative h-48">
        {property.imageUrl ? (
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <Image className="h-12 w-12 text-gray-400" />
          </div>
        )}
        <Badge className="absolute top-3 right-3" variant={property.isRent ? "default" : "secondary"}>
          {property.isRent ? "For Rent" : "For Sale"}
        </Badge>
      </div>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">{property.type}</Badge>
          <span className="font-bold text-lg text-primary">
            ₹{property.price.toLocaleString()}{property.isRent ? "/month" : ""}
          </span>
        </div>
        <Link to={`/property/${property.id}`}>
          <h3 className="text-lg font-semibold mb-1 hover:text-primary transition-colors">
            {property.title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-3 flex items-center">
          <Home className="h-4 w-4 mr-1" />
          {property.location}
        </p>
      </CardContent>
      <CardFooter className="border-t pt-3 text-sm text-muted-foreground">
        <div className="grid grid-cols-3 w-full">
          <div className="flex items-center justify-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="flex items-center justify-center border-l border-r">
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
          </div>
          <div className="flex items-center justify-center">
            <span>{property.area} sqft</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
