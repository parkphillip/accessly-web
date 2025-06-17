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
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return false;
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  if (!debugInfo) return false;
  const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
  return renderer.toLowerCase().includes('nvidia') || 
         renderer.toLowerCase().includes('amd') || 
         renderer.toLowerCase().includes('radeon');
};

// Detect if the device is using Windows
const isWindows = () => {
  if (typeof window === 'undefined') return false;
  return navigator.platform.toLowerCase().includes('win');
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
  private lastScrollTime: number = 0;
  private deviceCapabilities = {
    isTouchpad: isTouchpad(),
    hasHighRefreshRate: hasHighRefreshRate(),
    hasDedicatedGPU: hasDedicatedGPU(),
    isWindows: isWindows(),
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
    // Add passive scroll listener
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    
    // Add resize listener for device capability updates
    window.addEventListener('resize', this.updateDeviceCapabilities, { passive: true });
  }

  private handleScroll = () => {
    const now = performance.now();
    const timeSinceLastScroll = now - this.lastScrollTime;
    
    // Throttle scroll events on Windows
    if (this.deviceCapabilities.isWindows && timeSinceLastScroll < 16) {
      return;
    }

    if (!this.rafId) {
      this.rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        this.scrollDelta = currentScrollY - this.lastScrollY;
        this.lastScrollY = currentScrollY;
        this.lastScrollTime = now;
        this.isScrolling = true;

        // Batch scroll listener updates
        const scrollY = currentScrollY;
        this.scrollListeners.forEach(listener => {
          try {
            listener(scrollY);
          } catch (error) {
            console.error('Error in scroll listener:', error);
          }
        });

        // Clear scroll timeout
        if (this.scrollTimeout) {
          clearTimeout(this.scrollTimeout);
        }

        // Set scroll timeout with reduced duration for Windows
        this.scrollTimeout = setTimeout(() => {
          this.isScrolling = false;
        }, this.deviceCapabilities.isWindows ? 100 : 150);

        this.rafId = null;
      });
    }
  };

  private updateDeviceCapabilities = () => {
    this.deviceCapabilities = {
      isTouchpad: isTouchpad(),
      hasHighRefreshRate: hasHighRefreshRate(),
      hasDedicatedGPU: hasDedicatedGPU(),
      isWindows: isWindows(),
    };
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
      scrollManager.current.destroy();
    };
  }, []);

  return scrollManager.current;
};

export default ScrollManager; 