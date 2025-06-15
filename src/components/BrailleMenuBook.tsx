import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { translateToBraille, sampleTexts } from '../utils/brailleUtils';
import MenuInput from './MenuInput';

interface Page {
  type: 'cover' | 'page';
  title: string;
  content: string[];
}

interface Leaf {
  front: Page;
  back?: Page;
}

const BrailleMenuBook = () => {
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [currentLeafIndex, setCurrentLeafIndex] = useState(0); // Start at 0 to show first spread
  const [isFlipping, setIsFlipping] = useState(false);

  const generateLeaves = useCallback((text: string): Leaf[] => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const linesPerPage = 6;
    const contentPages: Page[] = [];

    for (let i = 0; i < lines.length; i += linesPerPage) {
      const chunk = lines.slice(i, i + linesPerPage);
      contentPages.push({
        type: 'page',
        title: '', 
        content: chunk,
      });
    }

    const pages: Page[] = [
      {
        type: 'cover',
        title: "Accessly Menus",
        content: ["Your Custom Menu", "Est. 2024"]
      }, // Cover (pages[0])
      { type: 'page', title: '', content: [] }, // Inside front cover (pages[1])
      ...contentPages,
      { type: 'page', title: '', content: [] }, // Final blank page for back cover
    ];

    const generatedLeaves: Leaf[] = [];
    
    // Create leaves with proper left/right page assignment
    for (let i = 0; i < pages.length; i += 2) {
      generatedLeaves.push({
        front: pages[i],      // Left page
        back: pages[i + 1],   // Right page
      });
    }

    return generatedLeaves;
  }, []);

  useEffect(() => {
    setLeaves(generateLeaves(sampleTexts.join('\n\n')));
  }, [generateLeaves]);

  const handleMenuUpdate = (text: string) => {
    setLeaves(generateLeaves(text));
    setCurrentLeafIndex(0); // Reset to first spread when menu updates
  };

  const totalLeaves = leaves.length;
  const canGoBack = currentLeafIndex > 0;
  const canGoForward = currentLeafIndex < totalLeaves - 1;

  const flipPage = useCallback((direction: 'next' | 'prev') => {
    if (isFlipping) return;

    if (direction === 'next' && canGoForward) {
      setIsFlipping(true);
      setCurrentLeafIndex(prev => prev + 1);
    } else if (direction === 'prev' && canGoBack) {
      setIsFlipping(true);
      setCurrentLeafIndex(prev => prev - 1);
    }

    setTimeout(() => setIsFlipping(false), 700); // Match CSS transition duration
  }, [isFlipping, canGoForward, canGoBack]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      flipPage('next');
    } else if (e.key === 'ArrowLeft') {
      flipPage('prev');
    }
  };

  const Word = ({ text }: { text: string }) => {
    return (
      <span
        className="braille-word"
        data-english={text}
      >
        {translateToBraille(text)}
      </span>
    );
  };
  
  const PageContent = ({ page }: { page?: Page }) => {
    if (!page) return null;
    return (
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
                  <Word text={word} />
                  {' '}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    );
  };

  const DisplayedPageNumber = () => {
    if (currentLeafIndex === 0) return "Cover & Page 1";
    
    const leftPage = (currentLeafIndex * 2) - 1;
    const rightPage = leftPage + 1;
    return `Pages ${leftPage} - ${rightPage}`;
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
          <div className="book open">
            {leaves.map((leaf, index) => {
              const isCurrentSpread = index === currentLeafIndex;
              const zIndex = isCurrentSpread ? 10 : totalLeaves - index;
              
              return (
                <React.Fragment key={index}>
                  {/* Left page */}
                  <div
                    className={`page ${leaf.front.type} ${currentLeafIndex > index ? 'flipped' : ''}`}
                    style={{ zIndex }}
                  >
                    <div className="page-face front">
                      <PageContent page={leaf.front} />
                    </div>
                    <div className="page-face back">
                      <PageContent page={leaf.back} />
                    </div>
                  </div>
                  
                  {/* Right page */}
                  {leaf.back && (
                    <div
                      className={`page ${leaf.back.type} ${currentLeafIndex > index ? 'flipped' : ''}`}
                      style={{ zIndex: zIndex - 0.5 }}
                    >
                      <div className="page-face front">
                        <PageContent page={leaf.back} />
                      </div>
                      <div className="page-face back">
                        {/* Back of right page - could show next page preview */}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
            <div className="book-spine"></div>
          </div>
          
          <div className="book-navigation flex justify-center items-center gap-8 mt-12">
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
