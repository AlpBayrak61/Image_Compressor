// App.js
import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import './App.css';

function App() {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [compressionProgress, setCompressionProgress] = useState(0);

  const handleImageUpload = (e) => {
    setOriginalImage(e.target.files[0]);
    setCompressedImage(null);
  };

  const handleImageCompression = async () => {
    if (!originalImage) {
      alert('Please upload an image first.');
      return;
    }

    const options = {
      maxSizeMB: 1, // Maximum size in MB
      maxWidthOrHeight: 1024, // Resize dimensions
      onProgress: (progress) => setCompressionProgress(progress),
    };

    try {
      const compressed = await imageCompression(originalImage, options);
      setCompressedImage(compressed);
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  };

  const downloadCompressedImage = () => {
    if (compressedImage) {
      const url = URL.createObjectURL(compressedImage);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'compressed-image.jpg';
      link.click();
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Image Compressor</h1>
        <p className="subtitle">Reduce your image size without compromising quality</p>
        <div className="upload-section">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
          <button className="action-button" onClick={handleImageCompression}>
            Compress Image
          </button>
        </div>
        {compressionProgress > 0 && (
          <p className="progress">Compression Progress: {compressionProgress}%</p>
        )}
        {compressedImage && (
          <div className="result">
            <h3>Compressed Image:</h3>
            <img
              src={URL.createObjectURL(compressedImage)}
              alt="Compressed"
              className="compressed-image"
            />
            <button className="action-button" onClick={downloadCompressedImage}>
              Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;