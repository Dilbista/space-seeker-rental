import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { Building, Home, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock data for the dashboard stats
const stats = [
  {
    title: "Total Properties",
    value: 248,
    icon: Building,
    color: "bg-blue-50 text-blue-700",
    increase: "+12%",
    link: "/admin/properties"
  },
  {
    title: "Total Users",
    value: 1540,
    icon: Users,
    color: "bg-green-50 text-green-700",
    increase: "+5%",
    link: "/admin/users"
  },
  {
    title: "New Properties (This Month)",
    value: 32,
    icon: Home,
    color: "bg-purple-50 text-purple-700",
    increase: "+18%",
    link: "/admin/properties"
  },
  {
    title: "Total Reviews",
    value: 346,
    icon: Star,
    color: "bg-amber-50 text-amber-700",
    increase: "+7%",
    link: "/admin/reviews"
  }
];

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    action: "New Property Listed",
    description: "2BHK Apartment in Koramangala",
    time: "10 minutes ago",
    user: "John Doe"
  },
  {
    id: 2,
    action: "User Registration",
    description: "New owner registered",
    time: "1 hour ago",
    user: "Sarah Johnson"
  },
  {
    id: 3,
    action: "Property Updated",
    description: "Price updated for 3BHK Villa",
    time: "2 hours ago",
    user: "Admin"
  },
  {
    id: 4,
    action: "New Review",
    description: "4-star review for property #123",
    time: "3 hours ago",
    user: "Michael Brown"
  },
  {
    id: 5,
    action: "Property Approved",
    description: "1BHK Apartment in HSR Layout",
    time: "5 hours ago",
    user: "Admin"
  }
];

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-full ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold">
                    {isLoading ? (
                      <div className="h-8 w-16 bg-gray-200 animate-pulse rounded" />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="text-sm font-medium text-green-600">
                    {stat.increase}
                  </div>
                </div>
                <div className="mt-4">
                  <Link to={stat.link}>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded" />
                      <div className="h-3 w-1/2 bg-gray-200 animate-pulse rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="py-3 flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
                        {activity.action.includes("Property") ? (
                          <Building className="h-5 w-5 text-gray-600" />
                        ) : activity.action.includes("User") ? (
                          <Users className="h-5 w-5 text-gray-600" />
                        ) : activity.action.includes("Review") ? (
                          <Star className="h-5 w-5 text-gray-600" />
                        ) : (
                          <Home className="h-5 w-5 text-gray-600" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <span className="text-xs text-gray-500">{activity.time}</span
                      </div>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">By {activity.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">
                View All Activities
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Other dashboard sections could go here */}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
