import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calculator, Package, Info } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CoverageCalculator = () => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [tileSize, setTileSize] = useState("");
  const [productType, setProductType] = useState("");
  const [result, setResult] = useState<{
    area: number;
    bags: number;
    coverage: number;
  } | null>(null);

  const products = [
    { name: "254 Platinum Adhesive", coverage: 50, unit: "sq ft/bag" },
    { name: "257 TITANIUM", coverage: 60, unit: "sq ft/bag" },
    { name: "SpectraLOCK Pro Grout", coverage: 35, unit: "sq ft/bag" },
    { name: "NXT Level Plus", coverage: 100, unit: "sq ft/bag" },
    { name: "HYDRO BAN", coverage: 150, unit: "sq ft/gallon" },
  ];

  const tileSizes = [
    "Small (< 4x4 inches)",
    "Medium (4x4 to 12x12 inches)",
    "Large (12x12 to 24x24 inches)",
    "Extra Large (> 24x24 inches)"
  ];

  const handleCalculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    
    if (!l || !w || !productType) {
      return;
    }

    const area = l * w;
    const selectedProduct = products.find(p => p.name === productType);
    
    if (!selectedProduct) return;

    // Add 10% waste factor
    const totalCoverage = area * 1.1;
    const bagsNeeded = Math.ceil(totalCoverage / selectedProduct.coverage);

    setResult({
      area: area,
      bags: bagsNeeded,
      coverage: selectedProduct.coverage
    });
  };

  const handleReset = () => {
    setLength("");
    setWidth("");
    setTileSize("");
    setProductType("");
    setResult(null);
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
              <Calculator className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-bold">Coverage Calculator</h1>
          </div>
          <p className="text-primary-foreground/90 text-lg">Calculate the amount of product needed for your project</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calculator className="h-6 w-6 text-primary" />
              Project Details
            </h2>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="length">Length (feet)</Label>
                <Input
                  id="length"
                  type="number"
                  placeholder="Enter length"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="width">Width (feet)</Label>
                <Input
                  id="width"
                  type="number"
                  placeholder="Enter width"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tile-size">Tile Size</Label>
                <Select value={tileSize} onValueChange={setTileSize}>
                  <SelectTrigger id="tile-size">
                    <SelectValue placeholder="Select tile size" />
                  </SelectTrigger>
                  <SelectContent>
                    {tileSizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product">LATICRETE Product</Label>
                <Select value={productType} onValueChange={setProductType}>
                  <SelectTrigger id="product">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.name} value={product.name}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  onClick={handleCalculate} 
                  className="flex-1"
                  disabled={!length || !width || !productType}
                >
                  Calculate
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  className="flex-1"
                >
                  Reset
                </Button>
              </div>
            </div>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {result ? (
              <>
                <Card className="p-6 bg-primary/5 border-primary/20">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Package className="h-6 w-6 text-primary" />
                    Your Results
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-background border">
                      <p className="text-sm text-muted-foreground mb-1">Total Area</p>
                      <p className="text-3xl font-bold text-primary">
                        {result.area.toFixed(2)} sq ft
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-background border">
                      <p className="text-sm text-muted-foreground mb-1">Product Coverage</p>
                      <p className="text-2xl font-bold">
                        {result.coverage} sq ft/bag
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-primary text-primary-foreground">
                      <p className="text-sm opacity-90 mb-2">Products Needed</p>
                      <p className="text-5xl font-bold mb-1">{result.bags}</p>
                      <p className="text-sm opacity-90">
                        {result.bags === 1 ? 'bag' : 'bags'} (includes 10% waste factor)
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 bg-muted/30">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p className="font-semibold text-foreground">Important Notes:</p>
                      <p>• Always buy extra material for cuts and waste</p>
                      <p>• Coverage may vary based on substrate and application method</p>
                      <p>• Consult product datasheet for specific requirements</p>
                    </div>
                  </div>
                </Card>
              </>
            ) : (
              <Card className="p-12 text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  <Calculator className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Calculate Coverage</h3>
                <p className="text-muted-foreground">
                  Fill in your project details to see how much product you'll need
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Product Reference */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Product Coverage Reference</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.name} className="p-4 rounded-xl border bg-muted/30">
                <p className="font-semibold mb-1">{product.name}</p>
                <p className="text-sm text-primary font-bold">
                  {product.coverage} {product.unit}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CoverageCalculator;
