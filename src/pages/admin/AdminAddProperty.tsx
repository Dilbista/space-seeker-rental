
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/admin/DashboardLayout";
import PropertyForm from "@/components/admin/PropertyForm";
import { useToast } from "@/components/ui/use-toast";

const AdminAddProperty = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    setIsSubmitting(true);
    
    // In a real app, this would be an API call to save the property
    // For this demo, we'll simulate an API call with setTimeout
    setTimeout(() => {
      // Get existing properties from localStorage or initialize an empty array
      const existingProperties = JSON.parse(localStorage.getItem('properties') || '[]');
      
      // Add new property with an incremented ID
      const newProperty = {
        ...data,
        id: existingProperties.length > 0 
          ? Math.max(...existingProperties.map((p: any) => p.id)) + 1 
          : 1,
        createdAt: new Date().toISOString()
      };
      
      // Save the updated properties list
      const updatedProperties = [...existingProperties, newProperty];
      localStorage.setItem('properties', JSON.stringify(updatedProperties));
      
      // Show success notification
      toast({
        title: "Property Added",
        description: "The property has been successfully added",
      });
      
      // Redirect to properties list
      navigate("/admin/properties");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Add New Property</h1>
        </div>
        
        <PropertyForm 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminAddProperty;
