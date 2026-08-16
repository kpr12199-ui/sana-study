import { SiteData } from '../types';
import { initialSiteData } from '../data/initialData';

const STORAGE_KEY = 'pei_jung_student_portfolio_data_v1';

export function getSiteData(): SiteData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First time loading - persist initial data and return it
      saveSiteData(initialSiteData);
      return initialSiteData;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.profile || !parsed.projects) {
      return initialSiteData;
    }
    return parsed;
  } catch (err) {
    console.error('Error reading localStorage site data:', err);
    return initialSiteData;
  }
}

export function saveSiteData(data: SiteData): boolean {
  try {
    const dataToSave: SiteData = {
      ...data,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    // Dispatch custom event to notify listeners in other components
    window.dispatchEvent(new CustomEvent('siteDataUpdated', { detail: dataToSave }));
    return true;
  } catch (err) {
    console.error('Error saving site data to localStorage:', err);
    return false;
  }
}

export function resetToDefaultData(): SiteData {
  saveSiteData(initialSiteData);
  return initialSiteData;
}

export function exportSiteDataJson(): string {
  const data = getSiteData();
  return JSON.stringify(data, null, 2);
}

export function importSiteDataJson(jsonString: string): { success: boolean; data?: SiteData; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed.profile || !parsed.projects || !parsed.timeline || !parsed.skills) {
      return { success: false, error: '匯入的資料格式不符，缺少必要的網站欄位' };
    }
    saveSiteData(parsed);
    return { success: true, data: parsed };
  } catch (err) {
    return { success: false, error: 'JSON 解析失敗，請確認檔案格式是否正確' };
  }
}
