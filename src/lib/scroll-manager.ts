
import { useEffect, useRef } from 'react';

// Detect if the device is using a touchpad or mouse
const isTouchpad = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Detect if the device is using a high refresh rate display
const hasHighRefreshRate = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(min-resolution: 2dppx)').matches;
};

// Detect if the device has a dedicated GPU
const hasDedicatedGPU = () => {
  if (typeof window === 'undefined') return false;
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
  if (!gl) return false;
  
  try {
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return false;
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    return renderer && (
      renderer.toLowerCase().includes('nvidia') || 
      renderer.toLowerCase().includes('amd') || 
      renderer.toLowerCase().includes('radeon')
    );
  } catch (e) {
    return false;
  }
};

// Create a scroll manager class
class ScrollManager {
  private static instance: ScrollManager;
  private scrollListeners: Set<(scrollY: number) => void> = new Set();
  private rafId: number | null = null;
  private lastScrollY: number = 0;
  private scrollDelta: number = 0;
  private isScrolling: boolean = false;
  private scrollTimeout: NodeJS.Timeout | null = null;
  private deviceCapabilities = {
    isTouchpad: isTouchpad(),
    hasHighRefreshRate: hasHighRefreshRate(),
    hasDedicatedGPU: hasDedicatedGPU(),
  };

  private constructor() {
    this.init();
  }

  public static getInstance(): ScrollManager {
    if (!ScrollManager.instance) {
      ScrollManager.instance = new ScrollManager();
    }
    return ScrollManager.instance;
  }

  private init() {
    // Add passive scroll listener with proper throttling
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    
    // Add resize listener for device capability updates
    window.addEventListener('resize', this.updateDeviceCapabilities, { passive: true });
    
    // Optimize scroll behavior based on device capabilities
    this.optimizeScrollBehavior();
  }

  private optimizeScrollBehavior() {
    const html = document.documentElement;
    
    // Remove conflicting scroll-behavior styles that can cause jank
    html.style.scrollBehavior = 'auto';
    
    // Add optimizations based on device capabilities
    if (this.deviceCapabilities.hasHighRefreshRate) {
      html.style.scrollSnapType = 'none';
    }
    
    if (this.deviceCapabilities.hasDedicatedGPU) {
      // Enable hardware acceleration for better scroll performance
      document.body.style.transform = 'translateZ(0)';
      document.body.style.willChange = 'scroll-position';
    }
  }

  private handleScroll = () => {
    if (!this.rafId) {
      this.rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        this.scrollDelta = currentScrollY - this.lastScrollY;
        this.lastScrollY = currentScrollY;
        this.isScrolling = true;

        // Notify all listeners with throttling
        this.scrollListeners.forEach(listener => {
          try {
            listener(currentScrollY);
          } catch (e) {
            console.warn('Scroll listener error:', e);
          }
        });

        // Clear scroll timeout
        if (this.scrollTimeout) {
          clearTimeout(this.scrollTimeout);
        }

        // Set scroll timeout
        this.scrollTimeout = setTimeout(() => {
          this.isScrolling = false;
        }, 100); // Reduced timeout for better responsiveness

        this.rafId = null;
      });
    }
  };

  private updateDeviceCapabilities = () => {
    this.deviceCapabilities = {
      isTouchpad: isTouchpad(),
      hasHighRefreshRate: hasHighRefreshRate(),
      hasDedicatedGPU: hasDedicatedGPU(),
    };
    this.optimizeScrollBehavior();
  };

  public addScrollListener(listener: (scrollY: number) => void) {
    this.scrollListeners.add(listener);
    return () => this.scrollListeners.delete(listener);
  }

  public getScrollDelta() {
    return this.scrollDelta;
  }

  public isCurrentlyScrolling() {
    return this.isScrolling;
  }

  public getDeviceCapabilities() {
    return this.deviceCapabilities;
  }

  public destroy() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.updateDeviceCapabilities);
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }
}

// React hook for using the scroll manager
export const useScrollManager = () => {
  const scrollManager = useRef(ScrollManager.getInstance());

  useEffect(() => {
    return () => {
      // Don't destroy the singleton on unmount, just clean up the reference
    };
  }, []);

  return scrollManager.current;
};

export default ScrollManager; 
