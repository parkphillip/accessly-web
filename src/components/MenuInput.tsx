import React, { useState } from 'react';
import { Textarea } from './ui/textarea';
import { sampleTexts } from '../utils/brailleUtils';
import { UploadCloud } from 'lucide-react';

interface MenuInputProps {
  onUpdate: (text: string) => void;
}

const MenuInput: React.FC<MenuInputProps> = ({ onUpdate }) => {
  const [text, setText] = useState(sampleTexts.join('\n\n'));
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputType, setInputType] = useState<'text' | 'image'>('text');

  const handleSubmit = () => {
    if (inputType === 'text') {
      onUpdate(text);
    } else if (selectedFile) {
      // As requested, text extraction isn't implemented. We'll generate placeholder content.
      onUpdate(`Menu from ${selectedFile.name}:\n\n- Appetizer Example\n- Main Course Example\n- Dessert Example`);
    } else {
      onUpdate(''); // Send empty if no image is selected
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadAreaClick = () => {
    document.getElementById('menu-image-upload')?.click();
  };

  return (
    <div className="p-8 structured-card h-full flex flex-col">
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center bg-subtle-gray p-1 rounded-lg space-x-1">
          <button 
            onClick={() => { setInputType('text'); setText(sampleTexts.join('\n\n')); setSelectedFile(null); }} 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${inputType === 'text' ? 'bg-off-white text-brand-navy shadow-sm' : 'text-medium-text hover:bg-light-gray/50'}`}
          >
            Paste Text
          </button>
          <button 
            onClick={() => { setInputType('image'); setText(''); setSelectedFile(null); }} 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${inputType === 'image' ? 'bg-off-white text-brand-navy shadow-sm' : 'text-medium-text hover:bg-light-gray/50'}`}
          >
            Upload Image
          </button>
        </div>
      </div>

      <div className="flex-grow flex flex-col">
        {inputType === 'text' ? (
          <div className="animate-fade-in h-full">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your menu here..."
              className="form-input text-base font-sans w-full h-full resize-none bg-light-bg border-subtle-gray focus:border-brand-navy focus:ring-brand-navy/20"
            />
          </div>
        ) : (
          <div className="animate-fade-in h-full">
            <div
              onClick={handleUploadAreaClick}
              className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-subtle-gray rounded-lg cursor-pointer hover:bg-light-bg/50 hover:border-brand-navy transition-colors h-full bg-light-bg"
            >
              <input
                type="file"
                id="menu-image-upload"
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
              />
              <UploadCloud className="w-10 h-10 text-gray-400 mb-4" />
              <p className="text-dark-text font-semibold">Click to upload your menu image</p>

              <p className="text-sm text-medium-text">PNG, JPG, or WEBP</p>
              {selectedFile && (
                <p className="text-sm text-green-600 mt-4 bg-green-100 px-3 py-1 rounded-full">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-8">
        <button onClick={handleSubmit} className="primary-button">
          Generate Braille Menu
        </button>
      </div>
    </div>
  );
};

export default MenuInput;
