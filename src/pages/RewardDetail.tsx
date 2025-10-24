import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Gift, Check, AlertCircle, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const RewardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);

  const userPoints = 2450;

  // Mock reward data
  const reward = {
    id: id,
    title: "$25 Gift Card",
    points: 2000,
    description: "Universal gift card valid at thousands of locations",
    category: "Gift Cards",
    popular: true,
    terms: [
      "Gift card is valid for 12 months from redemption date",
      "Can be used online or in-store",
      "Non-refundable and cannot be exchanged for cash",
      "Check balance at participating locations",
    ],
    features: [
      "Instant digital delivery",
      "No expiration fees",
      "Easy to use",
      "Wide acceptance",
    ],
  };

  const canAfford = userPoints >= reward.points;

  const handleRedeem = async () => {
    setIsRedeeming(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsRedeeming(false);
    setShowConfirm(false);
    
    toast({
      title: "Reward Redeemed! 🎉",
      description: `${reward.title} has been added to your account. Check your email for details.`,
    });
    
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary px-4 py-12 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-primary-foreground rounded-full -translate-y-1/2" />
        </div>
        
        <div className="mx-auto max-w-4xl relative z-10">
          <Link to="/catalog">
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10 rounded-xl">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Catalog
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Reward Image */}
          <Card className="overflow-hidden shadow-lg">
            <div className="aspect-square bg-primary/5 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <Gift className="h-40 w-40 text-primary relative z-10" />
              {reward.popular && (
                <Badge className="absolute top-6 right-6 bg-secondary text-secondary-foreground shadow-lg px-4 py-2">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Popular Choice
                </Badge>
              )}
            </div>
          </Card>

          {/* Reward Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-4 px-4 py-1.5">{reward.category}</Badge>
              <h1 className="text-4xl font-bold mb-4">{reward.title}</h1>
              <p className="text-muted-foreground text-lg">{reward.description}</p>
            </div>

            <Card className="p-8 bg-primary/5 shadow-lg">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-5xl font-bold text-primary">
                  {reward.points.toLocaleString()}
                </span>
                <span className="text-muted-foreground text-lg">points</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">You have:</span>
                <span className={`font-bold text-lg ${canAfford ? "text-primary" : "text-destructive"}`}>
                  {userPoints.toLocaleString()} pts
                </span>
              </div>
            </Card>

            {!canAfford && (
              <Card className="p-6 bg-destructive/5 shadow-md">
                <div className="flex gap-4">
                  <div className="p-2 rounded-xl bg-destructive/10 h-fit">
                    <AlertCircle className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <p className="font-bold text-destructive mb-2 text-lg">
                      Not enough points
                    </p>
                    <p className="text-sm text-muted-foreground">
                      You need {(reward.points - userPoints).toLocaleString()} more points to redeem this reward.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            <Button 
              className="w-full h-14 text-lg font-bold shadow-lg"
              onClick={() => setShowConfirm(true)}
              disabled={!canAfford}
            >
              {canAfford ? "Redeem Now" : "Insufficient Points"}
            </Button>

            {/* Features */}
            <div>
              <h3 className="font-bold text-xl mb-4">What's Included</h3>
              <div className="grid grid-cols-2 gap-4">
                {reward.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 shadow-sm">
                      <Check className="h-4 w-4 text-primary font-bold" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <Card className="mt-8 p-8 shadow-lg">
          <h3 className="font-bold text-xl mb-5">Terms & Conditions</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {reward.terms.map((term, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-primary font-bold text-lg">•</span>
                <span className="leading-relaxed">{term}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Confirm Redemption</DialogTitle>
            <DialogDescription className="text-base">
              Are you sure you want to redeem this reward?
            </DialogDescription>
          </DialogHeader>
          
          <Card className="p-6 bg-muted/30 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-lg">{reward.title}</span>
              <span className="font-bold text-2xl text-primary">{reward.points.toLocaleString()} pts</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Remaining balance:</span>
              <span className="font-bold text-lg">{(userPoints - reward.points).toLocaleString()} pts</span>
            </div>
          </Card>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirm(false)} disabled={isRedeeming} size="lg">
              Cancel
            </Button>
            <Button onClick={handleRedeem} disabled={isRedeeming} size="lg">
              {isRedeeming ? "Processing..." : "Confirm Redemption"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RewardDetail;
