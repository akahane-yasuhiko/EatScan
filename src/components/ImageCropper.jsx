import React, { useRef, useState } from 'react';
import { Rnd } from 'react-rnd';

function ImageCropper({ imageSrc, onCrop }) {
  const imageRef = useRef(null);
  const [rect, setRect] = useState({
    x: 50,
    y: 50,
    width: 200,
    height: 100,
  });

  const handleCrop = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    // 実際の画像サイズと画面表示サイズの倍率補正
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    canvas.width = rect.width * scaleX;
    canvas.height = rect.height * scaleY;

    ctx.drawImage(
      img,
      rect.x * scaleX,
      rect.y * scaleY,
      rect.width * scaleX,
      rect.height * scaleY,
      0,
      0,
      rect.width * scaleX,
      rect.height * scaleY
    );

    const croppedBase64 = canvas.toDataURL();
    onCrop(croppedBase64);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img
        ref={imageRef}
        src={imageSrc}
        alt="Upload"
        style={{ maxWidth: '100%' }}
      />

      <Rnd
        size={{ width: rect.width, height: rect.height }}
        position={{ x: rect.x, y: rect.y }}
        onDragStop={(e, d) => setRect(prev => ({ ...prev, x: d.x, y: d.y }))}
        onResizeStop={(e, direction, ref, delta, position) => {
          setRect({
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
            x: position.x,
            y: position.y,
          });
        }}
        style={{
          border: '2px solid red',
          position: 'absolute',
          background: 'rgba(255,0,0,0.1)',
        }}
      />

      <button onClick={handleCrop} style={{ marginTop: '10px' }}>
        この範囲でOCR
      </button>
    </div>
  );
}

export default ImageCropper;
