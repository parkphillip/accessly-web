
import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { translateToBraille } from '../utils/brailleUtils';

const BrailleMenuBook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [hoveredWord, setHoveredWord] = useState<{ line: number; word: number } | null>(null);

  const bookPages = [
    {
      type: 'cover',
      title: "The Grill House",
      content: ["Braille Menu", "Est. 2024"]
    },
    {
      type: 'page',
      title: "Appetizers",
      content: [
        "Caesar Salad - $12.00",
        "Fresh Bruschetta - $8.50",
        "Spinach Dip - $11.00",
      ]
    },
    {
      type: 'page',
      title: "Main Courses",
      content: [
        "Grilled Salmon - $24.00",
        "Pasta Primavera - $18.50",
        "8oz Beef Tenderloin - $32.00",
      ]
    },
    {
      type: 'page',
      title: "Desserts",
      content: [
        "Chocolate Mousse - $9.00",
        "Classic Tiramisu - $10.50",
        "Fresh Fruit Tart - $8.50"
      ]
    },
  ];

  const totalPages = bookPages.length;
  const canGoBack = currentPage > 0;
  const canGoForward = currentPage < totalPages - 1;

  const flipPage = useCallback((direction: 'next' | 'prev') => {
    if (isFlipping) return;

    if (direction === 'next' && canGoForward) {
      setIsFlipping(true);
      setCurrentPage(prev => prev + 1);
    } else if (direction === 'prev' && canGoBack) {
      setIsFlipping(true);
      setCurrentPage(prev => prev - 1);
    }

    setTimeout(() => setIsFlipping(false), 1000); // Match CSS animation time
  }, [isFlipping, canGoForward, canGoBack]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      flipPage('next');
    } else if (e.key === 'ArrowLeft') {
      flipPage('prev');
    }
  };

  const Word = ({ text, lineIdx, wordIdx }: { text: string, lineIdx: number, wordIdx: number }) => {
    const isHovered = hoveredWord?.line === lineIdx && hoveredWord?.word === wordIdx;
    const displayText = isHovered ? text : translateToBraille(text);

    return (
      <span
        onMouseEnter={() => setHoveredWord({ line: lineIdx, word: wordIdx })}
        onMouseLeave={() => setHoveredWord(null)}
        className={`braille-word ${isHovered ? 'translated' : ''}`}
      >
        {displayText}
      </span>
    );
  };
  
  return (
    <section id="braille-book" className="py-24 bg-light-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-dark-text mb-4 headline-underline">
            An Interactive Braille Menu
          </h2>
          <p className="text-lg text-medium-text max-w-3xl mx-auto">
            Experience a tactile menu, brought to life. Hover over braille to translate, and use the arrows to flip pages.
          </p>
        </div>

        <div 
          className="book-container"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="application"
          aria-label="Interactive Braille Book"
        >
          <div className={`book ${isFlipping ? 'is-flipping' : ''}`}>
            <div className="book-spine"></div>
            {bookPages.map((page, index) => (
              <div
                key={index}
                className={`page ${page.type} ${currentPage > index ? 'flipped' : ''}`}
                style={{ zIndex: currentPage > index ? index : totalPages - index }}
              >
                <div className="page-face front">
                  <div className="page-content">
                    <h3 className={`text-3xl font-serif font-bold mb-8 ${page.type === 'cover' ? 'text-center' : ''}`}>
                      {page.title}
                    </h3>
                    <div className="space-y-4">
                      {page.content.map((line, lineIndex) => (
                        <p key={lineIndex} className={`braille-line ${page.type === 'cover' ? 'text-center' : ''}`}>
                          {line.split(' ').map((word, wordIndex) => (
                            <React.Fragment key={wordIndex}>
                              <Word text={word} lineIdx={lineIndex} wordIdx={wordIndex} />
                              {' '}
                            </React.Fragment>
                          ))}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="page-face back">
                  {/* Back of page content can be added here if needed */}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center items-center gap-8 mt-12">
            <button
              onClick={() => flipPage('prev')}
              disabled={!canGoBack || isFlipping}
              className="primary-button flex items-center gap-2 disabled:bg-light-gray disabled:text-medium-text disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            
            <div className="text-center">
              <div className="text-2xl font-serif font-bold text-dark-text">
                Page {currentPage + 1} of {totalPages}
              </div>
            </div>
            
            <button
              onClick={() => flipPage('next')}
              disabled={!canGoForward || isFlipping}
              className="primary-button flex items-center gap-2 disabled:bg-light-gray disabled:text-medium-text disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrailleMenuBook;
