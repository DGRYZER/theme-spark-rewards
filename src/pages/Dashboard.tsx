import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Trophy, Gift, History, User, Star, TrendingUp, Sparkles, ClipboardList, QrCode, Shield, Users, HelpCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import banner1 from "@/assets/banner-1.jpg";
import banner2 from "@/assets/banner-2.jpg";
import banner3 from "@/assets/banner-3.jpg";

const Dashboard = () => {
  const userPoints = 2450;
  const userTier = "Gold";
  const pointsToNext = 550;

  const recentActivity = [
    { id: 1, type: "earned", amount: 150, description: "Purchase reward", date: "Today" },
    { id: 2, type: "redeemed", amount: -500, description: "$10 Gift Card", date: "2 days ago" },
    { id: 3, type: "earned", amount: 200, description: "Referral bonus", date: "5 days ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with rich visual treatment */}
      <div className="bg-primary px-4 pb-20 pt-8 text-primary-foreground relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        
        <div className="mx-auto max-w-6xl relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
              <p className="text-primary-foreground/90 text-lg">Ready to earn more rewards?</p>
            </div>
            <Link to="/profile">
              <Button variant="secondary" size="icon" className="rounded-full h-12 w-12 shadow-lg">
                <User className="h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Points Card - Elevated and prominent */}
      <div className="mx-auto max-w-6xl px-4 -mt-12 relative z-20">
        <Link to="/transactions">
          <Card className="bg-card p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-medium uppercase tracking-wide">Your Balance</p>
                <h2 className="text-5xl font-bold text-primary mb-1 group-hover:scale-105 transition-transform">{userPoints.toLocaleString()}</h2>
                <p className="text-muted-foreground">Reward Points</p>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-secondary shadow-md">
                <Star className="h-5 w-5 fill-current text-secondary-foreground" />
                <span className="font-bold text-secondary-foreground text-lg">{userTier}</span>
              </div>
            </div>
            
            {/* Progress to next tier with better visual */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Progress to Platinum
                </span>
                <span className="font-bold text-primary">{pointsToNext} pts needed</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500 relative overflow-hidden"
                  style={{ width: `${(userPoints / (userPoints + pointsToNext)) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        {/* Quick Actions - iPhone style */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-4">
            <Link to="/rewards" className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <span className="text-xs font-medium text-center">Rewards</span>
            </Link>

            <Link to="/history" className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <History className="h-8 w-8 text-white" />
              </div>
              <span className="text-xs font-medium text-center">History</span>
            </Link>

            <Link to="/survey" className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-700 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ClipboardList className="h-8 w-8 text-white" />
              </div>
              <span className="text-xs font-medium text-center">Survey</span>
            </Link>

            <Link to="/scan-qr" className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <QrCode className="h-8 w-8 text-white" />
              </div>
              <span className="text-xs font-medium text-center">Scan QR</span>
            </Link>

            <Link to="/coverage-calculator" className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <span className="text-xs font-medium text-center">Coverage</span>
            </Link>

            <Link to="/refer-friend" className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <span className="text-xs font-medium text-center">Refer Friend</span>
            </Link>

            <button className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <HelpCircle className="h-8 w-8 text-white" />
              </div>
              <span className="text-xs font-medium text-center">Help</span>
            </button>

            <Link to="/catalog" className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
              <span className="text-xs font-medium text-center">Browse</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              Recent Activity
            </h2>
            <Link to="/history">
              <Button variant="ghost" size="sm" className="font-semibold">View All</Button>
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <Card key={activity.id} className="p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl shadow-sm ${
                      activity.type === "earned" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-muted"
                    }`}>
                      {activity.type === "earned" ? (
                        <Trophy className="h-5 w-5" />
                      ) : (
                        <Gift className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-base mb-0.5">{activity.description}</p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`font-bold text-xl ${
                      activity.type === "earned" ? "text-primary" : "text-muted-foreground"
                    }`}>
                      {activity.amount > 0 ? "+" : ""}{activity.amount}
                    </span>
                    <p className="text-xs text-muted-foreground">points</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* MyK Laticrete Banner Carousel */}
        <div>
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              <CarouselItem>
                <div className="relative aspect-[3/1] w-full overflow-hidden rounded-2xl shadow-xl">
                  <img 
                    src={banner1} 
                    alt="MyK Laticrete Adhesive Application" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative aspect-[3/1] w-full overflow-hidden rounded-2xl shadow-xl">
                  <img 
                    src={banner2} 
                    alt="MyK Laticrete Waterproofing Solutions" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative aspect-[3/1] w-full overflow-hidden rounded-2xl shadow-xl">
                  <img 
                    src={banner3} 
                    alt="MyK Laticrete Floor Leveling Products" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
