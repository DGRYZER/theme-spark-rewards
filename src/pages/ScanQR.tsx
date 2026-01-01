import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Package,
  CheckCircle,
  TrendingUp,
  User,
  ShoppingBag,
  Plus,
  Trash2,
  Calendar,
  FileText,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Account {
  Id: string;
  Name: string;
  AccountNumber?: string;
  Type?: string;
  Phone?: string;
  GSTIN__c?: string;
}

interface Product {
  Id: string;
  Name: string;
  ProductCode: string;
  Description?: string;
  Family?: string;
  Price__c?: number;
  IsActive: boolean;
}

interface OrderItem {
  id: number;
  productId: string;
  productName: string;
  quantity: number;
}

interface RecentOrder {
  Id: string;
  OrderNumber: string;
  Status: string;
  EffectiveDate: string;
  AccountId: string;
  RecordTypeId: string;
  OrderItems: {
    records: Array<{
      Quantity: number;
      UnitPrice: number;
      TotalPrice: number;
      PricebookEntry: {
        Product2: {
          Name: string;
          ProductCode: string;
          Description: string;
        };
      };
    }>;
  };
}

interface PricebookEntry {
  Id: string;
  Product2Id: string;
  UnitPrice: number;
  Pricebook2Id: string;
}

// Dummy data
const DUMMY_ACCOUNTS: Account[] = [
  {
    Id: "acc-001",
    Name: "Global Steel Distributors",
    AccountNumber: "ACC-001",
    Type: "Dealer",
    Phone: "+1 (555) 123-4567",
    GSTIN__c: "27AABCU9603R1ZX",
  },
  {
    Id: "acc-002",
    Name: "Metro Metal Works",
    AccountNumber: "ACC-002",
    Type: "Distributor",
    Phone: "+1 (555) 234-5678",
    GSTIN__c: "29AAECU9603R2ZY",
  },
  {
    Id: "acc-003",
    Name: "Precision Steel Corporation",
    AccountNumber: "ACC-003",
    Type: "Dealer",
    Phone: "+1 (555) 345-6789",
    GSTIN__c: "33AADCU9603R3ZW",
  },
  {
    Id: "acc-004",
    Name: "Industrial Steel Supplies",
    AccountNumber: "ACC-004",
    Type: "Wholesaler",
    Phone: "+1 (555) 456-7890",
    GSTIN__c: "07AAFCU9603R4ZV",
  },
  {
    Id: "acc-005",
    Name: "Heavy Metal Distributors",
    AccountNumber: "ACC-005",
    Type: "Dealer",
    Phone: "+1 (555) 567-8901",
    GSTIN__c: "24AAGCJ9603R5ZU",
  },
];

const DUMMY_PRODUCTS: Product[] = [
  {
    Id: "prod-001",
    Name: "Steel Beam 8x8",
    ProductCode: "SB-8X8-001",
    Description: "Structural steel beam 8 inches by 8 inches",
    Family: "Structural",
    Price__c: 245.99,
    IsActive: true,
  },
  {
    Id: "prod-002",
    Name: "Steel Plate 1/4\"",
    ProductCode: "SP-025-002",
    Description: "1/4 inch thick steel plate",
    Family: "Plate",
    Price__c: 189.5,
    IsActive: true,
  },
  {
    Id: "prod-003",
    Name: "Steel Rebar #4",
    ProductCode: "RB-4-003",
    Description: "Grade 60 steel rebar #4",
    Family: "Rebar",
    Price__c: 78.25,
    IsActive: true,
  },
  {
    Id: "prod-004",
    Name: "Steel Pipe 2\" Schedule 40",
    ProductCode: "SP-2-40-004",
    Description: "2 inch steel pipe schedule 40",
    Family: "Pipe",
    Price__c: 156.75,
    IsActive: true,
  },
  {
    Id: "prod-005",
    Name: "Steel Angle 3x3x1/4",
    ProductCode: "SA-3-3-025-005",
    Description: "3x3x1/4 inch steel angle",
    Family: "Angle",
    Price__c: 112.3,
    IsActive: true,
  },
  {
    Id: "prod-006",
    Name: "Steel Channel 6\"",
    ProductCode: "SC-6-006",
    Description: "6 inch steel channel",
    Family: "Channel",
    Price__c: 198.45,
    IsActive: true,
  },
  {
    Id: "prod-007",
    Name: "Steel Tube 2x2x1/8",
    ProductCode: "ST-2-2-0125-007",
    Description: "2x2x1/8 inch square steel tube",
    Family: "Tube",
    Price__c: 134.8,
    IsActive: true,
  },
  {
    Id: "prod-008",
    Name: "Steel Sheet 10G",
    ProductCode: "SS-10G-008",
    Description: "10 gauge steel sheet",
    Family: "Sheet",
    Price__c: 95.6,
    IsActive: true,
  },
];

