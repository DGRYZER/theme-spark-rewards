import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Trophy, 
  Gift, 
  TrendingUp, 
  Calendar, 
  Package,
  Receipt,
  Award,
  User,
  Building,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface ProductDetail {
  Id: string;
  Name: string;
  Quantity: number;
  ProductCode?: string;
  UnitPrice?: number;
}

interface ConversionRequest {
  Id: string;
  Name: string;
  Order__c: string;
  Order__r?: {
    OrderNumber?: string;
  };
  Points_Awarded__c: number;
  Request_Status__c: string;
  Conversion_Date__c: string;
  Dealer__c?: string;
  Dealer__r?: {
    Name: string;
  };
  Influencer__c?: string;
  Influencer__r?: {
    Name: string;
  };
  CreatedDate: string;
  LastModifiedDate: string;
  productDetails?: ProductDetail[];
}

// Dummy data for demonstration
const DUMMY_CONVERSION_REQUESTS: ConversionRequest[] = [
  {
    Id: "001",
    Name: "CR-1001",
    Order__c: "ORD-001",
    Order__r: {
      OrderNumber: "ORD-1001"
    },
    Points_Awarded__c: 1500,
    Request_Status__c: "Approved",
    Conversion_Date__c: "2024-01-15",
    Dealer__c: "ACC-001",
    Dealer__r: {
      Name: "ABC Steel Distributors"
    },
    Influencer__c: "INF-001",
    Influencer__r: {
      Name: "John Smith"
    },
    CreatedDate: "2024-01-10T10:30:00Z",
    LastModifiedDate: "2024-01-16T14:20:00Z",
    productDetails: [
      {
        Id: "PD-001",
        Name: "Structural Steel Beam",
        ProductCode: "STL-BEAM-500",
        Quantity: 10,
        UnitPrice: 1250.50
      },
      {
        Id: "PD-002",
        Name: "Steel Reinforcement Bar",
        ProductCode: "STL-RB-12MM",
        Quantity: 50,
        UnitPrice: 45.75
      }
    ]
  },
  {
    Id: "002",
    Name: "CR-1002",
    Order__c: "ORD-002",
    Order__r: {
      OrderNumber: "ORD-1002"
    },
    Points_Awarded__c: 0,
    Request_Status__c: "Pending",
    Conversion_Date__c: "2024-01-20",
    Dealer__c: "ACC-002",
    Dealer__r: {
      Name: "XYZ Metal Works"
    },
    Influencer__c: "INF-002",
    Influencer__r: {
      Name: "Sarah Johnson"
    },
    CreatedDate: "2024-01-18T09:15:00Z",
    LastModifiedDate: "2024-01-18T09:15:00Z",
    productDetails: [
      {
        Id: "PD-003",
        Name: "Galvanized Steel Sheet",
        ProductCode: "STL-SHEET-GALV",
        Quantity: 25,
        UnitPrice: 320.25
      }
    ]
  },
  {
    Id: "003",
    Name: "CR-1003",
    Order__c: "ORD-003",
    Order__r: {
      OrderNumber: "ORD-1003"
    },
    Points_Awarded__c: 2500,
    Request_Status__c: "Approved",
    Conversion_Date__c: "2024-01-05",
    Dealer__c: "ACC-003",
    Dealer__r: {
      Name: "Metal Masters Inc."
    },
    Influencer__c: "INF-003",
    Influencer__r: {
      Name: "Robert Chen"
    },
    CreatedDate: "2024-01-03T14:45:00Z",
    LastModifiedDate: "2024-01-08T11:30:00Z",
    productDetails: [
      {
        Id: "PD-004",
        Name: "Stainless Steel Pipe",
        ProductCode: "STL-PIPE-SS304",
        Quantity: 15,
        UnitPrice: 850.00
      },
      {
        Id: "PD-005",
        Name: "Steel Angle Iron",
        ProductCode: "STL-ANGLE-50",
        Quantity: 30,
        UnitPrice: 65.40
      },
      {
        Id: "PD-006",
        Name: "Steel Plate",
        ProductCode: "STL-PLATE-10MM",
        Quantity: 8,
        UnitPrice: 420.75
      }
    ]
  },
  {
    Id: "004",
    Name: "CR-1004",
    Order__c: "ORD-004",
    Order__r: {
      OrderNumber: "ORD-1004"
    },
    Points_Awarded__c: 0,
    Request_Status__c: "Rejected",
    Conversion_Date__c: "2024-01-22",
    Dealer__c: "ACC-001",
    Dealer__r: {
      Name: "ABC Steel Distributors"
    },
    Influencer__c: "INF-004",
    Influencer__r: {
      Name: "Michael Brown"
    },
    CreatedDate: "2024-01-21T16:20:00Z",
    LastModifiedDate: "2024-01-23T10:15:00Z",
    productDetails: [
      {
        Id: "PD-007",
        Name: "Steel Wire Mesh",
        ProductCode: "STL-MESH-6MM",
        Quantity: 40,
        UnitPrice: 28.90
      }
    ]
  },
  {
    Id: "005",
    Name: "CR-1005",
    Order__c: "ORD-005",
    Order__r: {
      OrderNumber: "ORD-1005"
    },
    Points_Awarded__c: 1800,
    Request_Status__c: "Approved",
    Conversion_Date__c: "2023-12-28",
    Dealer__c: "ACC-004",
    Dealer__r: {
      Name: "Steel Solutions Ltd."
    },
    Influencer__c: "INF-001",
    Influencer__r: {
      Name: "John Smith"
    },
    CreatedDate: "2023-12-26T11:10:00Z",
    LastModifiedDate: "2023-12-30T09:45:00Z",
    productDetails: [
      {
        Id: "PD-008",
        Name: "Steel Channel",
        ProductCode: "STL-CHANNEL-C6",
        Quantity: 12,
        UnitPrice: 780.30
      }
    ]
  }
];

