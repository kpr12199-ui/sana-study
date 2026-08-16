/**
 * Browser-side Image Compression utility
 * Resizes image to max width/height 1200px, converts to WebP/JPEG,
 * and ensures file size is under ~400KB.
 */

export interface CompressionResult {
  success: boolean;
  dataUrl?: string;
  sizeKb?: number;
  error?: string;
}

export async function compressImage(
  file: File,
  maxDimension = 1200,
  maxSizeKb = 450,
  quality = 0.85
): Promise<CompressionResult> {
  return new Promise((resolve) => {
    // Basic validation
    if (!file.type.startsWith('image/')) {
      resolve({ success: false, error: '請選擇有效的圖片檔案（PNG, JPG, WebP 等）' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        try {
          let { width, height } = img;

          // Maintain aspect ratio while scaling down
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            resolve({ success: false, error: '瀏覽器無法建立影像處理環境' });
            return;
          }

          // Smooth rendering
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Try WebP first, fallback to JPEG
          let dataUrl = canvas.toDataURL('image/webp', quality);
          if (!dataUrl.startsWith('data:image/webp')) {
            dataUrl = canvas.toDataURL('image/jpeg', quality);
          }

          // Calculate approximate size in KB
          const head = 'data:image/webp;base64,';
          const base64Len = dataUrl.length - head.length;
          let sizeKb = Math.round((base64Len * 3) / 4 / 1024);

          // If still slightly over max size, re-compress with lower quality
          if (sizeKb > maxSizeKb && quality > 0.5) {
            dataUrl = canvas.toDataURL('image/jpeg', 0.65);
            const newBase64Len = dataUrl.length - 'data:image/jpeg;base64,'.length;
            sizeKb = Math.round((newBase64Len * 3) / 4 / 1024);
          }

          if (sizeKb > maxSizeKb) {
            resolve({
              success: false,
              error: `圖片檔案過大 (${sizeKb}KB)，請選擇解析度較小或小於 ${maxSizeKb}KB 的圖片`,
            });
            return;
          }

          resolve({
            success: true,
            dataUrl,
            sizeKb,
          });
        } catch (err) {
          resolve({
            success: false,
            error: '圖片壓縮處理失敗，請嘗試其他圖片',
          });
        }
      };

      img.onerror = () => {
        resolve({ success: false, error: '無法讀取該圖片內容' });
      };

      img.src = event.target?.result as string;
    };

    reader.onerror = () => {
      resolve({ success: false, error: '讀取圖片檔案時發生錯誤' });
    };

    reader.readAsDataURL(file);
  });
}
