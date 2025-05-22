
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Building, Users, Home, Award, ThumbsUp } from "lucide-react";

const AboutPage = () => {
  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-[calc(100vh-64px)]">
        {/* Hero Section */}
        <section className="relative bg-primary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About RealEstate</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Your trusted partner in finding the perfect property. We connect buyers, sellers, and renters with their ideal properties.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2010, RealEstate has grown from a small local agency to a trusted name in the property market. Our journey began with a simple mission: to make property transactions transparent, fair, and stress-free.
                </p>
                <p className="text-gray-600 mb-4">
                  Over the years, we've helped thousands of clients find their dream homes, investment properties, and rental spaces. Our expertise in the market and commitment to customer satisfaction have made us a leader in the industry.
                </p>
                <p className="text-gray-600">
                  Today, we continue to innovate and improve our services, leveraging technology to provide better experiences for our clients while maintaining the personal touch that has defined our brand.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Building className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">5000+</h3>
                    <p className="text-gray-600">Properties Sold</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">10000+</h3>
                    <p className="text-gray-600">Happy Clients</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Home className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">20+</h3>
                    <p className="text-gray-600">Cities Covered</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">15+</h3>
                    <p className="text-gray-600">Years of Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <ThumbsUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Integrity</h3>
                <p className="text-gray-600">
                  We believe in transparency and honesty in all our dealings. Our clients trust us to provide accurate information and fair advice.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Customer Focus</h3>
                <p className="text-gray-600">
                  We put our clients' needs first. We listen, understand, and work diligently to find solutions that meet their specific requirements.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in everything we do. From property selection to customer service, we aim to exceed expectations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="mb-4 relative w-32 h-32 rounded-full overflow-hidden mx-auto">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="John Doe" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">John Doe</h3>
                <p className="text-gray-600">Founder & CEO</p>
              </div>
              <div className="text-center">
                <div className="mb-4 relative w-32 h-32 rounded-full overflow-hidden mx-auto">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Jane Smith" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Jane Smith</h3>
                <p className="text-gray-600">Sales Director</p>
              </div>
              <div className="text-center">
                <div className="mb-4 relative w-32 h-32 rounded-full overflow-hidden mx-auto">
                  <img 
                    src="https://randomuser.me/api/portraits/men/67.jpg" 
                    alt="Robert Johnson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Robert Johnson</h3>
                <p className="text-gray-600">Property Consultant</p>
              </div>
              <div className="text-center">
                <div className="mb-4 relative w-32 h-32 rounded-full overflow-hidden mx-auto">
                  <img 
                    src="https://randomuser.me/api/portraits/women/28.jpg" 
                    alt="Emily Brown" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Emily Brown</h3>
                <p className="text-gray-600">Customer Relations</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
