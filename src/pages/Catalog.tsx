import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Package, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Catalog = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const products = [
    {
      id: 1,
      title: "LATAPOXY 300 Adhesive",
      category: "adhesives",
      sku: "L300",
      description: "Two-component epoxy adhesive for tile installation",
      popular: true,
      image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "254 Platinum Thin-Set",
      category: "adhesives",
      sku: "254P",
      description: "Premium polymer-modified thin-set mortar",
      popular: true,
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "SPECTRALOCK PRO Grout",
      category: "grout",
      sku: "SPRO",
      description: "Patented epoxy grout with color consistency",
      popular: true,
      image: "https://images.unsplash.com/photo-1616046386908-a899aab0d5cd?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      title: "PERMACOLOR Grout",
      category: "grout",
      sku: "PC",
      description: "High-performance cement grout",
      popular: false,
      image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      title: "HYDRO BAN Membrane",
      category: "waterproofing",
      sku: "HB",
      description: "Thin, load-bearing waterproofing membrane",
      popular: true,
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      title: "9235 Waterproofing",
      category: "waterproofing",
      sku: "9235",
      description: "Latex modified thin-set waterproofing",
      popular: false,
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
    },
    {
      id: 7,
      title: "NXT Level Plus",
      category: "levelers",
      sku: "NXTP",
      description: "Self-leveling underlayment",
      popular: false,
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=400&h=300&fit=crop",
    },
    {
      id: 8,
      title: "STONETECH Sealer",
      category: "sealers",
      sku: "STS",
      description: "Professional stone & tile sealer",
      popular: false,
      image: "https://images.unsplash.com/photo-1616046386908-a899aab0d5cd?w=400&h=300&fit=crop",
    },
    {
      id: 9,
      title: "4-XLT Mortar",
      category: "adhesives",
      sku: "4XLT",
      description: "Extra large tile mortar",
      popular: true,
      image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop",
    },
    {
      id: 10,
      title: "MVIS Vapor Barrier",
      category: "waterproofing",
      sku: "MVIS",
      description: "Moisture vapor reduction system",
      popular: false,
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Rich header design */}
      <div className="bg-primary px-4 py-12 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary-foreground rounded-full -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-primary-foreground rounded-full translate-y-1/2" />
        </div>
        
        <div className="mx-auto max-w-6xl relative z-10">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-6 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm">
              <Package className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-bold">Product Catalog</h1>
          </div>
          <p className="text-primary-foreground/90 text-lg">Explore MyKLaticrete construction products</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Search bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products by name, SKU, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-xl text-base"
          />
        </div>

        <Tabs defaultValue="all" onValueChange={setActiveCategory} className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto mb-8 p-1.5 bg-muted/50 rounded-2xl">
            <TabsTrigger value="all" className="rounded-xl px-6 data-[state=active]:shadow-md">All Products</TabsTrigger>
            <TabsTrigger value="adhesives" className="rounded-xl px-6 data-[state=active]:shadow-md">Adhesives</TabsTrigger>
            <TabsTrigger value="grout" className="rounded-xl px-6 data-[state=active]:shadow-md">Grout</TabsTrigger>
            <TabsTrigger value="waterproofing" className="rounded-xl px-6 data-[state=active]:shadow-md">Waterproofing</TabsTrigger>
            <TabsTrigger value="levelers" className="rounded-xl px-6 data-[state=active]:shadow-md">Levelers</TabsTrigger>
            <TabsTrigger value="sealers" className="rounded-xl px-6 data-[state=active]:shadow-md">Sealers</TabsTrigger>
          </TabsList>

          <TabsContent value={activeCategory} className="mt-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                return (
                  <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer h-full">
                    <div className="relative aspect-video overflow-hidden bg-muted/30">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.popular && (
                        <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground shadow-md">
                          Popular
                        </Badge>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-xl">{product.title}</h3>
                        <Badge variant="outline" className="text-xs">{product.sku}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-5">{product.description}</p>
                      
                      <Button size="lg" className="w-full shadow-md">
                        View Details
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="p-6 rounded-3xl bg-muted/30 w-fit mx-auto mb-6">
                  <Package className="h-20 w-20 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No products found</h3>
                <p className="text-muted-foreground text-lg">Try a different search or category</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Catalog;
