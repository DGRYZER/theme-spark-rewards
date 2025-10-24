import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Gift, TrendingUp, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const History = () => {
  const activities = [
    { id: 1, type: "earned", amount: 150, description: "Purchase reward", date: "2024-01-15", time: "10:30 AM" },
    { id: 2, type: "redeemed", amount: -500, description: "$10 Gift Card", date: "2024-01-13", time: "2:15 PM" },
    { id: 3, type: "earned", amount: 200, description: "Referral bonus", date: "2024-01-10", time: "9:45 AM" },
    { id: 4, type: "earned", amount: 100, description: "Daily login", date: "2024-01-09", time: "8:00 AM" },
    { id: 5, type: "earned", amount: 300, description: "Special promotion", date: "2024-01-08", time: "3:20 PM" },
    { id: 6, type: "redeemed", amount: -1000, description: "$25 Gift Card", date: "2024-01-07", time: "11:00 AM" },
    { id: 7, type: "earned", amount: 150, description: "Purchase reward", date: "2024-01-05", time: "4:30 PM" },
    { id: 8, type: "earned", amount: 250, description: "Milestone bonus", date: "2024-01-03", time: "1:15 PM" },
  ];

  const earnedActivities = activities.filter(a => a.type === "earned");
  const redeemedActivities = activities.filter(a => a.type === "redeemed");

  const totalEarned = earnedActivities.reduce((sum, a) => sum + a.amount, 0);
  const totalRedeemed = Math.abs(redeemedActivities.reduce((sum, a) => sum + a.amount, 0));

  const ActivityCard = ({ activity }: { activity: typeof activities[0] }) => (
    <Card className="p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className={`p-3 rounded-xl shrink-0 shadow-sm ${
            activity.type === "earned" 
              ? "bg-primary/10 text-primary" 
              : "bg-muted text-muted-foreground"
          }`}>
            {activity.type === "earned" ? (
              <Trophy className="h-6 w-6" />
            ) : (
              <Gift className="h-6 w-6" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-base mb-2">{activity.description}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{activity.date}</span>
              <span>•</span>
              <span>{activity.time}</span>
            </div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className={`font-bold text-2xl ${
            activity.type === "earned" ? "text-primary" : "text-muted-foreground"
          }`}>
            {activity.amount > 0 ? "+" : ""}{activity.amount}
          </span>
          <p className="text-xs text-muted-foreground mt-1">points</p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary px-4 py-8 text-primary-foreground border-b-2 border-primary-foreground/10">
        <div className="mx-auto max-w-4xl">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4 text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Activity History</h1>
          </div>
          <p className="text-primary-foreground/80">Track all your points and redemptions</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-auto max-w-4xl px-4 py-6">
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Card className="p-6 bg-primary/5 border-2 border-primary/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-primary/10">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Total Earned</span>
            </div>
            <p className="text-3xl font-bold text-primary">
              +{totalEarned.toLocaleString()}
              <span className="text-lg ml-2 text-muted-foreground">pts</span>
            </p>
          </Card>

          <Card className="p-6 bg-muted/30 border-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-muted">
                <Gift className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Total Redeemed</span>
            </div>
            <p className="text-3xl font-bold">
              {totalRedeemed.toLocaleString()}
              <span className="text-lg ml-2 text-muted-foreground">pts</span>
            </p>
          </Card>
        </div>

        {/* Activity List */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="all">All Activity</TabsTrigger>
            <TabsTrigger value="earned">
              Earned
              <Badge variant="secondary" className="ml-2">{earnedActivities.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="redeemed">
              Redeemed
              <Badge variant="secondary" className="ml-2">{redeemedActivities.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 mt-0">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </TabsContent>

          <TabsContent value="earned" className="space-y-4 mt-0">
            {earnedActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </TabsContent>

          <TabsContent value="redeemed" className="space-y-4 mt-0">
            {redeemedActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default History;
