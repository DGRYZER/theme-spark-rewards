import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Catalog from "./pages/Catalog";
import Rewards from "./pages/Rewards";
import RewardDetail from "./pages/RewardDetail";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Transactions from "./pages/Transactions";
import ScanQR from "./pages/ScanQR";
import Survey from "./pages/Survey";
import CoverageCalculator from "./pages/CoverageCalculator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/reward/:id" element={<RewardDetail />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/scan-qr" element={<ScanQR />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/coverage-calculator" element={<CoverageCalculator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
