import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Share2, Phone, Copy, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import QRCode from "react-qr-code";

const ReferFriend = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [copied, setCopied] = useState(false);

  // Generate unique referral code (in real app, this would come from backend)
  const referralCode = "MYK-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  const referralUrl = `${window.location.origin}/signup?ref=${referralCode}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareViaPhone = () => {
    if (!phoneNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter a phone number",
        variant: "destructive",
      });
      return;
    }

    const message = `Join MyKLaticrete and earn rewards! Use my referral code: ${referralCode} or visit ${referralUrl}`;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Opening WhatsApp",
      description: "Share your referral link with your friend",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join MyKLaticrete',
          text: `Use my referral code: ${referralCode}`,
          url: referralUrl,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      handleCopyCode();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Refer a Friend
              </h1>
              <p className="text-sm text-muted-foreground">
                Earn 500 points for each successful referral
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Reward Info Card */}
        <Card className="mb-6 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-primary" />
              Referral Rewards
            </CardTitle>
            <CardDescription>
              Share MyKLaticrete with friends and both of you earn rewards!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">You earn 500 points</p>
                  <p className="text-sm text-muted-foreground">When your friend makes their first purchase</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">They earn 200 points</p>
                  <p className="text-sm text-muted-foreground">Bonus welcome points on signup</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* QR Code Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Share QR Code</CardTitle>
            <CardDescription>
              Let your friend scan this QR code to sign up
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <QRCode value={referralUrl} size={200} />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Input
                value={referralCode}
                readOnly
                className="text-center font-mono text-lg font-bold"
              />
              <Button onClick={handleCopyCode} size="icon" variant="outline">
                {copied ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Phone Share Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Share via Phone
            </CardTitle>
            <CardDescription>
              Enter phone number to share via WhatsApp
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="tel"
                placeholder="+1234567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleShareViaPhone} className="shrink-0">
                <Share2 className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Share Button */}
        <Button onClick={handleShare} className="w-full" size="lg">
          <Share2 className="h-5 w-5 mr-2" />
          Share Referral Link
        </Button>
      </div>
    </div>
  );
};

export default ReferFriend;
