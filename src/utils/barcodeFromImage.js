import { BrowserMultiFormatReader } from '@zxing/browser';

export async function readBarcodeFromImage(base64Image) {
  const reader = new BrowserMultiFormatReader();

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64Image;

    img.onload = async () => {
      try {
        const result = await reader.decodeFromImageElement(img);
        resolve(result.getText());
      } catch (err) {
        resolve(null); // 読み取れない場合は null
      }
    };

    img.onerror = () => {
      reject(new Error('画像の読み込みに失敗しました'));
    };
  });
}
