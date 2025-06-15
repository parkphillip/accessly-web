
import React, { useState } from 'react';
import { Textarea } from './ui/textarea';
import { sampleTexts } from '../utils/brailleUtils';

interface MenuInputProps {
  onUpdate: (text: string) => void;
}

const MenuInput: React.FC<MenuInputProps> = ({ onUpdate }) => {
  const [text, setText] = useState(sampleTexts.join('\n\n'));

  const handleSubmit = () => {
    onUpdate(text);
  };

  return (
    <div className="mb-12 p-8 structured-card max-w-4xl mx-auto">
      <h3 className="text-2xl font-serif font-bold text-dark-text mb-4">Create Your Menu</h3>
      <p className="text-medium-text mb-6">
        Enter your menu text below. The book will automatically paginate the content. For best results, separate menu items with a new line.
      </p>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your menu here..."
        className="form-input min-h-[200px] text-base mb-6"
        rows={10}
      />
      <div className="flex justify-end">
        <button onClick={handleSubmit} className="primary-button">
          Generate Braille Menu
        </button>
      </div>
    </div>
  );
};

export default MenuInput;
