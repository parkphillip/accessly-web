
import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { translateToBraille, sampleTexts } from '../utils/brailleUtils';
import MenuInput from './MenuInput';

interface Page {
  type: 'cover' | 'page';
  title: string;
  content: string[];
}

const BrailleMenuBook = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [hoveredWordId, setHoveredWordId] = useState<string | null>(null);

  const generatePages = useCallback((text: string): Page[] => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const linesPerPage = 8;
    const contentPages: Page[] = [];

    for (let i = 0; i < lines.length; i += linesPerPage) {
      const chunk = lines.slice(i, i + linesPerPage);
      contentPages.push({
        type: 'page',
        title: i === 0 ? 'Menu Highlights' : '',
        content: chunk,
      });
    }

    return [
      { type: 'page', title: '', content: [] }, // Inside front cover
      {
        type: 'cover',
        title: "The Grill House",
        content: ["Your Custom Menu", "Est. 2024"]
      },
      ...contentPages,
      { type: 'page', title: '', content: [] }, // Final blank page
    ];
  }, []);

  useEffect(() => {
    setPages(generatePages(sampleTexts.join('\n\n')));
  }, [generatePages]);

  const handleMenuUpdate = (text: string) => {
    setPages(generatePages(text));
    setCurrentPage(1);
  };

  const totalPages = pages.length;
  const canGoBack = currentPage > 1;
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

    setTimeout(() => setIsFlipping(false), 1000);
  }, [isFlipping, canGoForward, canGoBack]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      flipPage('next');
    } else if (e.key === 'ArrowLeft') {
      flipPage('prev');
    }
  };

  const Word = ({ text, pageIdx, lineIdx, wordIdx }: { text: string, pageIdx: number, lineIdx: number, wordIdx: number }) => {
    const wordId = `${pageIdx}-${lineIdx}-${wordIdx}`;
    const isHovered = hoveredWordId === wordId;
    const displayText = isHovered ? text : translateToBraille(text);

    return (
      <span
        onMouseEnter={() => setHoveredWordId(wordId)}
        onMouseLeave={() => setHoveredWordId(null)}
        className={`braille-word ${isHovered ? 'translated' : ''}`}
      >
        {displayText}
      </span>
    );
  };
  
  const DisplayedPageNumber = () => {
    if (currentPage === 1) return "Cover";
    if (currentPage >= totalPages - 1) return "Back";
    return `Page ${currentPage - 1}`;
  }
  
  return (
    <section id="braille-book" className="py-24 bg-light-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-dark-text mb-4 headline-underline">
            An Interactive Braille Menu
          </h2>
          <p className="text-lg text-medium-text max-w-3xl mx-auto">
            Create your own accessible menu below. Hover over braille to translate, and use the arrows to flip pages.
          </p>
        </div>

        <MenuInput onUpdate={handleMenuUpdate} />

        <div 
          className="book-container"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="application"
          aria-label="Interactive Braille Book"
        >
          <div className={`book ${isFlipping ? 'is-flipping' : ''}`}>
            <div className="book-spine"></div>
            {pages.map((page, index) => (
              <div
                key={index}
                className={`page ${page.type} ${currentPage > index ? 'flipped' : ''}`}
                style={{ zIndex: currentPage > index ? index : totalPages - index }}
              >
                <div className="page-face front">
                  <div className="page-content">
                    {page.title && (
                      <h3 className={`text-3xl font-serif font-bold mb-8 ${page.type === 'cover' ? 'text-center' : ''}`}>
                        {page.title}
                      </h3>
                    )}
                    <div className="space-y-4">
                      {page.content.map((line, lineIndex) => (
                        <p key={lineIndex} className={`braille-line ${page.type === 'cover' ? 'text-center' : ''}`}>
                          {line.split(' ').map((word, wordIndex) => (
                            <span key={wordIndex}>
                              <Word text={word} pageIdx={index} lineIdx={lineIndex} wordIdx={wordIndex} />
                              {' '}
                            </span>
                          ))}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="page-face back" />
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
                <DisplayedPageNumber />
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