const History = () => {
  const [conversionRequests, setConversionRequests] = useState<ConversionRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ConversionRequest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load dummy data
  const loadDummyData = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Load dummy data
      setConversionRequests(DUMMY_CONVERSION_REQUESTS);
    } catch (err: unknown) {
      console.error("❌ Error loading data:", err);
      setError("Failed to load conversion requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDummyData();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format date with time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        );
      case 'Rejected':
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        );
      case 'Pending':
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-600">
            <AlertCircle className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const ActivityCard = ({ request }: { request: ConversionRequest }) => (
    <Card 
      className="p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
      onClick={() => {
        setSelectedRequest(request);
        setIsDialogOpen(true);
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className={`p-3 rounded-xl shrink-0 shadow-sm ${
            request.Points_Awarded__c > 0 
              ? "bg-primary/10 text-primary" 
              : "bg-muted text-muted-foreground"
          }`}>
            <Trophy className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <p className="font-bold text-base">Conversion Request #{request.Name}</p>
              {getStatusBadge(request.Request_Status__c)}
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Receipt className="h-3.5 w-3.5" />
                <span>Order: {request.Order__r?.OrderNumber || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatDate(request.Conversion_Date__c || request.CreatedDate)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="font-bold text-2xl text-primary">
            +{request.Points_Awarded__c?.toLocaleString() || 0}
          </span>
          <p className="text-xs text-muted-foreground mt-1">points</p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-2"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedRequest(request);
              setIsDialogOpen(true);
            }}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );

  const earnedRequests = conversionRequests.filter(r => r.Points_Awarded__c > 0);
  const pendingRequests = conversionRequests.filter(r => r.Request_Status__c === 'Pending');
  const completedRequests = conversionRequests.filter(r => 
    ['Approved', 'Rejected'].includes(r.Request_Status__c)
  );

  const totalPointsEarned = earnedRequests.reduce((sum, r) => sum + (r.Points_Awarded__c || 0), 0);
  const totalRequests = conversionRequests.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading conversion requests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 max-w-md">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Error Loading Data</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => loadDummyData()}>
              Retry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-background w-full overflow-x-hidden">
    {/* Header */}
    <div className="bg-primary px-3 py-4 sm:px-4 sm:py-8 text-primary-foreground border-b-2 border-primary-foreground/10">
      <div className="mx-auto max-w-6xl px-2 sm:px-0">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-3 sm:mb-4 text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        
        <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
          <TrendingUp className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold pr-2">Conversion Requests History</h1>
        </div>
        <p className="text-primary-foreground/80 text-xs sm:text-sm md:text-base">Track all your conversion requests and points earned</p>
      </div>
    </div>

    {/* Stats */}
    <div className="mx-auto max-w-6xl px-3 sm:px-4 py-4 sm:py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <Card className="p-4 sm:p-5 md:p-6 bg-primary/5 border-2 border-primary/20">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-1.5 sm:p-2 rounded-full bg-primary/10">
              <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">Total Points Earned</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-primary">
            +{totalPointsEarned.toLocaleString()}
            <span className="text-base sm:text-lg ml-1 sm:ml-2 text-muted-foreground">pts</span>
          </p>
        </Card>

        <Card className="p-4 sm:p-5 md:p-6 bg-muted/30 border-2">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-1.5 sm:p-2 rounded-full bg-muted">
              <Receipt className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">Total Requests</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold">
            {totalRequests.toLocaleString()}
            <span className="text-base sm:text-lg ml-1 sm:ml-2 text-muted-foreground">requests</span>
          </p>
        </Card>

        <Card className="p-4 sm:p-5 md:p-6 bg-amber-50 border-2 border-amber-200 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-1.5 sm:p-2 rounded-full bg-amber-100">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">Pending</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-amber-600">
            {pendingRequests.length}
            <span className="text-base sm:text-lg ml-1 sm:ml-2 text-muted-foreground">requests</span>
          </p>
        </Card>
      </div>

      {/* Activity List */}
      <Tabs defaultValue="all" className="w-full">
        <div className="w-full overflow-x-auto pb-2 mb-4 sm:mb-6">
          <TabsList className="w-max sm:w-full justify-start">
            <TabsTrigger value="all" className="text-xs sm:text-sm px-3 sm:px-4 py-2">All Requests</TabsTrigger>
            <TabsTrigger value="pending" className="text-xs sm:text-sm px-3 sm:px-4 py-2">
              Pending
              <Badge variant="secondary" className="ml-1 sm:ml-2 text-xs">{pendingRequests.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs sm:text-sm px-3 sm:px-4 py-2">
              Completed
              <Badge variant="secondary" className="ml-1 sm:ml-2 text-xs">{completedRequests.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="earned" className="text-xs sm:text-sm px-3 sm:px-4 py-2">
              Points Earned
              <Badge variant="secondary" className="ml-1 sm:ml-2 text-xs">{earnedRequests.length}</Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="space-y-3 mt-0">
          {conversionRequests.length > 0 ? (
            conversionRequests.map((request) => (
              <ActivityCard key={request.Id} request={request} />
            ))
          ) : (
            <Card className="p-6 sm:p-8 text-center">
              <Receipt className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">No Conversion Requests Found</h3>
              <p className="text-muted-foreground text-sm sm:text-base">Your conversion requests will appear here once created.</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-3 mt-0">
          {pendingRequests.length > 0 ? (
            pendingRequests.map((request) => (
              <ActivityCard key={request.Id} request={request} />
            ))
          ) : (
            <Card className="p-6 sm:p-8 text-center">
              <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">No Pending Requests</h3>
              <p className="text-muted-foreground text-sm sm:text-base">All requests have been processed.</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-3 mt-0">
          {completedRequests.length > 0 ? (
            completedRequests.map((request) => (
              <ActivityCard key={request.Id} request={request} />
            ))
          ) : (
            <Card className="p-6 sm:p-8 text-center">
              <Clock className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">No Completed Requests</h3>
              <p className="text-muted-foreground text-sm sm:text-base">Completed requests will appear here.</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="earned" className="space-y-3 mt-0">
          {earnedRequests.length > 0 ? (
            earnedRequests.map((request) => (
              <ActivityCard key={request.Id} request={request} />
            ))
          ) : (
            <Card className="p-6 sm:p-8 text-center">
              <Award className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">No Points Earned Yet</h3>
              <p className="text-muted-foreground text-sm sm:text-base">Points will appear here once requests are approved.</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>

    {/* Details Dialog */}
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto p-3 sm:p-6">
        {selectedRequest && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Receipt className="h-4 w-4 sm:h-5 sm:w-5" />
                Conversion Request #{selectedRequest.Name}
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                Detailed information about this conversion request
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 sm:space-y-6">
              {/* Status and Points Section */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between p-3 sm:p-4 bg-muted/30 rounded-lg">
                <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 items-start xs:items-center">
                  <div className="text-center xs:text-left">
                    <p className="text-xs sm:text-sm text-muted-foreground">Status</p>
                    <div className="mt-1">{getStatusBadge(selectedRequest.Request_Status__c)}</div>
                  </div>
                  <Separator orientation="vertical" className="hidden xs:block h-8" />
                  <Separator orientation="horizontal" className="xs:hidden my-1" />
                  <div className="text-center xs:text-left">
                    <p className="text-xs sm:text-sm text-muted-foreground">Points Awarded</p>
                    <p className="text-xl sm:text-2xl font-bold text-primary mt-1">
                      +{selectedRequest.Points_Awarded__c?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right pt-3 sm:pt-0 border-t sm:border-t-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Conversion Date</p>
                  <p className="font-medium text-sm sm:text-base mt-1">
                    {formatDate(selectedRequest.Conversion_Date__c || selectedRequest.CreatedDate)}
                  </p>
                </div>
              </div>

              {/* Order Information */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                  <Receipt className="h-4 w-4" />
                  Order Information
                </h3>
                <Card className="p-3 sm:p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Order Number</p>
                      <p className="font-medium text-sm sm:text-base">
                        {selectedRequest.Order__r?.OrderNumber || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Order ID</p>
                      <p className="font-mono text-xs sm:text-sm truncate">{selectedRequest.Order__c || 'N/A'}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Products Section */}
              {selectedRequest.productDetails && selectedRequest.productDetails.length > 0 && (
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Order Products
                  </h3>
                  <Card className="p-0 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[600px] sm:min-w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Product Name</th>
                            <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Product Code</th>
                            <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Quantity</th>
                            <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Unit Price</th>
                            <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedRequest.productDetails.map((product, index) => (
                            <tr 
                              key={product.Id} 
                              className={`${index !== selectedRequest.productDetails!.length - 1 ? 'border-b' : ''}`}
                            >
                              <td className="p-3 sm:p-4 text-xs sm:text-sm">{product.Name}</td>
                              <td className="p-3 sm:p-4 text-muted-foreground text-xs sm:text-sm">
                                {product.ProductCode || 'N/A'}
                              </td>
                              <td className="p-3 sm:p-4 font-medium text-xs sm:text-sm">{product.Quantity}</td>
                              <td className="p-3 sm:p-4 text-xs sm:text-sm">
                                ${product.UnitPrice?.toFixed(2) || '0.00'}
                              </td>
                              <td className="p-3 sm:p-4 font-bold text-xs sm:text-sm">
                                ${((product.Quantity || 0) * (product.UnitPrice || 0)).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
              )}

              {/* Account Information */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Account Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <Card className="p-3 sm:p-4">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3">
                      <div className="p-1.5 sm:p-2 rounded-full bg-primary/10">
                        <Building className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-muted-foreground">Dealer</p>
                        <p className="font-medium text-sm sm:text-base truncate">
                          {selectedRequest.Dealer__r?.Name || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-3 sm:p-4">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3">
                      <div className="p-1.5 sm:p-2 rounded-full bg-secondary/10">
                        <User className="h-4 w-4 text-secondary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-muted-foreground">Influencer</p>
                        <p className="font-medium text-sm sm:text-base truncate">
                          {selectedRequest.Influencer__r?.Name || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Timestamps */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Timestamps
                </h3>
                <Card className="p-3 sm:p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Created Date</p>
                      <p className="font-medium text-sm sm:text-base">
                        {formatDateTime(selectedRequest.CreatedDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Last Modified</p>
                      <p className="font-medium text-sm sm:text-base">
                        {formatDateTime(selectedRequest.LastModifiedDate)}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  </div>
);
};

export default History;
