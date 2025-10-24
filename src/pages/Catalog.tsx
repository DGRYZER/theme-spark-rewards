import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Gift, ShoppingBag, Trophy, Zap, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import giftCardImg from "@/assets/gift-card.jpg";
import membershipCardImg from "@/assets/membership-card.jpg";
import vipPassImg from "@/assets/vip-pass.jpg";
import shoppingVoucherImg from "@/assets/shopping-voucher.jpg";
import expressDeliveryImg from "@/assets/express-delivery.jpg";

const Catalog = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const rewards = [
    {
      id: 1,
      title: "$10 Gift Card",
      category: "giftcards",
      points: 1000,
      description: "Universal gift card",
      popular: false,
      icon: Gift,
      image: giftCardImg,
    },
    {
      id: 2,
      title: "$25 Gift Card",
      category: "giftcards",
      points: 2000,
      description: "Popular choice",
      popular: true,
      icon: Gift,
      image: giftCardImg,
    },
    {
      id: 3,
      title: "$50 Gift Card",
      category: "giftcards",
      points: 3500,
      description: "Great value",
      popular: false,
      icon: Gift,
      image: giftCardImg,
    },
    {
      id: 4,
      title: "Premium Membership",
      category: "memberships",
      points: 5000,
      description: "3 months access",
      popular: true,
      icon: Trophy,
      image: membershipCardImg,
    },
    {
      id: 5,
      title: "VIP Access Pass",
      category: "experiences",
      points: 7500,
      description: "Exclusive events",
      popular: false,
      icon: Star,
      image: vipPassImg,
    },
    {
      id: 6,
      title: "Shopping Voucher",
      category: "shopping",
      points: 1500,
      description: "$15 off purchase",
      popular: false,
      icon: ShoppingBag,
      image: shoppingVoucherImg,
    },
    {
      id: 7,
      title: "Express Delivery",
      category: "services",
      points: 500,
      description: "Free fast shipping",
      popular: true,
      icon: Zap,
      image: expressDeliveryImg,
    },
    {
      id: 8,
      title: "Annual Membership",
      category: "memberships",
      points: 12000,
      description: "12 months access",
      popular: false,
      icon: Trophy,
      image: membershipCardImg,
    },
  ];

  const filteredRewards = activeCategory === "all" 
    ? rewards 
    : rewards.filter(r => r.category === activeCategory);

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
          <p className="text-primary-foreground/90 text-lg">Browse and redeem amazing rewards</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-8">
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

export default Catalog;
