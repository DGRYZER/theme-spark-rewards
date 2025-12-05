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
  const [accessToken, setAccessToken] = useState<string>("");
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [apiEndpoint, setApiEndpoint] = useState<string>("");
  const [submissionResult, setSubmissionResult] = useState<{
    recordId: string;
    requestNumber: string;
    statusValue: string;
  } | null>(null);
  
  const { toast } = useToast();
  const INFLUENCER_ID = '001fo00000C5gZDAAZ';

  // Get access token
  const getAccessToken = async () => {
    setDebugInfo(prev => prev + "\n\nStarting authentication...");
    const salesforceUrl = "https://arssteelgroup-dev-ed.develop.my.salesforce.com/services/oauth2/token";
    const clientId = "3MVG9XDDwp5wgbs0GBXn.nVBDZ.vhpls3uA9Kt.F0F5kdFtHSseF._pbUChPd76LvA0AdGGrLu7SfDmwhvCYl";
    const clientSecret = "D63B980DDDE3C45170D6F9AE12215FCB6A7490F97E383E579BE8DEE427A0D891";

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);

    try {
      setDebugInfo(prev => prev + "\nSending OAuth request...");
      const response = await fetch(salesforceUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded' 
        },
        body: params
      });
      
      const data = await response.json();
      
      if (data.access_token) {
        setAccessToken(data.access_token);
        setDebugInfo(prev => prev + "\n✓ Authentication successful");
        return data.access_token;
      } else {
        setDebugInfo(prev => prev + `\n✗ Authentication failed: ${JSON.stringify(data)}`);
        toast({
          title: "Authentication Error",
          description: "Failed to get access token from Salesforce",
          variant: "destructive",
        });
        return null;
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setDebugInfo(prev => prev + `\n✗ Authentication error: ${errorMsg}`);
      toast({
        title: "Authentication Error",
        description: "Failed to authenticate with Salesforce",
        variant: "destructive",
      });
      return null;
    }
  };

  // Fetch lookup data
  const fetchLookupData = async (token: string, retryCount = 0) => {
    setIsLoading(true);
    setDebugInfo(prev => prev + `\n\nFetching lookup data (attempt ${retryCount + 1})...`);
    
    try {
      const endpoint = 'https://arssteelgroup-dev-ed.develop.my.salesforce.com/services/apexrest/api/conversion-request';
      setApiEndpoint(endpoint);
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      setDebugInfo(prev => prev + `\nAPI Response Status: ${response.status}`);
      
      const text = await response.text();
      setDebugInfo(prev => prev + `\nAPI Response Body: ${text.substring(0, 500)}...`);
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        setDebugInfo(prev => prev + `\n✗ JSON Parse Error: ${parseError}`);
        if (retryCount < 2) {
          setTimeout(() => fetchLookupData(token, retryCount + 1), 1000);
          return;
        }
        throw new Error('Invalid JSON response from server');
      }
      
      if (data.success) {
        setLookupData({
          orders: data.orders || [],
          dealers: data.dealers || [],
          statusValues: data.statusValues || [],
          success: true,
          message: data.message || `Loaded ${data.orders?.length || 0} orders and ${data.dealers?.length || 0} dealers`
        });
        setDebugInfo(prev => prev + `\n✓ Data loaded: ${data.orders?.length || 0} orders, ${data.dealers?.length || 0} dealers, ${data.statusValues?.length || 0} status values`);
      } else {
        setDebugInfo(prev => prev + `\n✗ API Error: ${data.message || 'Unknown error'}`);
        toast({
          title: "Data Fetch Error",
          description: data.message || "Failed to fetch data from Salesforce",
          variant: "destructive",
        });
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setDebugInfo(prev => prev + `\n✗ Fetch Error: ${errorMsg}`);
      
      if (retryCount < 2) {
        setTimeout(() => fetchLookupData(token, retryCount + 1), 1000);
        return;
      }
      
      toast({
        title: "Network Error",
        description: "Failed to connect to Salesforce API",
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
    
    try {
      const token = accessToken || await getAccessToken();
      if (!token) {
        throw new Error("Failed to get access token");
      }

      const requestBody = {
        orderId: formData.orderId,
        dealerId: formData.dealerId
      };

      const response = await fetch(
        'https://arssteelgroup-dev-ed.develop.my.salesforce.com/services/apexrest/api/conversion-request',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        }
      );
      
      const result = await response.json();
      setDebugInfo(prev => prev + `\nSubmission Response: ${JSON.stringify(result)}`);
      
      if (result.success) {
        setSubmissionResult({
          recordId: result.recordId,
          requestNumber: result.requestNumber,
          statusValue: result.statusValue || 'Pending'
        });
        setIsSubmitted(true);
        
        toast({
          title: "Success!",
          description: `Conversion Request ${result.requestNumber} created successfully`,
          variant: "default",
        });
        
        // Reset form
        setFormData({ orderId: "", dealerId: "" });
      } else {
        throw new Error(result.message || "Failed to create conversion request");
      }
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
    const token = accessToken || await getAccessToken();
    if (token) {
      await fetchLookupData(token);
    }
  };

  // Initialize
  useEffect(() => {
    const initialize = async () => {
      setDebugInfo("Initializing...");
      const token = await getAccessToken();
      if (token) {
        await fetchLookupData(token);
      }
    };
    initialize();
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
                  Your conversion request has been successfully created in Salesforce
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
              Submit a new conversion request to Salesforce
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
                            </div>
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
                            {dealer.type && (
                              <Badge variant="secondary" className="text-xs mt-1 self-start">
                                {dealer.type}
                              </Badge>
                            )}
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
                    Please refresh or check Salesforce data.
                  </p>
                )}
              </div>
            </form>
          </Card>

          {/* Instructions */}
          <Card className="p-4 sm:p-6 mt-4 sm:mt-6 bg-muted/30">
            <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">How it works:</h3>
            <ol className="list-decimal pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>Select an Order Number from the dropdown (fetched from Salesforce)</li>
              <li>Select a Dealer Name from the dropdown (fetched from Salesforce)</li>
              <li>Click "Submit Conversion Request" to create the record</li>
              <li>The system will automatically set status to <strong>"Pending"</strong></li>
              <li>A new Conversion_Request__c record will be created in Salesforce</li>
            </ol>
          </Card>
        </div>
        
        {/* Right Sidebar - Add this if you have content for it */}
        <div className="lg:col-span-1">
          {/* Add any additional sidebar content here */}
        </div>
      </div>
    </div>
  </div>
);
};

export default ConversionRequestForm;