const DUMMY_PRICEBOOK_ENTRIES: PricebookEntry[] = [
  { Id: "pbe-001", Product2Id: "prod-001", UnitPrice: 245.99, Pricebook2Id: "pricebook-001" },
  { Id: "pbe-002", Product2Id: "prod-002", UnitPrice: 189.5, Pricebook2Id: "pricebook-001" },
  { Id: "pbe-003", Product2Id: "prod-003", UnitPrice: 78.25, Pricebook2Id: "pricebook-001" },
  { Id: "pbe-004", Product2Id: "prod-004", UnitPrice: 156.75, Pricebook2Id: "pricebook-001" },
  { Id: "pbe-005", Product2Id: "prod-005", UnitPrice: 112.3, Pricebook2Id: "pricebook-001" },
  { Id: "pbe-006", Product2Id: "prod-006", UnitPrice: 198.45, Pricebook2Id: "pricebook-001" },
  { Id: "pbe-007", Product2Id: "prod-007", UnitPrice: 134.8, Pricebook2Id: "pricebook-001" },
  { Id: "pbe-008", Product2Id: "prod-008", UnitPrice: 95.6, Pricebook2Id: "pricebook-001" },
];

const DUMMY_RECENT_ORDERS: RecentOrder[] = [
  {
    Id: "ord-001",
    OrderNumber: "ORD-2024-001",
    Status: "Booked",
    EffectiveDate: "2024-01-15",
    AccountId: "acc-001",
    RecordTypeId: "recordtype-001",
    OrderItems: {
      records: [
        {
          Quantity: 10,
          UnitPrice: 245.99,
          TotalPrice: 2459.9,
          PricebookEntry: {
            Product2: {
              Name: "Steel Beam 8x8",
              ProductCode: "SB-8X8-001",
              Description: "Structural steel beam 8 inches by 8 inches",
            },
          },
        },
        {
          Quantity: 25,
          UnitPrice: 78.25,
          TotalPrice: 1956.25,
          PricebookEntry: {
            Product2: {
              Name: "Steel Rebar #4",
              ProductCode: "RB-4-003",
              Description: "Grade 60 steel rebar #4",
            },
          },
        },
      ],
    },
  },
  {
    Id: "ord-002",
    OrderNumber: "ORD-2024-002",
    Status: "Draft",
    EffectiveDate: "2024-01-15",
    AccountId: "acc-002",
    RecordTypeId: "recordtype-001",
    OrderItems: {
      records: [
        {
          Quantity: 15,
          UnitPrice: 189.5,
          TotalPrice: 2842.5,
          PricebookEntry: {
            Product2: {
              Name: "Steel Plate 1/4\"",
              ProductCode: "SP-025-002",
              Description: "1/4 inch thick steel plate",
            },
          },
        },
      ],
    },
  },
  {
    Id: "ord-003",
    OrderNumber: "ORD-2024-003",
    Status: "Activated",
    EffectiveDate: "2024-01-14",
    AccountId: "acc-003",
    RecordTypeId: "recordtype-001",
    OrderItems: {
      records: [
        {
          Quantity: 8,
          UnitPrice: 156.75,
          TotalPrice: 1254,
          PricebookEntry: {
            Product2: {
              Name: "Steel Pipe 2\" Schedule 40",
              ProductCode: "SP-2-40-004",
              Description: "2 inch steel pipe schedule 40",
            },
          },
        },
        {
          Quantity: 12,
          UnitPrice: 112.3,
          TotalPrice: 1347.6,
          PricebookEntry: {
            Product2: {
              Name: "Steel Angle 3x3x1/4",
              ProductCode: "SA-3-3-025-005",
              Description: "3x3x1/4 inch steel angle",
            },
          },
        },
        {
          Quantity: 5,
          UnitPrice: 198.45,
          TotalPrice: 992.25,
          PricebookEntry: {
            Product2: {
              Name: "Steel Channel 6\"",
              ProductCode: "SC-6-006",
              Description: "6 inch steel channel",
            },
          },
        },
      ],
    },
  },
];

