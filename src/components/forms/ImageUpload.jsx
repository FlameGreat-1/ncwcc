import { useRef } from 'react';
import useImageUpload from '../../hooks/useImageUpload.js';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import Button from '../common/Button.jsx';
import { formatFileSize } from '../../utils/helpers.js';

const ImageUpload = ({
  maxFiles = 5,
  onFilesChange,
  onUploadComplete,
  className = '',
  label = 'Upload Images',
  description = 'Upload photos for a more accurate estimate',
  showPreviews = true,
  autoUpload = false,
  uploadUrl = '/api/upload'
}) => {
  const fileInputRef = useRef(null);
  
  const {
    files,
    previews,
    uploading,
    errors,
    uploadProgress,
    addFiles,
    removeFile,
    clearFiles,
    uploadFiles,
    hasFiles,
    canAddMore
  } = useImageUpload(maxFiles);

  const handleFileSelect = async (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles.length > 0) {
      const success = await addFiles(selectedFiles);
      if (success) {
        onFilesChange?.(files);
        if (autoUpload) {
          handleUpload();
        }
      }
    }
    event.target.value = '';
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const success = await addFiles(droppedFiles);
      if (success) {
        onFilesChange?.(files);
        if (autoUpload) {
          handleUpload();
        }
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleUpload = async () => {
    if (!hasFiles) return;
    
    const result = await uploadFiles(uploadUrl);
    if (result.success) {
      onUploadComplete?.(result.data);
    }
  };

  const handleRemoveFile = (index) => {
    removeFile(index);
    onFilesChange?.(files.filter((_, i) => i !== index));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {label && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
      )}

      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          canAddMore 
            ? 'border-gray-300 hover:border-[#00FF66] cursor-pointer' 
            : 'border-gray-200 cursor-not-allowed opacity-50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={canAddMore ? openFileDialog : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf"
          onChange={handleFileSelect}
          className="hidden"
          disabled={!canAddMore}
        />

        <div className="space-y-2">
          <div className="text-4xl">📸</div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {canAddMore ? 'Click to upload or drag and drop' : `Maximum ${maxFiles} files reached`}
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, PDF up to 5MB each
            </p>
          </div>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      )}

      {showPreviews && previews.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900">
            Selected Files ({previews.length}/{maxFiles})
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {previews.map((preview, index) => (
              <div key={preview.id} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {preview.type.startsWith('image/') ? (
                    <img
                      src={preview.preview}
                      alt={preview.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl mb-1">📄</div>
                        <p className="text-xs text-gray-600 truncate px-2">
                          {preview.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
                
                <div className="mt-1">
                  <p className="text-xs text-gray-600 truncate">
                    {preview.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(preview.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasFiles && (
        <div className="flex gap-2">
          {!autoUpload && (
            <Button
              onClick={handleUpload}
              disabled={uploading}
              loading={uploading}
              variant="primary"
              size="sm"
            >
              Upload Files
            </Button>
          )}
          
          <Button
            onClick={clearFiles}
            disabled={uploading}
            variant="outline"
            size="sm"
          >
            Clear All
          </Button>
        </div>
      )}

      {uploading && uploadProgress.overall && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <LoadingSpinner size="sm" />
            <span className="text-sm text-gray-600">
              Uploading... {uploadProgress.overall}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#00FF66] h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress.overall}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
