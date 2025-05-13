import React, { useState } from 'react';

function ImageUploader({ onImageSelected }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      onImageSelected(reader.result); // Base64送信
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
      />
      {preview && <img src={preview} alt="Preview" style={{ maxWidth: '100%' }} />}
    </div>
  );
}

export default ImageUploader;
