import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { translateToBraille, sampleTexts } from '../utils/brailleUtils';
import MenuInput from './MenuInput';

interface Page {
  type: 'cover' | 'page';
  title: string;
  content: string[];
}

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

const PageContent = ({ page }: { page: Page | undefined }) => {
  if (!page || page.content.length === 0 && !page.title) {
    return <div className="page-content" />;
  }

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

const BrailleMenuBook = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState(0); // Represents the number of turned sheets
  const [isFlipping, setIsFlipping] = useState(false);

  const generatePages = useCallback((text: string): Page[] => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const linesPerPage = 6;
    const contentPages: Page[] = [];

    for (let i = 0; i < lines.length; i += linesPerPage) {
      const chunk = lines.slice(i, i + linesPerPage);
      contentPages.push({
        type: 'page',
        title: i === 0 ? 'Menu' : '',
        content: chunk,
      });
    }

    const finalPages = [
      { type: 'page', title: '', content: [] }, // Inside front cover
      {
        type: 'cover',
        title: "Accessly Menu",
        content: ["Your Custom Braille Menu"]
      },
      ...contentPages,
      { type: 'page', title: '', content: [] }, // Final blank page for back cover
    ];
    
    // Ensure there's an even number of pages after the cover for complete spreads
    if ((finalPages.length - 1) % 2 !== 0) {
      finalPages.push({ type: 'page', title: '', content: [] });
    }

    return finalPages;
  }, []);

  useEffect(() => {
    setPages(generatePages(sampleTexts.join('\n\n')));
  }, [generatePages]);

  const handleMenuUpdate = (text: string) => {
    setPages(generatePages(text));
    setCurrentPage(0);
  };

  const pageSpreads: { front: Page; back?: Page; index: number }[] = [];
  if (pages.length > 1) {
    // Start at 1 to skip the inside front cover, which is not a flippable page
    for (let i = 1; i < pages.length; i += 2) {
      pageSpreads.push({
        front: pages[i],
        back: pages[i + 1],
        index: (i - 1) / 2, // Sheet index (0, 1, 2...)
      });
    }
  }
  const totalSheets = pageSpreads.length;

  const canGoBack = currentPage > 0;
  const canGoForward = currentPage < totalSheets;

  const flipPage = useCallback((direction: 'next' | 'prev') => {
    if (isFlipping) return;

    if (direction === 'next' && canGoForward) {
      setIsFlipping(true);
      setCurrentPage(prev => prev + 1);
    } else if (direction === 'prev' && canGoBack) {
      setIsFlipping(true);
      setCurrentPage(prev => prev - 1);
    }

    setTimeout(() => setIsFlipping(false), 800); // Match CSS transition duration
  }, [isFlipping, canGoForward, canGoBack]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      flipPage('next');
    } else if (e.key === 'ArrowLeft') {
      flipPage('prev');
    }
  };

  const DisplayedPageNumber = () => {
    if (currentPage === 0) return "Cover";
    if (currentPage >= totalSheets) return "Back";
    
    const leftPageNum = (currentPage * 2) - 1;
    const rightPageNum = currentPage * 2;
    
    const currentSpread = pageSpreads[currentPage];
    if (!currentSpread || !currentSpread.back || currentSpread.back.content.length === 0) {
      return `Page ${leftPageNum}`;
    }

    return `Pages ${leftPageNum} - ${rightPageNum}`;
  }
  
  return (
    <section id="braille-book" className="py-24 bg-light-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-dark-text mb-4">
            Create a Braille Menu
          </h2>
          <p className="text-lg text-medium-text max-w-3xl mx-auto">
            Enter text or upload an image. Flip the book. Hover to translate.
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
            {pageSpreads.map((sheet) => (
              <div
                key={sheet.index}
                className={`page ${sheet.front.type} ${currentPage > sheet.index ? 'flipped' : ''}`}
                style={{ zIndex: currentPage > sheet.index ? sheet.index : totalSheets - sheet.index }}
              >
                <div className="page-face front">
                  <PageContent page={sheet.front} />
                </div>
                <div className="page-face back">
                  <PageContent page={sheet.back} />
                </div>
              </div>
            ))}
          </div>
          
          <div className="book-navigation flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => flipPage('prev')}
              disabled={!canGoBack || isFlipping}
              className="secondary-button p-3 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="text-center font-sans text-medium-text w-24">
                <DisplayedPageNumber />
            </div>
            
            <button
              onClick={() => flipPage('next')}
              disabled={!canGoForward || isFlipping}
              className="secondary-button p-3 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrailleMenuBook;
