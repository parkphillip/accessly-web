
import React, { useState } from 'react';
import { Upload, Type, FileText } from 'lucide-react';

interface MenuContentInputProps {
  onContentChange: (content: string) => void;
  content: string;
}

const MenuContentInput: React.FC<MenuContentInputProps> = ({ onContentChange, content }) => {
  const [inputMode, setInputMode] = useState<'text' | 'image'>('text');
  const [dragActive, setDragActive] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(e.target.value);
  };

  const handleImageUpload = (files: FileList | null) => {
    if (files && files[0]) {
      // Simulate OCR extraction for demo purposes
      const mockExtractedText = `Appetizers
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
Ice Cream - $5`;
      
      onContentChange(mockExtractedText);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleImageUpload(e.dataTransfer.files);
  };

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setInputMode('text')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            inputMode === 'text'
              ? 'bg-brand-navy text-off-white'
              : 'bg-subtle-gray text-medium-text hover:bg-light-gray'
          }`}
        >
          <Type className="w-4 h-4" />
          Text Input
        </button>
        <button
          onClick={() => setInputMode('image')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            inputMode === 'image'
              ? 'bg-brand-navy text-off-white'
              : 'bg-subtle-gray text-medium-text hover:bg-light-gray'
          }`}
        >
          <Upload className="w-4 h-4" />
          Image Upload
        </button>
      </div>

      {/* Input Area */}
      {inputMode === 'text' ? (
        <div>
          <label className="form-label">Menu Content</label>
          <textarea
            value={content}
            onChange={handleTextChange}
            placeholder="Enter your menu content here...&#10;&#10;Example:&#10;Appetizers&#10;Caesar Salad - $12&#10;Bruschetta - $8&#10;&#10;Main Courses&#10;Grilled Salmon - $24"
            className="form-input min-h-[200px] font-mono text-sm"
            rows={12}
          />
          <p className="text-sm text-medium-text mt-2">
            Enter menu items line by line. The first line will be used as the menu title.
          </p>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-brand-navy bg-brand-navy/5'
              : 'border-light-gray hover:border-medium-text'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <FileText className="w-12 h-12 text-medium-text mx-auto mb-4" />
          <h3 className="text-lg font-medium text-dark-text mb-2">
            Upload Menu Image
          </h3>
          <p className="text-medium-text mb-4">
            Drag and drop a menu image here, or click to select
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files)}
            className="hidden"
            id="menu-upload"
          />
          <label
            htmlFor="menu-upload"
            className="secondary-button cursor-pointer inline-block"
          >
            Choose File
          </label>
          <p className="text-xs text-medium-text mt-3">
            Supports JPG, PNG, PDF. OCR will extract text automatically.
          </p>
        </div>
      )}
    </div>
  );
};

export default MenuContentInput;
