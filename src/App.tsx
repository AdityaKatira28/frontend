import { Toaster } from "@/shared/components/ui/toaster";
import { Toaster as Sonner } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/shared/components/layout/AppLayout";
import { OverviewApp } from "@/apps/overview/OverviewApp";
import { ThreatIntelligenceApp } from "@/apps/threat-intelligence/ThreatIntelligenceApp";
import { BudgetOptimizationApp } from "@/apps/budget-optimization/BudgetOptimizationApp";
import { NotFound } from "@/shared/components/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<OverviewApp />} />
            <Route path="threat-intelligence" element={<ThreatIntelligenceApp />} />
            <Route path="budget-optimization" element={<BudgetOptimizationApp />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
