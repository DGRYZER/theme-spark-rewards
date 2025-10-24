import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Mail, Star, Trophy, TrendingUp, Award } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Profile = () => {
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    memberSince: "January 2024",
    currentTier: "Gold",
    totalPoints: 2450,
    lifetimeEarned: 15750,
    lifetimeRedeemed: 13300,
  };

  const tiers = [
    { name: "Bronze", minPoints: 0, color: "from-orange-700 to-orange-500" },
    { name: "Silver", minPoints: 1000, color: "from-gray-500 to-gray-300" },
    { name: "Gold", minPoints: 3000, color: "from-yellow-600 to-yellow-400" },
    { name: "Platinum", minPoints: 10000, color: "from-purple-600 to-purple-400" },
  ];

  const achievements = [
    { id: 1, title: "First Redemption", description: "Redeemed your first reward", unlocked: true },
    { id: 2, title: "Point Collector", description: "Earned 10,000+ points", unlocked: true },
    { id: 3, title: "Loyal Member", description: "Member for 6 months", unlocked: false },
    { id: 4, title: "Gold Status", description: "Reached Gold tier", unlocked: true },
    { id: 5, title: "Referral Master", description: "Referred 5 friends", unlocked: false },
    { id: 6, title: "Big Spender", description: "Redeemed 20+ rewards", unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with avatar prominence */}
      <div className="bg-primary px-4 pb-24 pt-12 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary-foreground rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        
        <div className="mx-auto max-w-4xl relative z-10">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-6 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-secondary shadow-xl">
              <AvatarFallback className="text-3xl bg-secondary text-secondary-foreground font-bold">
                {user.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
              <div className="flex items-center gap-2 mb-3">
                <Mail className="h-4 w-4" />
                <span className="text-primary-foreground/90">{user.email}</span>
              </div>
              <Badge className="bg-secondary text-secondary-foreground shadow-md px-4 py-1.5">
                <Star className="h-4 w-4 mr-1.5 fill-current" />
                {user.currentTier} Member
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 -mt-12 relative z-20 space-y-8 pb-8">
        {/* Stats Overview */}
        <div className="grid sm:grid-cols-3 gap-6">
          <Card className="p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-3 rounded-2xl bg-primary/10 w-fit mx-auto mb-4 shadow-sm">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mb-2 font-semibold uppercase tracking-wide">Current Points</p>
            <p className="text-3xl font-bold text-primary">{user.totalPoints.toLocaleString()}</p>
          </Card>

          <Card className="p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-3 rounded-2xl bg-primary/10 w-fit mx-auto mb-4 shadow-sm">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mb-2 font-semibold uppercase tracking-wide">Lifetime Earned</p>
            <p className="text-3xl font-bold">{user.lifetimeEarned.toLocaleString()}</p>
          </Card>

          <Card className="p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-3 rounded-2xl bg-primary/10 w-fit mx-auto mb-4 shadow-sm">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mb-2 font-semibold uppercase tracking-wide">Lifetime Redeemed</p>
            <p className="text-3xl font-bold">{user.lifetimeRedeemed.toLocaleString()}</p>
          </Card>
        </div>

        {/* Tier Progress */}
        <Card className="p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Star className="h-6 w-6 text-primary" />
            </div>
            Your Tier Progress
          </h2>
          
          <div className="space-y-4">
            {tiers.map((tier) => {
              const isCurrent = tier.name === user.currentTier;
              const isUnlocked = user.lifetimeEarned >= tier.minPoints;
              
              return (
                <div key={tier.name} className="relative">
                  <div className={`flex items-center justify-between p-5 rounded-2xl transition-all ${
                    isCurrent 
                      ? "bg-primary/10 shadow-md" 
                      : isUnlocked 
                      ? "bg-card shadow-sm"
                      : "bg-muted/20"
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-2xl ${isCurrent ? 'bg-primary shadow-lg' : isUnlocked ? 'bg-primary/80 shadow-md' : 'bg-muted'} flex items-center justify-center`}>
                        <Trophy className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-bold text-lg">{tier.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {tier.minPoints.toLocaleString()}+ points
                        </p>
                      </div>
                    </div>
                    
                    {isCurrent && (
                      <Badge className="bg-primary shadow-md">Current Tier</Badge>
                    )}
                    {isUnlocked && !isCurrent && (
                      <Badge variant="outline">Unlocked</Badge>
                    )}
                    {!isUnlocked && (
                      <Badge variant="outline" className="opacity-50">Locked</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Award className="h-6 w-6 text-primary" />
            </div>
            Achievements
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`p-5 shadow-md hover:shadow-lg transition-all duration-300 ${
                  achievement.unlocked 
                    ? "bg-primary/5" 
                    : "opacity-50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl shrink-0 shadow-sm ${
                    achievement.unlocked 
                      ? "bg-primary/10 text-primary" 
                      : "bg-muted"
                  }`}>
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-base mb-1">{achievement.title}</p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <Badge className="bg-primary shrink-0 shadow-sm">
                      <Trophy className="h-3 w-3" />
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Member Info */}
        <Card className="p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <User className="h-6 w-6 text-primary" />
            </div>
            Member Information
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between py-4 border-b-2">
              <span className="text-muted-foreground font-medium">Member Since</span>
              <span className="font-bold">{user.memberSince}</span>
            </div>
            <div className="flex justify-between py-4 border-b-2">
              <span className="text-muted-foreground font-medium">Account Status</span>
              <Badge variant="outline" className="border-primary text-primary">Active</Badge>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-muted-foreground font-medium">Rewards Redeemed</span>
              <span className="font-bold">12</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
