// ConversionRequestForm.tsx
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, ArrowLeft, AlertCircle, Database, RefreshCw, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

interface OrderOption {
  id: string;
  orderNumber: string;
  accountName: string;
  totalAmount: number;
  status: string;
}

interface DealerOption {
  id: string;
  name: string;
  city: string;
  state: string;
  type: string;
}

interface PicklistValue {
  label: string;
  value: string;
  isDefault: boolean;
}

interface LookupData {
  orders: OrderOption[];
  dealers: DealerOption[];
  statusValues: PicklistValue[];
  success: boolean;
  message: string;
}

// Dummy data
const DUMMY_ORDERS: OrderOption[] = [
  { id: "order-001", orderNumber: "ORD-2024-001", accountName: "ABC Manufacturing", totalAmount: 12500.75, status: "Pending" },
  { id: "order-002", orderNumber: "ORD-2024-002", accountName: "XYZ Corp", totalAmount: 8500.50, status: "Processing" },
  { id: "order-003", orderNumber: "ORD-2024-003", accountName: "Global Industries", totalAmount: 22500.25, status: "Shipped" },
  { id: "order-004", orderNumber: "ORD-2024-004", accountName: "Tech Solutions Inc", totalAmount: 18000.00, status: "Delivered" },
  { id: "order-005", orderNumber: "ORD-2024-005", accountName: "BuildRight Construction", totalAmount: 32000.99, status: "Pending" },
];

const DUMMY_DEALERS: DealerOption[] = [
  { id: "dealer-001", name: "Steel Distributors Inc", city: "Chicago", state: "IL", type: "Wholesale" },
  { id: "dealer-002", name: "Metalworks Supply Co", city: "Houston", state: "TX", type: "Retail" },
  { id: "dealer-003", name: "Industrial Metals LLC", city: "Detroit", state: "MI", type: "Wholesale" },
  { id: "dealer-004", name: "Precision Steelworks", city: "Los Angeles", state: "CA", type: "Manufacturer" },
  { id: "dealer-005", name: "Alloy Specialists", city: "Pittsburgh", state: "PA", type: "Distributor" },
];

const DUMMY_STATUS_VALUES: PicklistValue[] = [
  { label: "Pending", value: "Pending", isDefault: true },
  { label: "In Progress", value: "In Progress", isDefault: false },
  { label: "Completed", value: "Completed", isDefault: false },
  { label: "Cancelled", value: "Cancelled", isDefault: false },
];

const ConversionRequestForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lookupData, setLookupData] = useState<LookupData>({ 
    orders: [], 
    dealers: [], 
    statusValues: [],
    success: false, 
    message: '' 
  });
  const [formData, setFormData] = useState({
    orderId: "",
    dealerId: ""
  });
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [submissionResult, setSubmissionResult] = useState<{
    recordId: string;
    requestNumber: string;
    statusValue: string;
  } | null>(null);
  
  const { toast } = useToast();

  // Fetch dummy lookup data
  const fetchLookupData = async (retryCount = 0) => {
    setIsLoading(true);
    setDebugInfo(prev => prev + `\n\nFetching dummy data (attempt ${retryCount + 1})...`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      // Simulate random failures for testing
      if (Math.random() < 0.1 && retryCount < 2) { // 10% chance of failure
        throw new Error("Simulated network error");
      }
      
      setLookupData({
        orders: DUMMY_ORDERS,
        dealers: DUMMY_DEALERS,
        statusValues: DUMMY_STATUS_VALUES,
        success: true,
        message: `Loaded ${DUMMY_ORDERS.length} orders and ${DUMMY_DEALERS.length} dealers from dummy data`
      });
      
      setDebugInfo(prev => prev + `\n✓ Dummy data loaded: ${DUMMY_ORDERS.length} orders, ${DUMMY_DEALERS.length} dealers`);
      
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setDebugInfo(prev => prev + `\n✗ Fetch Error: ${errorMsg}`);
      
      if (retryCount < 2) {
        setTimeout(() => fetchLookupData(retryCount + 1), 1000);
        return;
      }
      
      toast({
        title: "Data Load Error",
        description: "Failed to load dummy data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.orderId || !formData.dealerId) {
      toast({
        title: "Validation Error",
        description: "Please select both Order Number and Dealer Name",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setDebugInfo(prev => prev + `\n\nSubmitting form...\nOrder: ${formData.orderId}\nDealer: ${formData.dealerId}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Simulate random submission failure
      if (Math.random() < 0.05) { // 5% chance of failure
        throw new Error("Simulated submission error");
      }
      
      // Find selected order and dealer
      const selectedOrder = DUMMY_ORDERS.find(order => order.id === formData.orderId);
      const selectedDealer = DUMMY_DEALERS.find(dealer => dealer.id === formData.dealerId);
      
      // Generate dummy response
      const dummyResponse = {
        success: true,
        recordId: `rec-${Date.now()}`,
        requestNumber: `CR-${Math.floor(1000 + Math.random() * 9000)}`,
        statusValue: "Pending",
        message: `Conversion request created for Order ${selectedOrder?.orderNumber} and Dealer ${selectedDealer?.name}`
      };
      
      setDebugInfo(prev => prev + `\nSubmission Response: ${JSON.stringify(dummyResponse)}`);
      
      setSubmissionResult({
        recordId: dummyResponse.recordId,
        requestNumber: dummyResponse.requestNumber,
        statusValue: dummyResponse.statusValue
      });
      setIsSubmitted(true);
      
      toast({
        title: "Success!",
        description: `Conversion Request ${dummyResponse.requestNumber} created successfully`,
        variant: "default",
      });
      
      // Reset form
      setFormData({ orderId: "", dealerId: "" });
      
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Refresh data
  const handleRefresh = async () => {
    await fetchLookupData();
  };

  // Initialize
  useEffect(() => {
    setDebugInfo("Initializing with dummy data...");
    fetchLookupData();
  }, []);

  if (isSubmitted && submissionResult) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-primary px-4 py-12 text-primary-foreground">
          <div className="mx-auto max-w-6xl">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mb-6 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-4xl font-bold">Conversion Request</h1>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-16">
          <Card className="p-12">
            <div className="text-center space-y-6">
              <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-16 w-16 text-primary" />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-2">Request Submitted!</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Your conversion request has been successfully created (Dummy Data)
                </p>
                
                <div className="space-y-4 max-w-md mx-auto">
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground mb-1">Request Number</p>
                    <p className="text-2xl font-bold text-primary">{submissionResult.requestNumber}</p>
                  </div>
                   
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Request Status</p>
                        <p className="font-medium">{submissionResult.statusValue}</p>
                      </div>
                      <Badge variant={
                        submissionResult.statusValue === 'Pending' ? 'secondary' :
                        submissionResult.statusValue === 'Converted' ? 'default' :
                        'destructive'
                      }>
                        {submissionResult.statusValue}
                      </Badge>
                    </div>
                  </div>
                  

                </div>
              </div>
              
              <div className="pt-6">
                <Button 
                  size="lg" 
                  onClick={() => {
                    setIsSubmitted(false);
                    setSubmissionResult(null);
                  }}
                  className="px-8"
                >
                  Create Another Request
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => window.location.href = '/'}
                  className="px-8 ml-4"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-background">
    {/* Header */}
    <div className="bg-primary px-4 py-6 sm:py-8 md:py-12 text-primary-foreground">
      <div className="mx-auto w-full max-w-6xl">
        <Link to="/">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-4 sm:mb-6 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Create Conversion Request
            </h1>
            <p className="text-primary-foreground/90 text-base sm:text-lg mt-1 sm:mt-2">
              Submit a new conversion request (Using Dummy Data)
            </p>
          </div>
          
          <Button 
            variant="secondary" 
            onClick={handleRefresh}
            disabled={isLoading}
            className="text-primary-foreground bg-primary-foreground/20 hover:bg-primary-foreground/30 w-full sm:w-auto"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>
      </div>
    </div>

    {/* Form Content */}
    <div className="mx-auto w-full max-w-6xl px-3 sm:px-4 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="p-4 sm:p-6 md:p-8">
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <Info className="h-5 w-5 text-blue-600 mr-2" />
                <p className="text-sm text-blue-700">
                  <strong>Demo Mode:</strong> Using dummy data. No Salesforce connection.
                </p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Order Number Dropdown */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="orderNumber" className="text-sm sm:text-base font-medium">
                    Order Number *
                  </Label>
                  {lookupData.orders.length > 0 && (
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {lookupData.orders.length} orders available
                    </span>
                  )}
                </div>
                <Select
                  value={formData.orderId}
                  onValueChange={(value) => setFormData({ ...formData, orderId: value })}
                  disabled={isLoading}
                >
                  <SelectTrigger className="h-10 sm:h-12">
                    <SelectValue placeholder={
                      isLoading ? "Loading orders..." : "Select an order"
                    } />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoading ? (
                      <div className="flex items-center justify-center p-4">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Loading orders...
                      </div>
                    ) : lookupData.orders.length > 0 ? (
                      lookupData.orders.map((order) => (
                        <SelectItem key={order.id} value={order.id}>
                          <div className="flex flex-col py-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm sm:text-base">
                                Order #{order.orderNumber}
                              </span>
                              <Badge variant="outline" className="ml-2 text-xs">
                                ${order.totalAmount.toLocaleString()}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground mt-1">
                              {order.accountName} • {order.status}
                            </span>
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-4 text-center">
                        <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-yellow-500 mb-2" />
                        <p className="font-medium text-sm sm:text-base">No orders found</p>
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Dealer Name Dropdown */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="dealerName" className="text-sm sm:text-base font-medium">
                    Dealer Name *
                  </Label>
                  {lookupData.dealers.length > 0 && (
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {lookupData.dealers.length} dealers available
                    </span>
                  )}
                </div>
                <Select
                  value={formData.dealerId}
                  onValueChange={(value) => setFormData({ ...formData, dealerId: value })}
                  disabled={isLoading}
                >
                  <SelectTrigger className="h-10 sm:h-12">
                    <SelectValue placeholder={
                      isLoading ? "Loading dealers..." : "Select a dealer"
                    } />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoading ? (
                      <div className="flex items-center justify-center p-4">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Loading dealers...
                      </div>
                    ) : lookupData.dealers.length > 0 ? (
                      lookupData.dealers.map((dealer) => (
                        <SelectItem key={dealer.id} value={dealer.id}>
                          <div className="flex flex-col py-1">
                            <span className="font-medium text-sm sm:text-base">{dealer.name}</span>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {dealer.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {dealer.city}, {dealer.state}
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-4 text-center">
                        <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-yellow-500 mb-2" />
                        <p className="font-medium text-sm sm:text-base">No dealers found</p>
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <div className="pt-2 sm:pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || isLoading || lookupData.orders.length === 0 || lookupData.dealers.length === 0}
                  className="w-full h-10 sm:h-12 text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin mr-2" />
                      Creating Request...
                    </>
                  ) : (
                    "Submit Conversion Request"
                  )}
                </Button>
                {(lookupData.orders.length === 0 || lookupData.dealers.length === 0) && (
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 text-center">
                    {lookupData.orders.length === 0 ? 'No orders available. ' : ''}
                    {lookupData.dealers.length === 0 ? 'No dealers available. ' : ''}
                    Please refresh or check data.
                  </p>
                )}
              </div>
            </form>
          </Card>

          {/* Instructions */}
          <Card className="p-4 sm:p-6 mt-4 sm:mt-6 bg-muted/30">
            <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">How it works (Demo Mode):</h3>
            <ol className="list-decimal pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>Select an Order Number from the dropdown (dummy data)</li>
              <li>Select a Dealer Name from the dropdown (dummy data)</li>
              <li>Click "Submit Conversion Request" to create a dummy record</li>
              <li>The system will automatically set status to <strong>"Pending"</strong></li>
              <li>A dummy record will be created (no actual Salesforce connection)</li>
            </ol>
          </Card>
        </div>
        
        {/* Debug Panel */}
        <div className="lg:col-span-1">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <Database className="h-5 w-5 mr-2 text-blue-600" />
              <h3 className="font-semibold">Debug Info</h3>
            </div>
            <div className="text-xs bg-muted p-3 rounded-lg overflow-auto max-h-64">
              <pre className="whitespace-pre-wrap">
                {debugInfo || "No debug information available"}
              </pre>
            </div>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-800">
                <strong>Note:</strong> This is a demo version with dummy data. 
                All submissions are simulated and no data is actually saved.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
);
};

export default ConversionRequestForm;
