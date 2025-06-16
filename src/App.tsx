import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Partner from "./pages/Partner";
import Network from "./pages/Network";
import Fund from "./pages/Fund";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Add a class to the html element for scroll optimizations
    document.documentElement.classList.add('optimized-scroll');
    
    // Add CSS variables for scroll behavior
    const style = document.createElement('style');
    style.textContent = `
      .optimized-scroll {
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
      }
      
      /* Only apply hardware acceleration to elements that need it */
      .optimized-scroll [data-animated],
      .optimized-scroll [data-fixed] {
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
        will-change: transform;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.documentElement.classList.remove('optimized-scroll');
      style.remove();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/network" element={<Network />} />
            <Route path="/fund" element={<Fund />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
