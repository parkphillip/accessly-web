import React, { useRef } from 'react';
import { FormData } from '@/types/FormData';
import { Upload, Type, X } from 'lucide-react';

interface MenuDetailsStepProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string | File[] | File) => void;
  errors?: string[];
}

const MenuDetailsStep: React.FC<MenuDetailsStepProps> = ({ 
  formData, 
  onInputChange,
  errors = []
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasError = (fieldErrors: string[], fieldName: string) => {
    return fieldErrors.some(error => error.toLowerCase().includes(fieldName.toLowerCase()));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onInputChange('menuImages', [...formData.menuImages, ...files]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length > 0) {
      onInputChange('menuImages', [...formData.menuImages, ...files]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = formData.menuImages.filter((_, i) => i !== index);
    onInputChange('menuImages', newImages);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <label htmlFor="menuType" className="form-label">
          What type of menu do you need?
        </label>
        <select
          id="menuType"
          value={formData.menuType}
          onChange={(e) => onInputChange('menuType', e.target.value)}
          className="form-input"
        >
          <option value="full-menu">Complete Menu (most popular)</option>
          <option value="dinner-only">Dinner Menu Only</option>
          <option value="lunch-only">Lunch Menu Only</option>
          <option value="drinks-only">Drinks & Beverages</option>
          <option value="specials">Daily Specials Board</option>
        </select>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <button
          type="button"
          onClick={() => onInputChange('menuInputType', 'image')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border font-semibold text-base ${
            formData.menuInputType === 'image'
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Upload size={20} />
          <span>Image Upload</span>
        </button>
        <button
          type="button"
          onClick={() => onInputChange('menuInputType', 'text')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border font-semibold text-base ${
            formData.menuInputType === 'text'
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Type size={20} />
          <span>Enter Text Manually</span>
        </button>
      </div>

      {formData.menuInputType === 'image' ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center transition-colors w-full min-h-[260px]
            ${formData.menuImages.length > 0 ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'}
            ${hasError(errors, 'menu') ? 'border-red-500 bg-red-50' : ''}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 mb-6"
          >
            <Upload size={18} />
            <span>Upload Image</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          {formData.menuImages.length > 0 ? (
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-wrap gap-4 justify-center mb-2 w-full">
                {formData.menuImages.map((file, idx) => {
                  const url = URL.createObjectURL(file);
                  return (
                    <div key={idx} className="relative w-24 h-24 group">
                      <img
                        src={url}
                        alt={`Menu preview ${idx + 1}`}
                        className="object-cover w-full h-full rounded shadow"
                      />
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); handleRemoveImage(idx); }}
                        className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 text-gray-700 hover:bg-red-500 hover:text-white transition-opacity opacity-80 group-hover:opacity-100"
                        aria-label="Remove image"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
              <p className="text-primary font-medium mt-2">{formData.menuImages.length} image{formData.menuImages.length > 1 ? 's' : ''} uploaded</p>
            </div>
          ) : (
            <div className="space-y-2 flex flex-col items-center justify-center w-full">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="text-gray-600">Please upload a clear image of your menu or take a photo</p>
              <p className="text-sm text-gray-500">Drag and drop or use the button above</p>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full">
          <label htmlFor="menuContent" className="form-label">
            Type your menu content here
          </label>
          <textarea
            id="menuContent"
            required
            value={formData.menuContent}
            onChange={(e) => onInputChange('menuContent', e.target.value)}
            className={`form-input min-h-[220px] resize-y w-full ${hasError(errors, 'menu') ? 'border-red-500 bg-red-50' : ''}`}
            placeholder="Enter your menu items, prices, and descriptions..."
            style={{ minHeight: 220 }}
          />
        </div>
      )}
      <p className="text-xs text-medium-text mt-2">
        Don't worry about formatting. We'll handle the conversion to make it clear and readable in braille.
      </p>
    </div>
  );
};

export default MenuDetailsStep;
