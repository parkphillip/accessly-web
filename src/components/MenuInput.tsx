
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

  const handleSubmit = () => {
    onUpdate(text);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // For now, we'll just show the file name in the text area.
      // Actual text extraction would happen here in a full implementation.
      setText(`Processing menu from: ${file.name}`);
    }
  };

  const handleUploadAreaClick = () => {
    document.getElementById('menu-image-upload')?.click();
  };

  return (
    <div className="mb-12 p-8 structured-card max-w-4xl mx-auto">
      <h3 className="text-2xl font-serif font-bold text-dark-text mb-4">Create Your Menu</h3>
      <p className="text-medium-text mb-6">
        Enter your menu text below, or upload an image. The book will automatically paginate the content. For best results, separate menu items with a new line.
      </p>
      <Textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setSelectedFile(null); // Clear file when text is manually edited
        }}
        placeholder="Paste your menu here..."
        className="form-input min-h-[200px] text-base"
        rows={10}
      />

      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-medium-text uppercase text-sm">Or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div
        onClick={handleUploadAreaClick}
        className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-light-bg/50 hover:border-primary-blue transition-colors"
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

      <div className="flex justify-end mt-8">
        <button onClick={handleSubmit} className="primary-button">
          Generate Braille Menu
        </button>
      </div>
    </div>
  );
};

export default MenuInput;
