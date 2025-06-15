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
  const [currentPage, setCurrentPage] = useState(0); // Index of the current page
  const [isFlipping, setIsFlipping] = useState(false);

  const generatePages = useCallback((text: string): Page[] => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const linesPerPage = 8;
    const contentPages: Page[] = [];

    for (let i = 0; i < lines.length; i += linesPerPage) {
      const chunk = lines.slice(i, i + linesPerPage);
      contentPages.push({
        type: 'page',
        title: i === 0 ? 'Menu' : '',
        content: chunk,
      });
    }

    return [
      {
        type: 'cover',
        title: "Accessly Menu",
        content: ["Your Custom Braille Menu"]
      },
      ...contentPages
    ];
  }, []);

  useEffect(() => {
    setPages(generatePages(sampleTexts.join('\n\n')));
  }, [generatePages]);

  const handleMenuUpdate = (text: string) => {
    setPages(generatePages(text));
    setCurrentPage(0);
  };

  const totalPages = pages.length;
  const activePage = pages[currentPage];

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

    setTimeout(() => setIsFlipping(false), 800); // Match CSS animation duration
  }, [isFlipping, canGoForward, canGoBack]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      flipPage('next');
    } else if (e.key === 'ArrowLeft') {
      flipPage('prev');
    }
  };

  const DisplayedPageNumber = () => {
    if (!activePage) return null;
    if (activePage.type === 'cover') return "Cover";
    // For simplicity, we'll just show page numbers. Last page will be a number too.
    return `Page ${currentPage}`;
  }
  
  return (
    <section id="braille-book" className="py-24 bg-light-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-dark-text mb-4">
            Create a Braille Menu
          </h2>
          <p className="text-lg text-medium-text max-w-3xl mx-auto">
            Enter your menu on the left. See the braille version on the right.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:items-stretch">
          <div className="lg:w-2/5 w-full lg:sticky top-8">
            <MenuInput onUpdate={handleMenuUpdate} />
          </div>

          <div className="lg:w-3/5 w-full">
            <div 
              className="book-container"
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="application"
              aria-label="Interactive Braille Book"
            >
              <div className="book">
                <div className={`page single-page ${isFlipping ? 'is-flipping' : ''}`}>
                  <PageContent page={activePage} />
                </div>
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
                
                <div className="text-center font-sans text-medium-text w-32">
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
        </div>
      </div>
    </section>
  );
};

export default BrailleMenuBook;