const ScanQR = () => {
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const { toast } = useToast();

  // Data states
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [pricebookEntries, setPricebookEntries] = useState<PricebookEntry[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);

  // Form states
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { id: 1, productId: "", productName: "", quantity: 1 },
  ]);

  // Error states
  const [fetchError, setFetchError] = useState<string>("");

  // Load dummy data
  const loadData = () => {
    setLoadingData(true);
    setFetchError("");

    try {
      // Simulate API delay
      setTimeout(() => {
        setAccounts(DUMMY_ACCOUNTS);
        setProducts(DUMMY_PRODUCTS);
        setPricebookEntries(DUMMY_PRICEBOOK_ENTRIES);
        setRecentOrders(DUMMY_RECENT_ORDERS);
        setLoading(false);
        setLoadingData(false);
      }, 800);
    } catch (err: any) {
      console.error("❌ Error loading data:", err);
      setFetchError("Failed to load data. Please try again.");
      setLoading(false);
      setLoadingData(false);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedAccount) {
      toast({
        title: "Missing Information",
        description: "Please select a dealer",
        variant: "destructive",
      });
      return;
    }

    // Validate order items
    const validItems = orderItems.filter(
      (item) => item.productId && item.quantity > 0
    );
    if (validItems.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please add at least one product with quantity",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      setTimeout(() => {
        const newOrderNumber = `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`;
        setOrderNumber(newOrderNumber);
        setSubmittedOrder(true);

        toast({
          title: "Order Created Successfully!",
          description: `Order #${newOrderNumber} has been created.`,
        });

        // Add to recent orders
        const selectedAccountData = accounts.find(a => a.Id === selectedAccount);
        const newOrder: RecentOrder = {
          Id: `ord-${Date.now()}`,
          OrderNumber: newOrderNumber,
          Status: "Booked",
          EffectiveDate: new Date().toISOString().split("T")[0],
          AccountId: selectedAccount,
          RecordTypeId: "recordtype-001",
          OrderItems: {
            records: validItems.map(item => {
              const product = products.find(p => p.Id === item.productId);
              const pricebookEntry = pricebookEntries.find(pbe => pbe.Product2Id === item.productId);
              const unitPrice = pricebookEntry?.UnitPrice || product?.Price__c || 0;
              
              return {
                Quantity: item.quantity,
                UnitPrice: unitPrice,
                TotalPrice: item.quantity * unitPrice,
                PricebookEntry: {
                  Product2: {
                    Name: product?.Name || "",
                    ProductCode: product?.ProductCode || "",
                    Description: product?.Description || "",
                  },
                },
              };
            }),
          },
        };

        setRecentOrders(prev => [newOrder, ...prev]);
        setIsSubmitting(false);
      }, 1500);
    } catch (err: any) {
      console.error("❌ Error creating order:", err);
      toast({
        title: "Order Creation Failed",
        description: "Failed to create order. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  // Add new product row
  const addProductRow = () => {
    setOrderItems([
      ...orderItems,
      { id: Date.now(), productId: "", productName: "", quantity: 1 },
    ]);
  };

  // Remove product row
  const removeProductRow = (id: number) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter((item) => item.id !== id));
    }
  };

  // Update product in a row
  const updateProduct = (id: number, productId: string) => {
    const updatedItems = orderItems.map((item) => {
      if (item.id === id) {
        const selectedProduct = products.find((p) => p.Id === productId);
        return {
          ...item,
          productId,
          productName: selectedProduct?.Name || "",
        };
      }
      return item;
    });
    setOrderItems(updatedItems);
  };

  // Update quantity in a row
  const updateQuantity = (id: number, quantity: number) => {
    const updatedItems = orderItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, quantity) };
      }
      return item;
    });
    setOrderItems(updatedItems);
  };

  // Reset form
  const resetForm = () => {
    setSelectedAccount("");
    setOrderItems([{ id: 1, productId: "", productName: "", quantity: 1 }]);
    setSubmittedOrder(false);
    setOrderNumber("");
  };

  // Refresh data
  const refreshData = () => {
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-48 sm:w-56 md:w-64 lg:w-72 h-48 sm:h-56 md:h-64 lg:h-72 bg-primary-foreground rounded-full -translate-y-1/2" />
          <div className="absolute bottom-0 left-1/4 w-32 sm:w-40 md:w-48 lg:w-56 h-32 sm:h-40 md:h-48 lg:h-56 bg-primary-foreground rounded-full translate-y-1/2" />
        </div>

        <div className="mx-auto max-w-6xl relative z-10">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className="mb-4 sm:mb-6 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl text-xs sm:text-sm"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3">
            <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-primary-foreground/10 backdrop-blur-sm w-fit">
              <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Create Secondary Order
            </h1>
          </div>
          <p className="text-primary-foreground/90 text-sm sm:text-base lg:text-lg">
            Create a new order with dealer and product details
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-3 sm:px-4 lg:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Error Alert */}
        {fetchError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span>{fetchError}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={refreshData}
                className="ml-0 sm:ml-4 mt-2 sm:mt-0 w-full sm:w-auto"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Order Creation Card */}
        <Card className="p-4 sm:p-6 lg:p-8">
          {!submittedOrder ? (
            <div className="space-y-6 sm:space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-center space-y-3 sm:space-y-4 flex-1">
                  <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <FileText className="h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 text-primary" />
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                      Create New Order
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Select dealer and add products with quantities
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshData}
                  disabled={loadingData}
                  className="gap-2 w-full sm:w-auto"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${loadingData ? "animate-spin" : ""}`}
                  />
                  Refresh Data
                </Button>
              </div>

              <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
                {/* Dealer Selection */}
                <div className="space-y-2 sm:space-y-3">
                  <Label className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                    Select Dealer
                    {loadingData && (
                      <span className="text-sm text-muted-foreground">
                        (Loading...)
                      </span>
                    )}
                  </Label>
                  <Select
                    value={selectedAccount}
                    onValueChange={setSelectedAccount}
                    disabled={isSubmitting || loadingData}
                  >
                    <SelectTrigger className="h-12 sm:h-14 text-base sm:text-lg">
                      <SelectValue
                        placeholder={
                          accounts.length === 0
                            ? "No dealers available"
                            : "Choose a dealer..."
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account.Id} value={account.Id}>
                          <div className="flex flex-col">
                            <span className="text-sm sm:text-base">{account.Name}</span>
                            {account.AccountNumber && (
                              <span className="text-xs text-muted-foreground">
                                Account #: {account.AccountNumber}
                              </span>
                            )}
                            {account.GSTIN__c && (
                              <span className="text-xs text-muted-foreground">
                                GSTIN: {account.GSTIN__c}
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {accounts.length === 0 && !loadingData && (
                    <p className="text-sm text-destructive">
                      No dealers found. Please create accounts first.
                    </p>
                  )}
                </div>

                {/* Products Section */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <Label className="text-base sm:text-lg font-semibold flex items-center gap-2">
                      <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                      Products
                      {loadingData && (
                        <span className="text-sm text-muted-foreground">
                          (Loading...)
                        </span>
                      )}
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addProductRow}
                      disabled={
                        isSubmitting || loadingData || products.length === 0
                      }
                      className="gap-2 w-full sm:w-auto"
                    >
                      <Plus className="h-4 w-4" />
                      Add Product
                    </Button>
                  </div>

                  {products.length === 0 && !loadingData ? (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        No active products found. Please create products first.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      {orderItems.map((item, index) => (
                        <div
                          key={item.id}
                          className="grid grid-cols-1 xs:grid-cols-12 gap-3 sm:gap-4 items-center p-3 sm:p-4 border rounded-lg"
                        >
                          <div className="col-span-1 text-muted-foreground font-medium text-sm sm:text-base">
                            #{index + 1}
                          </div>

                          <div className="col-span-12 xs:col-span-7 sm:col-span-6">
                            <Select
                              value={item.productId}
                              onValueChange={(value) =>
                                updateProduct(item.id, value)
                              }
                              disabled={isSubmitting || loadingData}
                            >
                              <SelectTrigger className="text-sm sm:text-base">
                                <SelectValue placeholder="Select product..." />
                              </SelectTrigger>
                              <SelectContent>
                                {products.map((product) => {
                                  const pricebookEntry = pricebookEntries.find(
                                    (pbe) => pbe.Product2Id === product.Id
                                  );
                                  const unitPrice =
                                    pricebookEntry?.UnitPrice ||
                                    product.Price__c ||
                                    0;

                                  return (
                                    <SelectItem
                                      key={product.Id}
                                      value={product.Id}
                                    >
                                      <div className="flex flex-col">
                                        <span className="text-sm sm:text-base">{product.Name}</span>
                                        <span className="text-xs text-muted-foreground">
                                          ${unitPrice.toFixed(2)} each
                                        </span>
                                      </div>
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="col-span-12 xs:col-span-3 sm:col-span-3">
                            <Input
                              type="number"
                              min="1"
                              placeholder="Quantity"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.id,
                                  parseInt(e.target.value) || 1
                                )
                              }
                              disabled={isSubmitting || loadingData}
                              className="text-sm sm:text-base"
                            />
                          </div>

                          <div className="col-span-12 xs:col-span-1 sm:col-span-2 flex justify-end">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeProductRow(item.id)}
                              disabled={isSubmitting || orderItems.length === 1}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 sm:h-9 sm:w-9"
                            >
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Summary */}
                <div className="p-3 sm:p-4 bg-muted/50 rounded-lg sm:rounded-xl">
                  <h3 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                    Order Summary
                  </h3>
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dealer:</span>
                      <span className="font-semibold">
                        {selectedAccount
                          ? accounts.find((a) => a.Id === selectedAccount)?.Name
                          : "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Products:</span>
                      <span className="font-semibold">
                        {orderItems.filter((item) => item.productId).length}{" "}
                        items
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Total Quantity:
                      </span>
                      <span className="font-semibold text-primary">
                        {orderItems.reduce(
                          (sum, item) => sum + item.quantity,
                          0
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Estimated Total:
                      </span>
                      <span className="font-semibold text-green-600">
                        $
                        {orderItems
                          .reduce((sum, item) => {
                            if (item.productId) {
                              const product = products.find(p => p.Id === item.productId);
                              const pricebookEntry = pricebookEntries.find(pbe => pbe.Product2Id === item.productId);
                              const unitPrice = pricebookEntry?.UnitPrice || product?.Price__c || 0;
                              return sum + (item.quantity * unitPrice);
                            }
                            return sum;
                          }, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={
                    isSubmitting ||
                    loadingData ||
                    !selectedAccount ||
                    orderItems.every((item) => !item.productId)
                  }
                  className="w-full py-4 sm:py-6 text-base sm:text-lg"
                >
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  {isSubmitting ? "Creating Order..." : "Create Order"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4 sm:space-y-6">
              <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16 text-primary" />
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 text-primary">
                  Order Created!
                </h2>
                <p className="text-lg sm:text-xl font-semibold mb-1">
                  Order #{orderNumber}
                </p>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Your secondary order has been created successfully
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={resetForm}
                  className="px-4 sm:px-8 py-3 sm:py-6 text-sm sm:text-lg w-full sm:w-auto"
                >
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Create Another Order
                </Button>
                <Link to="/">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-4 sm:px-8 py-3 sm:py-6 text-sm sm:text-lg w-full sm:w-auto"
                  >
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Card>

        {/* Recent Orders */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-5 gap-3">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 sm:gap-3">
              <div className="p-1 sm:p-2 rounded-lg sm:rounded-xl bg-primary/10">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-primary" />
              </div>
              Recent Orders
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshData}
              disabled={loadingData}
              className="font-semibold gap-2 w-full sm:w-auto"
            >
              <RefreshCw
                className={`h-4 w-4 ${loadingData ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>

          {recentOrders.length === 0 ? (
            <Card className="p-4 sm:p-6 lg:p-8 text-center">
              <p className="text-muted-foreground text-sm sm:text-base">
                No recent orders found.
              </p>
            </Card>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {recentOrders.map((order) => (
                <Card
                  key={order.Id}
                  className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-base sm:text-lg">
                          Order #{order.OrderNumber}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Status:{" "}
                          <span
                            className={`font-semibold ${
                              order.Status === "Draft"
                                ? "text-blue-600"
                                : order.Status === "Activated"
                                ? "text-green-600"
                                : "text-orange-600"
                            }`}
                          >
                            {order.Status}
                          </span>
                          • {new Date(order.EffectiveDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-semibold w-fit">
                        {order.OrderItems?.records?.length || 0} items
                      </div>
                    </div>

                    {order.OrderItems?.records &&
                      order.OrderItems.records.length > 0 && (
                        <div className="border-t pt-3 sm:pt-4">
                          <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Items:</h4>
                          <div className="space-y-1 sm:space-y-2">
                            {order.OrderItems.records.map((item, index) => (
                              <div
                                key={index}
                                className="flex flex-col xs:flex-row xs:items-center justify-between text-xs sm:text-sm gap-1"
                              >
                                <div className="truncate">
                                  <span className="font-medium">
                                    {item.PricebookEntry.Product2.Name}
                                  </span>
                                  <span className="text-muted-foreground ml-1 sm:ml-2">
                                    ({item.PricebookEntry.Product2.ProductCode})
                                  </span>
                                </div>
                                <div className="text-right">
                                  <span className="font-semibold">
                                    {item.Quantity} × $
                                    {item.UnitPrice.toFixed(2)}
                                  </span>
                                  <span className="text-green-600 font-bold ml-1 sm:ml-3 block xs:inline">
                                    ${item.TotalPrice.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}
        <Card className="p-4 sm:p-6 bg-muted/30">
          <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">
            How to Create Secondary Orders
          </h3>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
            <li className="flex items-start gap-1 sm:gap-2">
              <span className="font-bold text-primary mt-0.5">1.</span>
              <span>Select a dealer from the dropdown list</span>
            </li>
            <li className="flex items-start gap-1 sm:gap-2">
              <span className="font-bold text-primary mt-0.5">2.</span>
              <span>
                Add products by selecting from the product list and entering
                quantities
              </span>
            </li>
            <li className="flex items-start gap-1 sm:gap-2">
              <span className="font-bold text-primary mt-0.5">3.</span>
              <span>
                You can add multiple products using the "Add Product" button
              </span>
            </li>
            <li className="flex items-start gap-1 sm:gap-2">
              <span className="font-bold text-primary mt-0.5">4.</span>
              <span>
                Click "Create Order" to submit. The order will be created with
                the secondary record type
              </span>
            </li>
            <li className="flex items-start gap-1 sm:gap-2">
              <span className="font-bold text-primary mt-0.5">5.</span>
              <span>Recent orders will appear below</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default ScanQR;
