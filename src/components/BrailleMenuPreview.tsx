
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Upload, Type, RotateCcw } from 'lucide-react';
import { brailleMap, translateToBraille, sampleTexts } from '../utils/brailleUtils';

interface Page {
  id: number;
  brailleText: string;
  englishText: string;
}

const BrailleMenuPreview = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState<Page[]>([]);
  const [inputText, setInputText] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'image'>('text');
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  // Initialize with sample content
  useEffect(() => {
    const samplePages = sampleTexts.map((text, index) => ({
      id: index,
      brailleText: translateToBraille(text),
      englishText: text
    }));
    setPages(samplePages);
  }, []);

  const handleAddPage = () => {
    if (!inputText.trim()) return;
    
    const newPage: Page = {
      id: pages.length,
      brailleText: translateToBraille(inputText),
      englishText: inputText
    };
    
    setPages([...pages, newPage]);
    setInputText('');
    setCurrentPage(pages.length); // Go to new page
  };

  const handlePageFlip = (direction: 'next' | 'prev') => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setTimeout(() => setIsFlipping(false), 600);
    
    if (direction === 'next' && currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleImageUpload = () => {
    // Simulate image-to-braille conversion
    const simulatedText = "Appetizers\nBruschetta - Fresh tomatoes, basil, garlic\nCaesar Salad - Romaine lettuce, parmesan";
    setInputText(simulatedText);
  };

  const renderBrailleLine = (line: string, lineIndex: number) => {
    const words = line.split(' ');
    return (
      <div key={lineIndex} className="flex flex-wrap gap-4 mb-4">
        {words.map((word, wordIndex) => {
          const wordKey = `${lineIndex}-${wordIndex}`;
          const isHovered = hoveredWord === wordKey;
          const englishWords = pages[currentPage]?.englishText.split('\n')[lineIndex]?.split(' ') || [];
          const englishWord = englishWords[wordIndex] || word;
          
          return (
            <span
              key={wordKey}
              className="relative inline-block cursor-pointer transition-all duration-300 hover:bg-brand-terracotta/10 px-1 py-0.5 rounded"
              onMouseEnter={() => setHoveredWord(wordKey)}
              onMouseLeave={() => setHoveredWord(null)}
              tabIndex={0}
              role="button"
              aria-label={`Braille word: ${englishWord}`}
            >
              <span 
                className={`font-mono text-lg transition-all duration-300 ${
                  isHovered ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
                }`}
              >
                {word}
              </span>
              <span 
                className={`absolute inset-0 flex items-center justify-center font-sans text-brand-navy transition-all duration-300 ${
                  isHovered ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'
                }`}
              >
                {englishWord}
              </span>
            </span>
          );
        })}
      </div>
    );
  };

  if (pages.length === 0) {
    return (
      <section id="braille-preview" className="py-16 bg-light-bg">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="animate-pulse">Loading braille preview...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="braille-preview" className="py-16 bg-light-bg">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-dark-text mb-4 headline-underline">
            Interactive Braille Menu Preview
          </h2>
          <p className="text-lg text-medium-text max-w-2xl mx-auto">
            Experience how your menu looks and feels in braille. Hover over any braille text to see the translation.
          </p>
        </div>

        {/* Input Section */}
        <div className="structured-card p-6 mb-8 max-w-2xl mx-auto">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setInputMode('text')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                inputMode === 'text' ? 'bg-brand-navy text-off-white' : 'bg-subtle-gray text-medium-text'
              }`}
            >
              <Type className="w-4 h-4" />
              Type Text
            </button>
            <button
              onClick={() => {
                setInputMode('image');
                handleImageUpload();
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                inputMode === 'image' ? 'bg-brand-navy text-off-white' : 'bg-subtle-gray text-medium-text'
              }`}
            >
              <Upload className="w-4 h-4" />
              Upload Menu (Demo)
            </button>
          </div>
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your menu text here..."
            className="form-input h-24 resize-none mb-4"
            disabled={inputMode === 'image'}
          />
          
          <button
            onClick={handleAddPage}
            disabled={!inputText.trim()}
            className="primary-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Braille Menu
          </button>
        </div>

        {/* 3D Book Container */}
        <div className="relative max-w-4xl mx-auto">
          <div className="book-container perspective-1000">
            <div className={`book ${isFlipping ? 'flipping' : ''}`}>
              {/* Book Spine */}
              <div className="book-spine"></div>
              
              {/* Current Page */}
              <div className="page current-page">
                <div className="page-content">
                  <div className="page-header">
                    <span className="page-number">Page {currentPage + 1}</span>
                    <span className="braille-indicator">⠃⠗⠁⠊⠇⠇⠑</span>
                  </div>
                  
                  <div className="braille-content">
                    {pages[currentPage]?.brailleText.split('\n').map((line, index) => 
                      renderBrailleLine(line, index)
                    )}
                  </div>
                </div>
              </div>

              {/* Next Page Preview */}
              {currentPage < pages.length - 1 && (
                <div className="page next-page">
                  <div className="page-content">
                    <div className="page-header">
                      <span className="page-number">Page {currentPage + 2}</span>
                      <span className="braille-indicator">⠃⠗⠁⠊⠇⠇⠑</span>
                    </div>
                    <div className="braille-content opacity-50">
                      {pages[currentPage + 1]?.brailleText.split('\n').slice(0, 3).map((line, index) => (
                        <div key={index} className="font-mono text-lg mb-4">{line}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => handlePageFlip('prev')}
              disabled={currentPage === 0 || isFlipping}
              className="flex items-center gap-2 secondary-button disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="flex items-center gap-4">
              <span className="text-medium-text">
                {currentPage + 1} of {pages.length}
              </span>
              <button
                onClick={() => {
                  setPages(sampleTexts.map((text, index) => ({
                    id: index,
                    brailleText: translateToBraille(text),
                    englishText: text
                  })));
                  setCurrentPage(0);
                }}
                className="flex items-center gap-2 text-medium-text hover:text-brand-navy transition-colors"
                aria-label="Reset to sample pages"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            <button
              onClick={() => handlePageFlip('next')}
              disabled={currentPage === pages.length - 1 || isFlipping}
              className="flex items-center gap-2 secondary-button disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-12 text-medium-text">
          <p className="mb-2">
            <strong>Hover</strong> over any braille text to see the English translation
          </p>
          <p>
            Use the <strong>arrow keys</strong> or buttons to navigate between pages
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrailleMenuPreview;
