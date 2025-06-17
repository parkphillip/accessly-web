
import { Toaster } from "@/components/ui/toaster";
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
import ScrollManager from "./lib/scroll-manager";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize scroll manager
    const scrollManager = ScrollManager.getInstance();

    // Add optimized scroll styles
    const style = document.createElement('style');
    style.textContent = `
      html {
        -webkit-overflow-scrolling: touch;
        overscroll-behavior-y: none;
        scroll-behavior: auto !important;
      }
      
      body {
        overscroll-behavior-y: none;
      }
      
      /* Optimize scroll performance for heavy components */
      .globe-container,
      .animated-text-container {
        will-change: transform;
        transform: translateZ(0);
      }

      /* Optimize animations for different devices */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }

      /* Optimize for high refresh rate displays */
      @media (min-resolution: 2dppx) {
        [data-animated] {
          transform: translate3d(0, 0, 0);
        }
      }

      /* Prevent layout shifts during scroll */
      .hero-section,
      .main-content {
        contain: layout;
      }
    `;
    document.head.appendChild(style);

    return () => {
      style.remove();
      scrollManager.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/network" element={<Network />} />
            <Route path="/fund" element={<Fund />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
