
import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Info } from 'lucide-react';
import BrailleBook3D from './BrailleBook3D';
import MenuContentInput from './MenuContentInput';
import { translateToBraille, formatMenuContent, BrailleChar } from '../utils/brailleTranslator';

const BrailleMenuPreview = () => {
  const [menuContent, setMenuContent] = useState(`Fine Dining Menu

Appetizers
Caesar Salad - $12
Bruschetta with Tomatoes - $8
Spinach Artichoke Dip - $10

Main Courses
Grilled Salmon - $24
Ribeye Steak - $32
Chicken Parmesan - $19
Pasta Primavera - $18

Desserts
Chocolate Cake - $7
Tiramisu - $8
Ice Cream - $5`);

  const [currentPage, setCurrentPage] = useState(0);
  const [showInput, setShowInput] = useState(false);

  const braillePages = useMemo(() => {
    const formatted = formatMenuContent(menuContent);
    const allContent = [formatted.title, '', ...formatted.items].join('\n');
    const brailleChars = translateToBraille(allContent);
    
    // Split into pages (roughly 15-20 lines per page)
    const charsPerPage = 300;
    const pages: BrailleChar[][] = [];
    
    for (let i = 0; i < brailleChars.length; i += charsPerPage) {
      pages.push(brailleChars.slice(i, i + charsPerPage));
    }
    
    return pages.length > 0 ? pages : [[]];
  }, [menuContent]);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 2));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(braillePages.length - 2, prev + 2));
  };

  const handleReset = () => {
    setCurrentPage(0);
    setMenuContent(`Fine Dining Menu

Appetizers
Caesar Salad - $12
Bruschetta with Tomatoes - $8

Main Courses
Grilled Salmon - $24
Ribeye Steak - $32`);
  };

  return (
    <section id="workshop" className="py-24 bg-light-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-dark-text mb-4 headline-underline">
            Interactive Braille Menu Preview
          </h2>
          <p className="text-lg text-medium-text max-w-3xl mx-auto">
            Experience how your menu content transforms into braille. Hover over any braille text to see the English translation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <div className="structured-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif font-bold text-dark-text">
                  Menu Content
                </h3>
                <button
                  onClick={() => setShowInput(!showInput)}
                  className="text-sm text-brand-navy hover:text-brand-navy/80 font-medium"
                >
                  {showInput ? 'Hide' : 'Edit'}
                </button>
              </div>

              {showInput && (
                <MenuContentInput
                  content={menuContent}
                  onContentChange={setMenuContent}
                />
              )}

              {/* Statistics */}
              <div className="mt-6 p-4 bg-subtle-gray rounded-lg">
                <h4 className="font-medium text-dark-text mb-3">Translation Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-medium-text">Total Pages:</span>
                    <span className="font-medium">{Math.ceil(braillePages.length / 2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-medium-text">Characters:</span>
                    <span className="font-medium">{menuContent.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-medium-text">Braille Cells:</span>
                    <span className="font-medium">{braillePages.flat().length}</span>
                  </div>
                </div>
              </div>

              {/* Info Panel */}
              <div className="mt-6 p-4 bg-brand-navy/5 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-brand-navy mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium text-dark-text mb-2">How to Use</h4>
                    <ul className="text-sm text-medium-text space-y-1">
                      <li>• Hover over braille text to see English</li>
                      <li>• Use arrows to flip pages</li>
                      <li>• Drag to rotate the book</li>
                      <li>• Scroll to zoom in/out</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Book Display */}
          <div className="lg:col-span-2">
            <div className="structured-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif font-bold text-dark-text">
                  3D Braille Menu
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-medium-text">
                    Page {Math.floor(currentPage / 2) + 1} of {Math.ceil(braillePages.length / 2)}
                  </span>
                  <button
                    onClick={handleReset}
                    className="p-2 text-medium-text hover:text-dark-text transition-colors"
                    title="Reset to first page"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 3D Book */}
              <BrailleBook3D
                pages={braillePages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />

              {/* Navigation Controls */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-brand-navy text-off-white rounded-md hover:bg-brand-navy/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                
                <div className="flex gap-1">
                  {Array.from({ length: Math.ceil(braillePages.length / 2) }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i * 2)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        Math.floor(currentPage / 2) === i
                          ? 'bg-brand-navy'
                          : 'bg-light-gray hover:bg-medium-text'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= braillePages.length - 2}
                  className="flex items-center gap-2 px-4 py-2 bg-brand-navy text-off-white rounded-md hover:bg-brand-navy/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Keyboard Shortcuts */}
              <div className="mt-6 text-center">
                <p className="text-xs text-medium-text">
                  Use ← → arrow keys to navigate pages | Drag to rotate | Scroll to zoom
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrailleMenuPreview;
