import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Gift, ShoppingBag, Trophy, Zap, Star, Banknote, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Rewards = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [pointsToTransfer, setPointsToTransfer] = useState("");
  const { toast } = useToast();
  const userPoints = 5000; // This would come from your state/database

  const rewards = [
    {
      id: 1,
      title: "$10 Gift Card",
      category: "giftcards",
      points: 1000,
      description: "Universal gift card for online shopping",
      popular: false,
      image: "https://images.unsplash.com/photo-1606041011872-596597976b25?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "$25 Gift Card",
      category: "giftcards",
      points: 2500,
      description: "Popular choice for rewards",
      popular: true,
      image: "https://images.unsplash.com/photo-1606041011872-596597976b25?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "$50 Gift Card",
      category: "giftcards",
      points: 5000,
      description: "Great value for loyal members",
      popular: false,
      image: "https://images.unsplash.com/photo-1606041011872-596597976b25?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      title: "Premium Membership",
      category: "memberships",
      points: 5000,
      description: "3 months exclusive access",
      popular: true,
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      title: "VIP Event Pass",
      category: "experiences",
      points: 7500,
      description: "Access to exclusive industry events",
      popular: false,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      title: "Shopping Voucher",
      category: "shopping",
      points: 1500,
      description: "$15 off your next purchase",
      popular: false,
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400&h=300&fit=crop",
    },
    {
      id: 7,
      title: "Express Delivery Pass",
      category: "services",
      points: 500,
      description: "Free expedited shipping on orders",
      popular: true,
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop",
    },
    {
      id: 8,
      title: "Annual Membership",
      category: "memberships",
      points: 12000,
      description: "12 months premium benefits",
      popular: false,
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=300&fit=crop",
    },
  ];

  const filteredRewards = activeCategory === "all" 
    ? rewards 
    : rewards.filter(r => r.category === activeCategory);

  const handleTransferPoints = () => {
    const points = parseInt(pointsToTransfer);
    if (!points || points < 1000) {
      toast({
        title: "Invalid Amount",
        description: "Minimum transfer is 1000 points",
        variant: "destructive",
      });
      return;
    }
    if (points > userPoints) {
      toast({
        title: "Insufficient Points",
        description: "You don't have enough points for this transfer",
        variant: "destructive",
      });
      return;
    }

    // Here you would integrate with your backend
    toast({
      title: "Transfer Initiated",
      description: `${points} points (₹${(points / 10).toFixed(2)}) will be transferred to your bank account within 3-5 business days`,
    });
    setPointsToTransfer("");
  };

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
              <Gift className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-bold">Rewards Catalog</h1>
          </div>
          <p className="text-primary-foreground/90 text-lg">Redeem your points for amazing rewards</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Points to Cash Section */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-xl bg-primary/20">
                    <Banknote className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Convert Points to Cash</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Transfer your points directly to your bank account. Conversion rate: 10 points = ₹1
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      type="number"
                      placeholder="Enter points (min. 1000)"
                      value={pointsToTransfer}
                      onChange={(e) => setPointsToTransfer(e.target.value)}
                      className="h-12 rounded-xl"
                      min="1000"
                      step="100"
                    />
                    {pointsToTransfer && parseInt(pointsToTransfer) >= 1000 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        You'll receive: ₹{(parseInt(pointsToTransfer) / 10).toFixed(2)}
                      </p>
                    )}
                  </div>
                  <Button 
                    size="lg" 
                    onClick={handleTransferPoints}
                    className="h-12 px-8 rounded-xl shadow-md"
                  >
                    Transfer to Bank
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm text-muted-foreground mb-1">Available Points</p>
                <p className="text-4xl font-bold text-primary">{userPoints.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Rewards Catalog */}
        <Tabs defaultValue="all" onValueChange={setActiveCategory} className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto mb-8 p-1.5 bg-muted/50 rounded-2xl">
            <TabsTrigger value="all" className="rounded-xl px-6 data-[state=active]:shadow-md">All Rewards</TabsTrigger>
            <TabsTrigger value="giftcards" className="rounded-xl px-6 data-[state=active]:shadow-md">Gift Cards</TabsTrigger>
            <TabsTrigger value="memberships" className="rounded-xl px-6 data-[state=active]:shadow-md">Memberships</TabsTrigger>
            <TabsTrigger value="shopping" className="rounded-xl px-6 data-[state=active]:shadow-md">Shopping</TabsTrigger>
            <TabsTrigger value="services" className="rounded-xl px-6 data-[state=active]:shadow-md">Services</TabsTrigger>
            <TabsTrigger value="experiences" className="rounded-xl px-6 data-[state=active]:shadow-md">Experiences</TabsTrigger>
          </TabsList>

          <TabsContent value={activeCategory} className="mt-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRewards.map((reward) => {
                return (
                  <Link key={reward.id} to={`/reward/${reward.id}`}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer h-full">
                      <div className="relative aspect-video overflow-hidden bg-muted/30">
                        <img 
                          src={reward.image} 
                          alt={reward.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {reward.popular && (
                          <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground shadow-md">
                            Popular
                          </Badge>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <h3 className="font-bold text-xl mb-2">{reward.title}</h3>
                        <p className="text-sm text-muted-foreground mb-5">{reward.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Points</p>
                            <p className="text-2xl font-bold text-primary">
                              {reward.points.toLocaleString()}
                            </p>
                          </div>
                          <Button size="lg" className="shadow-md">
                            Redeem
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {filteredRewards.length === 0 && (
              <div className="text-center py-20">
                <div className="p-6 rounded-3xl bg-muted/30 w-fit mx-auto mb-6">
                  <Gift className="h-20 w-20 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No rewards found</h3>
                <p className="text-muted-foreground text-lg">Try a different category</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Rewards;
