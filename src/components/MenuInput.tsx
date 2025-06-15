
import React, { useState } from 'react';
import { Textarea } from './ui/textarea';
import { sampleTexts } from '../utils/brailleUtils';
import { UploadCloud } from 'lucide-react';
import { Switch } from './ui/switch';

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
    <div className="mb-12 p-8 structured-card max-w-4xl mx-auto">
      <h3 className="text-2xl font-serif font-bold text-dark-text mb-4">Create Your Menu</h3>
      <p className="text-medium-text mb-6">
        Choose your input method. The book will automatically paginate the content. For best results, separate menu items with a new line.
      </p>

      <div className="flex items-center justify-center gap-4 mb-8">
        <label htmlFor="input-type-toggle" className={`cursor-pointer transition-colors ${inputType === 'text' ? 'text-primary-blue font-semibold' : 'text-medium-text'}`}>
          Paste Text
        </label>
        <Switch
          id="input-type-toggle"
          checked={inputType === 'image'}
          onCheckedChange={(checked) => {
            setInputType(checked ? 'image' : 'text');
            setSelectedFile(null);
            setText(sampleTexts.join('\n\n'));
          }}
        />
        <label htmlFor="input-type-toggle" className={`cursor-pointer transition-colors ${inputType === 'image' ? 'text-primary-blue font-semibold' : 'text-medium-text'}`}>
          Upload Image
        </label>
      </div>

      {inputType === 'text' ? (
        <div className="animate-fade-in">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your menu here..."
            className="form-input min-h-[200px] text-base"
            rows={10}
          />
        </div>
      ) : (
        <div className="animate-fade-in">
          <div
            onClick={handleUploadAreaClick}
            className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-light-bg/50 hover:border-primary-blue transition-colors min-h-[200px]"
          >
            <input
              type="file"
              id="menu-image-upload"
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileChange}
            />
            <UploadCloud className="w-10 h-10 text-gray-400 mb-4" />
            <p className="text-dark-text font-semibold">Click to upload an image</p>
            <p className="text-sm text-medium-text">PNG, JPG, or WEBP</p>
            {selectedFile && (
              <p className="text-sm text-green-600 mt-2">Selected: {selectedFile.name}</p>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end mt-8">
        <button onClick={handleSubmit} className="primary-button">
          Generate Braille Menu
        </button>
      </div>
    </div>
  );
};

export default MenuInput;
