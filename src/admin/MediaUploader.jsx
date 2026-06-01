// 媒体上传器
import { useState, useCallback } from 'react';
import { formatFileSize, validateImageFile, validateVideoFile } from '../utils/fileHelpers';
import './Admin.css';

function MediaUploader({ type = 'image', onUpload }) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter((file) => {
      if (type === 'image') return validateImageFile(file);
      if (type === 'video') return validateVideoFile(file);
      return true;
    });
    setFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="media-uploader">
      <div
        className={`uploader-dropzone ${dragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <p>拖拽文件到此处，或</p>
        <label className="uploader-button">
          选择文件
          <input
            type="file"
            multiple
            accept={type === 'image' ? 'image/*' : 'video/*'}
            onChange={handleFileChange}
          />
        </label>
      </div>

      {files.length > 0 && (
        <div className="uploader-files">
          <h4>已选择 {files.length} 个文件</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index} className="uploader-file-item">
                <span>{file.name}</span>
                <span className="uploader-file-size">{formatFileSize(file.size)}</span>
                <button
                  type="button"
                  className="uploader-file-remove"
                  onClick={() => removeFile(index)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="btn-primary"
            onClick={() => onUpload && onUpload(files)}
          >
            上传
          </button>
        </div>
      )}
    </div>
  );
}

export default MediaUploader;
