/**
 * Google Drive Video URL Parser and Embed helper
 */

export interface DriveVideoParseResult {
  isValid: boolean;
  fileId?: string;
  embedUrl?: string;
  errorMessage?: string;
}

export function parseGoogleDriveVideoUrl(rawUrl: string): DriveVideoParseResult {
  if (!rawUrl || !rawUrl.trim()) {
    return { isValid: false, errorMessage: '請輸入 Google Drive 影片網址' };
  }

  const url = rawUrl.trim();

  // Pattern 1: https://drive.google.com/file/d/FILE_ID/view... or preview
  const fileDMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i);
  if (fileDMatch && fileDMatch[1]) {
    const fileId = fileDMatch[1];
    return {
      isValid: true,
      fileId,
      embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
    };
  }

  // Pattern 2: https://drive.google.com/open?id=FILE_ID or uc?id=FILE_ID
  const idParamMatch = url.match(/drive\.google\.com\/(?:open|uc|file)\?(?:.*&)?id=([a-zA-Z0-9_-]+)/i);
  if (idParamMatch && idParamMatch[1]) {
    const fileId = idParamMatch[1];
    return {
      isValid: true,
      fileId,
      embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
    };
  }

  // Pattern 3: Direct File ID (if user just pasted ID of ~25-45 chars)
  if (/^[a-zA-Z0-9_-]{25,45}$/.test(url)) {
    return {
      isValid: true,
      fileId: url,
      embedUrl: `https://drive.google.com/file/d/${url}/preview`,
    };
  }

  return {
    isValid: false,
    errorMessage: '無法辨識 Google Drive 影片網址，請確認分享連結是否正確（例如：https://drive.google.com/file/d/你的檔案ID/view）',
  };
}
