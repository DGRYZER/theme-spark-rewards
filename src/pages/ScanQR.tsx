import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, QrCode, CheckCircle, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ScanQR = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<string | null>(null);
  const [pointsEarned, setPointsEarned] = useState(0);
  const { toast } = useToast();

  const recentScans = [
    { id: 1, product: "LATICRETE Adhesive Pro", points: 150, date: "2 days ago" },
    { id: 2, product: "LATICRETE Grout Maximizer", points: 100, date: "1 week ago" },
    { id: 3, product: "LATICRETE Waterproofing", points: 200, date: "2 weeks ago" },
  ];

  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate QR scan
    setTimeout(() => {
      const products = [
        { name: "LATICRETE TileFlex Plus", points: 150 },
        { name: "LATICRETE SpectraLOCK Pro", points: 200 },
        { name: "LATICRETE NXT Level Plus", points: 175 },
      ];
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      
      setScannedProduct(randomProduct.name);
      setPointsEarned(randomProduct.points);
      setIsScanning(false);
      
      toast({
        title: "QR Code Scanned!",
        description: `You earned ${randomProduct.points} points for ${randomProduct.name}`,
      });
    }, 2000);
  };

  const resetScan = () => {
    setScannedProduct(null);
    setPointsEarned(0);
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
              <QrCode className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-bold">Scan QR Code</h1>
          </div>
          <p className="text-primary-foreground/90 text-lg">Scan product QR codes to earn points</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        {/* Scanner Card */}
        <Card className="p-8">
          {!scannedProduct ? (
            <div className="text-center space-y-6">
              <div className="mx-auto w-64 h-64 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
                {isScanning ? (
                  <div className="animate-pulse">
                    <Camera className="h-24 w-24 text-primary" />
                    <div className="absolute inset-0 border-4 border-primary rounded-3xl animate-ping" />
                  </div>
                ) : (
                  <QrCode className="h-24 w-24 text-primary" />
                )}
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {isScanning ? "Scanning..." : "Ready to Scan"}
                </h2>
                <p className="text-muted-foreground">
                  {isScanning 
                    ? "Please hold steady while we scan your QR code" 
                    : "Find the QR code inside your LATICRETE product packaging"}
                </p>
              </div>
              
              <Button 
                size="lg" 
                onClick={handleScan}
                disabled={isScanning}
                className="px-8 py-6 text-lg"
              >
                <Camera className="h-5 w-5 mr-2" />
                {isScanning ? "Scanning..." : "Start Scanning"}
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
                <p className="text-xl font-semibold mb-1">{scannedProduct}</p>
                <p className="text-muted-foreground">Points added to your account</p>
              </div>
              
              <Button 
                size="lg" 
                onClick={resetScan}
                className="px-8 py-6 text-lg"
              >
                <QrCode className="h-5 w-5 mr-2" />
                Scan Another Product
              </Button>
            </div>
          )}
        </Card>

        {/* Recent Scans */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Scans</h2>
          <div className="space-y-3">
            {recentScans.map((scan) => (
              <Card key={scan.id} className="p-5 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <QrCode className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-base">{scan.product}</p>
                      <p className="text-sm text-muted-foreground">{scan.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-xl text-primary">
                      +{scan.points}
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
          <h3 className="font-bold text-lg mb-3">How to Scan</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary mt-0.5">1.</span>
              <span>Look for the QR code sticker inside your LATICRETE product packaging</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary mt-0.5">2.</span>
              <span>Click "Start Scanning" and point your camera at the QR code</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary mt-0.5">3.</span>
              <span>Wait for the scan to complete and earn your points instantly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary mt-0.5">4.</span>
              <span>Each product can only be scanned once</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default ScanQR;
