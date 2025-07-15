"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  BookOpen,
  Shield,
  Users,
  TrendingUp,
  Star,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Legal Research Pro",
    description:
      "Comprehensive legal research platform with access to case law, statutes, and regulations",
    price: 99.99,
    category: "Software",
    rating: 4.8,
    reviews: 245,
    features: [
      "Case Law Database",
      "Statute Search",
      "Legal Analytics",
      "Document Templates",
    ],
    image:
      "https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 2,
    name: "Contract Templates Bundle",
    description:
      "Professional contract templates for various legal practice areas",
    price: 49.99,
    category: "Templates",
    rating: 4.9,
    reviews: 189,
    features: [
      "50+ Templates",
      "Customizable",
      "Legally Reviewed",
      "Regular Updates",
    ],
    image:
      "https://images.pexels.com/photos/4427611/pexels-photo-4427611.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 3,
    name: "Case Management System",
    description: "Complete case management solution for law firms of all sizes",
    price: 199.99,
    category: "Software",
    rating: 4.7,
    reviews: 312,
    features: [
      "Client Portal",
      "Time Tracking",
      "Billing Integration",
      "Document Management",
    ],
    image:
      "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 4,
    name: "Legal Writing Guide",
    description:
      "Comprehensive guide to legal writing and document preparation",
    price: 29.99,
    category: "Book",
    rating: 4.6,
    reviews: 156,
    features: [
      "Digital Format",
      "Practical Examples",
      "Writing Tips",
      "Citation Guide",
    ],
    image:
      "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 5,
    name: "Compliance Management Suite",
    description: "Tools and resources for regulatory compliance management",
    price: 149.99,
    category: "Software",
    rating: 4.8,
    reviews: 203,
    features: [
      "Compliance Tracking",
      "Audit Tools",
      "Reporting",
      "Risk Assessment",
    ],
    image:
      "https://images.pexels.com/photos/5668774/pexels-photo-5668774.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 6,
    name: "Legal Ethics Course",
    description:
      "Online course covering legal ethics and professional responsibility",
    price: 79.99,
    category: "Course",
    rating: 4.9,
    reviews: 128,
    features: [
      "CLE Credits",
      "Interactive Content",
      "Certificate",
      "Expert Instructors",
    ],
    image:
      "https://images.pexels.com/photos/5668869/pexels-photo-5668869.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Software", "Templates", "Book", "Course"];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Software":
        return <Shield className="w-5 h-5" />;
      case "Templates":
        return <BookOpen className="w-5 h-5" />;
      case "Book":
        return <BookOpen className="w-5 h-5" />;
      case "Course":
        return <Users className="w-5 h-5" />;
      default:
        return <TrendingUp className="w-5 h-5" />;
    }
  };

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Legal Products & Services
                </h1>
                <p className="text-gray-600">
                  Discover professional legal tools and resources
                </p>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      onClick={() => setSelectedCategory(category)}
                      className="flex items-center space-x-2"
                    >
                      {getCategoryIcon(category)}
                      <span>{category}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        height={200}
                        width={400}
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="secondary"
                          className="flex items-center space-x-1"
                        >
                          {getCategoryIcon(product.category)}
                          <span>{product.category}</span>
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">
                            {product.rating}
                          </span>
                          <span className="text-sm text-gray-400">
                            ({product.reviews})
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          ${product.price}
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {product.features.map((feature, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        //onClick={() => handlePurchase(product)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Featured Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Why Choose Our Products?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <Shield className="w-8 h-8 text-blue-600 mb-2" />
                      <CardTitle>Professional Quality</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        All our products are created by legal professionals and
                        reviewed by experts.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
                      <CardTitle>Regular Updates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Stay current with the latest legal developments and
                        regulatory changes.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <Users className="w-8 h-8 text-purple-600 mb-2" />
                      <CardTitle>Expert Support</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Get help from our team of legal technology experts
                        whenever you need it.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
