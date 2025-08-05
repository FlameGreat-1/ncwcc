import { useRef, useState, useEffect } from 'react';
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
  const [isDragOver, setIsDragOver] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);
  
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
    setIsDragOver(false);
    
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
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
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
    <div ref={componentRef} className={`space-y-6 animate-fade-in-up ${className}`}>
      {label && (
        <div className="animate-fade-in-up delay-300">
          <label className="block text-base font-black text-gray-900 mb-2">
            {label}
          </label>
          {description && (
            <p className="text-sm text-[#4B4B4B] font-medium">{description}</p>
          )}
        </div>
      )}

      <div className="relative group animate-fade-in-up delay-600">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
        <div
          className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-700 transform-gpu overflow-hidden ${
            canAddMore 
              ? `${isDragOver 
                  ? 'border-[#00FF66] bg-gradient-to-br from-[#00FF66]/10 via-white/90 to-[#00cc52]/10 scale-105 -translate-y-2' 
                  : 'border-white/40 bg-white/80 hover:border-[#00FF66]/50 hover:bg-gradient-to-br hover:from-[#00FF66]/5 hover:via-white/90 hover:to-[#00cc52]/5 hover:scale-105 hover:-translate-y-2'
                } backdrop-blur-xl cursor-pointer shadow-lg hover:shadow-2xl`
              : 'border-gray-200/50 bg-gray-100/50 backdrop-blur-lg cursor-not-allowed opacity-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={canAddMore ? openFileDialog : undefined}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/5 via-transparent to-[#00cc52]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-t-3xl"></div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={handleFileSelect}
            className="hidden"
            disabled={!canAddMore}
          />

          <div className="relative z-10 space-y-4">
            <div className={`text-6xl transition-transform duration-700 ${isDragOver ? 'animate-bounce scale-110' : 'group-hover:scale-110 group-hover:animate-pulse'}`}>
              📸
            </div>
            <div>
              <p className="text-base font-black text-gray-900 mb-2 group-hover:text-[#00FF66] transition-colors duration-500">
                {canAddMore ? 'Click to upload or drag and drop' : `Maximum ${maxFiles} files reached`}
              </p>
              <p className="text-sm text-[#666] font-semibold">
                PNG, JPG, PDF up to 5MB each
              </p>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl"></div>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="space-y-2 animate-fade-in-up delay-800">
          {errors.map((error, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-gradient-to-r from-red-50/80 via-white/90 to-red-50/80 backdrop-blur-lg border-2 border-red-200/50 rounded-2xl p-3">
                <p className="text-sm text-red-700 font-semibold flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  {error}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showPreviews && previews.length > 0 && (
        <div className="space-y-4 animate-fade-in-up delay-1000">
          <h4 className="text-base font-black text-gray-900">
            Selected Files ({previews.length}/{maxFiles})
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <div key={preview.id} className="relative group animate-fade-in-up" style={{ animationDelay: `${1200 + index * 100}ms` }}>
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] rounded-2xl blur opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
                <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:scale-105 transform-gpu border-2 border-white/40">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/5 via-transparent to-[#00cc52]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-t-2xl"></div>
                  
                  <div className="aspect-square bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-50/80">
                    {preview.type.startsWith('image/') ? (
                      <img
                        src={preview.preview}
                        alt={preview.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl mb-2 group-hover:animate-bounce">📄</div>
                          <p className="text-xs text-[#666] truncate px-2 font-semibold">
                            {preview.name}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-black hover:to-gray-800 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-black hover:scale-110 hover:-translate-y-1 hover:rotate-90 transition-all duration-700 shadow-lg hover:shadow-2xl transform-gpu group/remove overflow-hidden"
                  >
                    <span className="relative z-10">×</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/remove:opacity-100 transition-opacity duration-700 rounded-full"></div>
                  </button>
                  
                  <div className="p-3 relative z-10">
                    <p className="text-xs text-[#4B4B4B] truncate font-semibold mb-1">
                      {preview.name}
                    </p>
                    <p className="text-xs text-[#666] font-medium">
                      {formatFileSize(preview.size)}
                    </p>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-2xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

{hasFiles && (
        <div className="flex gap-3 animate-fade-in-up delay-1400">
          {!autoUpload && (
            <Button
              onClick={handleUpload}
              disabled={uploading}
              className="relative bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] hover:from-black hover:to-gray-800 text-black hover:text-white font-black px-3 py-2 rounded-full text-xs transition-all duration-700 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-2xl transform-gpu group/btn overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
            >
              <span className="relative z-10 flex items-center gap-1">
                {uploading ? (
                  <>
                    <LoadingSpinner size="xs" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <span className="text-sm group-hover/btn:animate-bounce">📤</span>
                    Upload Files
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 transform group-hover/btn:translate-x-full"></div>
            </Button>
          )}
          
          <Button
            onClick={clearFiles}
            disabled={uploading}
            className="relative bg-transparent border-2 border-red-400 text-red-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white hover:border-red-600 font-black px-3 py-2 rounded-full text-xs transition-all duration-700 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-2xl transform-gpu group/btn overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
          >
            <span className="relative z-10 flex items-center gap-1">
              <span className="text-sm group-hover/btn:animate-pulse">🗑️</span>
              Clear All
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-red-600/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 rounded-full"></div>
          </Button>
        </div>
      )}

      {uploading && uploadProgress.overall && (
        <div className="space-y-4 animate-fade-in-up delay-1600">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] rounded-3xl blur opacity-20"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border-2 border-white/40 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00FF66]/5 via-transparent to-[#00cc52]/5 rounded-3xl"></div>
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] rounded-t-3xl"></div>
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <LoadingSpinner size="sm" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-full blur opacity-30 animate-pulse"></div>
                  </div>
                  <div>
                    <span className="text-base font-black text-gray-900">
                      Uploading Files...
                    </span>
                    <p className="text-sm text-[#666] font-semibold">
                      {uploadProgress.overall}% Complete
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-gradient-to-r from-gray-200/80 via-gray-100/90 to-gray-200/80 backdrop-blur-lg rounded-full h-3 overflow-hidden shadow-inner">
                    <div
                      className="bg-gradient-to-r from-[#00FF66] via-[#00e65a] to-[#00cc52] h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                      style={{ width: `${uploadProgress.overall}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30 animate-pulse"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-full blur opacity-20 animate-pulse"></div>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#666] font-semibold">
                    {files.length} file{files.length !== 1 ? 's' : ''} uploading
                  </span>
                  <span className="text-[#00FF66] font-black">
                    {uploadProgress.overall}%
                  </span>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00FF66] to-[#00cc52] rounded-b-3xl"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

