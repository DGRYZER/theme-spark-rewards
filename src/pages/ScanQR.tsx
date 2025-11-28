import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Package, CheckCircle, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ScanQR = () => {
  const [volume, setVolume] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedVolume, setSubmittedVolume] = useState<number | null>(null);
  const [pointsEarned, setPointsEarned] = useState(0);
  const { toast } = useToast();

  const recentEntries = [
    { id: 1, volume: 5.2, points: 520, date: "2 days ago" },
    { id: 2, volume: 3.8, points: 380, date: "1 week ago" },
    { id: 3, volume: 7.5, points: 750, date: "2 weeks ago" },
  ];

  const handleSubmit = () => {
    const volumeNum = parseFloat(volume);
    
    if (!volume || volumeNum <= 0) {
      toast({
        title: "Invalid Volume",
        description: "Please enter a valid TMT bar volume",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission - 100 points per tonne
    setTimeout(() => {
      const points = Math.round(volumeNum * 100);
      
      setSubmittedVolume(volumeNum);
      setPointsEarned(points);
      setIsSubmitting(false);
      
      toast({
        title: "Volume Submitted!",
        description: `You earned ${points} points for ${volumeNum} tonnes of TMT bars`,
      });
    }, 1500);
  };

  const resetForm = () => {
    setSubmittedVolume(null);
    setPointsEarned(0);
    setVolume("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary px-4 py-12 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-primary-foreground rounded-full -translate-y-1/2" />
          <div className="absolute bottom-0 left-1/4 w-56 h-56 bg-primary-foreground rounded-full translate-y-1/2" />
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
            <h1 className="text-4xl font-bold">Enter TMT Bar Volume</h1>
          </div>
          <p className="text-primary-foreground/90 text-lg">Enter your TMT bar purchase volume to earn points</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        {/* Volume Entry Card */}
        <Card className="p-8">
          {!submittedVolume ? (
            <div className="space-y-6 max-w-md mx-auto">
              <div className="text-center space-y-4">
                <div className="mx-auto w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <Package className="h-12 w-12 text-primary" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-2">Enter Volume</h2>
                  <p className="text-muted-foreground">
                    Enter the volume of TMT bars purchased (in tonnes)
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Volume (Tonnes)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g., 5.5"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="text-lg h-14"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Points to earn:</span>
                    <span className="font-bold text-primary text-lg">
                      {volume && parseFloat(volume) > 0 ? Math.round(parseFloat(volume) * 100) : 0} points
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">100 points per tonne</p>
                </div>
              </div>
              
              <Button 
                size="lg" 
                onClick={handleSubmit}
                disabled={isSubmitting || !volume || parseFloat(volume) <= 0}
                className="w-full py-6 text-lg"
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                {isSubmitting ? "Processing..." : "Submit Volume"}
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-16 w-16 text-primary" />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-2 text-primary">
                  +{pointsEarned} Points!
                </h2>
                <p className="text-xl font-semibold mb-1">{submittedVolume} tonnes</p>
                <p className="text-muted-foreground">Points added to your account</p>
              </div>
              
              <Button 
                size="lg" 
                onClick={resetForm}
                className="px-8 py-6 text-lg"
              >
                <Package className="h-5 w-5 mr-2" />
                Enter Another Volume
              </Button>
            </div>
          )}
        </Card>

        {/* Recent Entries */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Entries</h2>
          <div className="space-y-3">
            {recentEntries.map((entry) => (
              <Card key={entry.id} className="p-5 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-base">{entry.volume} tonnes TMT Bars</p>
                      <p className="text-sm text-muted-foreground">{entry.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-xl text-primary">
                      +{entry.points}
                    </span>
                    <p className="text-xs text-muted-foreground">points</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <Card className="p-6 bg-muted/30">
          <h3 className="font-bold text-lg mb-3">How It Works</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary mt-0.5">1.</span>
              <span>Enter the volume of ARS Steels TMT bars you purchased (in tonnes)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary mt-0.5">2.</span>
              <span>You'll earn 100 points per tonne of TMT bars</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary mt-0.5">3.</span>
              <span>Your points will be added to your account instantly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary mt-0.5">4.</span>
              <span>Redeem your points for exciting rewards and benefits</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default ScanQR;
