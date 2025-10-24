import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Transactions = () => {
  const transactions = [
    { id: 1, type: "earned", amount: 150, description: "Purchase reward", date: "Today, 2:30 PM", category: "Shopping" },
    { id: 2, type: "redeemed", amount: -500, description: "$10 Gift Card", date: "2 days ago, 5:45 PM", category: "Redemption" },
    { id: 3, type: "earned", amount: 200, description: "Referral bonus", date: "5 days ago, 11:20 AM", category: "Referral" },
    { id: 4, type: "earned", amount: 300, description: "Survey completed", date: "1 week ago, 3:15 PM", category: "Survey" },
    { id: 5, type: "redeemed", amount: -1000, description: "Premium Membership", date: "1 week ago, 9:00 AM", category: "Redemption" },
    { id: 6, type: "earned", amount: 100, description: "Daily check-in bonus", date: "2 weeks ago, 8:30 AM", category: "Bonus" },
    { id: 7, type: "earned", amount: 250, description: "Purchase reward", date: "2 weeks ago, 4:20 PM", category: "Shopping" },
    { id: 8, type: "redeemed", amount: -250, description: "$5 Shopping Voucher", date: "3 weeks ago, 1:10 PM", category: "Redemption" },
  ];

  const earnedTransactions = transactions.filter(t => t.type === "earned");
  const redeemedTransactions = transactions.filter(t => t.type === "redeemed");
  
  const totalEarned = earnedTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalRedeemed = Math.abs(redeemedTransactions.reduce((sum, t) => sum + t.amount, 0));

  const TransactionCard = ({ transaction }: { transaction: typeof transactions[0] }) => (
    <Card className="p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className={`p-3 rounded-xl shadow-sm ${
            transaction.type === "earned" 
              ? "bg-primary/10 text-primary" 
              : "bg-muted"
          }`}>
            {transaction.type === "earned" ? (
              <ArrowUpRight className="h-5 w-5" />
            ) : (
              <ArrowDownRight className="h-5 w-5" />
            )}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-base mb-0.5">{transaction.description}</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">{transaction.date}</p>
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {transaction.category}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className={`font-bold text-xl ${
            transaction.type === "earned" ? "text-primary" : "text-muted-foreground"
          }`}>
            {transaction.amount > 0 ? "+" : ""}{transaction.amount}
          </span>
          <p className="text-xs text-muted-foreground">points</p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary px-4 pb-12 pt-8 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        
        <div className="mx-auto max-w-6xl relative z-10">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mb-6 hover:bg-primary-foreground/20 text-primary-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Transactions</h1>
          <p className="text-primary-foreground/90">View all your points activity</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mx-auto max-w-6xl px-4 -mt-6 relative z-20 mb-8">
        <div className="grid sm:grid-cols-2 gap-4">
          <Card className="p-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 font-medium">Total Earned</p>
                <p className="text-3xl font-bold text-primary">+{totalEarned.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-muted">
                <TrendingDown className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 font-medium">Total Redeemed</p>
                <p className="text-3xl font-bold text-muted-foreground">-{totalRedeemed.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Transactions List */}
      <div className="mx-auto max-w-6xl px-4 pb-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="earned">Earned</TabsTrigger>
            <TabsTrigger value="redeemed">Redeemed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {transactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </TabsContent>

          <TabsContent value="earned" className="space-y-3">
            {earnedTransactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </TabsContent>

          <TabsContent value="redeemed" className="space-y-3">
            {redeemedTransactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Transactions;
