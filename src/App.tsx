
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, ScrollRestoration } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Partner from "./pages/Partner";
import Network from "./pages/Network";
import Fund from "./pages/Fund";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/network" element={<Network />} />
          <Route path="/fund" element={<Fund />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollRestoration />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
