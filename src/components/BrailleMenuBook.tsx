
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { translateToBraille } from '../utils/brailleUtils';

const BrailleMenuBook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [hoveredText, setHoveredText] = useState<{ id: string; original: string } | null>(null);

  const bookPages = [
    {
      title: "Welcome to Braille",
      content: [
        { id: "intro1", text: "Braille is a tactile writing system" },
        { id: "intro2", text: "Each character uses up to 6 dots" },
        { id: "intro3", text: "Dots are arranged in 2 columns of 3" }
      ]
    },
    {
      title: "Basic Letters",
      content: [
        { id: "letters1", text: "The letter A uses dot 1" },
        { id: "letters2", text: "The letter B uses dots 1 and 2" },
        { id: "letters3", text: "The letter C uses dots 1 and 4" }
      ]
    },
    {
      title: "Restaurant Menu",
      content: [
        { id: "menu1", text: "APPETIZERS" },
        { id: "menu2", text: "Caesar Salad - $12.00" },
        { id: "menu3", text: "Fresh Bruschetta - $8.50" }
      ]
    },
    {
      title: "Main Courses",
      content: [
        { id: "main1", text: "ENTREES" },
        { id: "main2", text: "Grilled Salmon - $24.00" },
        { id: "main3", text: "Pasta Primavera - $18.50" }
      ]
    }
  ];

  const totalPages = bookPages.length;
  const canGoBack = currentPage > 0;
  const canGoForward = currentPage < totalPages - 1;

  const flipPage = (direction: 'next' | 'prev') => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    
    if (direction === 'next' && canGoForward) {
      setCurrentPage(prev => prev + 1);
    } else if (direction === 'prev' && canGoBack) {
      setCurrentPage(prev => prev - 1);
    }
    
    setTimeout(() => setIsFlipping(false), 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      flipPage('next');
    } else if (e.key === 'ArrowLeft') {
      flipPage('prev');
    }
  };

  const BrailleText = ({ item }: { item: { id: string; text: string } }) => {
    const isHovered = hoveredText?.id === item.id;
    const displayText = isHovered ? hoveredText.original : translateToBraille(item.text);
    
    return (
      <div
        className="braille-line py-2 cursor-pointer transition-all duration-300"
        onMouseEnter={() => setHoveredText({ id: item.id, original: item.text })}
        onMouseLeave={() => setHoveredText(null)}
      >
        <span 
          className={`inline-block transition-opacity duration-300 ${
            isHovered ? 'font-serif text-dark-text' : 'font-mono text-brand-navy'
          }`}
        >
          {displayText}
        </span>
      </div>
    );
  };

  return (
    <section id="braille-book" className="py-24 bg-light-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-dark-text mb-4 headline-underline">
            Interactive Braille Menu
          </h2>
          <p className="text-lg text-medium-text max-w-3xl mx-auto">
            Experience how braille menus work by exploring this interactive book. Hover over braille text to see the translation.
          </p>
        </div>

        <div 
          className="book-container perspective-1000"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="application"
          aria-label="Interactive Braille Book"
        >
          <div className={`book ${isFlipping ? 'flipping' : ''}`}>
            {/* Book Spine */}
            <div className="book-spine" />
            
            {/* Current Page */}
            <div className="page current-page">
              <div className="page-content">
                <div className="page-header">
                  <div className="page-number">Page {currentPage + 1}</div>
                  <div className="braille-indicator">⠠⠃⠗⠇</div>
                </div>
                
                <div className="braille-content">
                  <h3 className="text-2xl font-serif font-bold text-dark-text mb-6">
                    {bookPages[currentPage].title}
                  </h3>
                  
                  <div className="space-y-4">
                    {bookPages[currentPage].content.map((item) => (
                      <BrailleText key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Next Page Preview */}
            {canGoForward && (
              <div className="page next-page">
                <div className="page-content">
                  <div className="page-header">
                    <div className="page-number">Page {currentPage + 2}</div>
                    <div className="braille-indicator">⠠⠃⠗⠇</div>
                  </div>
                  
                  <div className="braille-content">
                    <h3 className="text-2xl font-serif font-bold text-dark-text mb-6">
                      {bookPages[currentPage + 1].title}
                    </h3>
                    
                    <div className="space-y-4 opacity-60">
                      {bookPages[currentPage + 1].content.slice(0, 2).map((item) => (
                        <div key={item.id} className="braille-line py-2">
                          <span className="font-mono text-brand-navy">
                            {translateToBraille(item.text)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-8 mt-8">
            <button
              onClick={() => flipPage('prev')}
              disabled={!canGoBack || isFlipping}
              className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all duration-300 ${
                canGoBack && !isFlipping
                  ? 'bg-brand-navy text-off-white hover:bg-brand-navy/90 shadow-medium'
                  : 'bg-light-gray text-medium-text cursor-not-allowed'
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            
            <div className="text-center">
              <div className="text-sm text-medium-text mb-1">Page</div>
              <div className="text-2xl font-serif font-bold text-dark-text">
                {currentPage + 1} of {totalPages}
              </div>
            </div>
            
            <button
              onClick={() => flipPage('next')}
              disabled={!canGoForward || isFlipping}
              className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all duration-300 ${
                canGoForward && !isFlipping
                  ? 'bg-brand-navy text-off-white hover:bg-brand-navy/90 shadow-medium'
                  : 'bg-light-gray text-medium-text cursor-not-allowed'
              }`}
              aria-label="Next page"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Instructions */}
          <div className="text-center mt-6 text-medium-text">
            <p className="text-sm">
              Hover over braille text to see translation • Use arrow keys or buttons to navigate
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrailleMenuBook;
