import React, { useState } from 'react';
import {
  User,
  FolderKanban,
  Milestone,
  Award,
  Database,
  ArrowLeft,
  Download,
  Upload,
  RefreshCw,
  LogOut,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { SiteData, SiteProfile, ProjectItem, TimelineItem, SkillCategory } from '../../types';
import { AdminProfileTab } from './AdminProfileTab';
import { AdminProjectsTab } from './AdminProjectsTab';
import { AdminTimelineTab } from './AdminTimelineTab';
import { AdminSkillsTab } from './AdminSkillsTab';
import {
  saveSiteData,
  exportSiteDataJson,
  importSiteDataJson,
  resetToDefaultData,
} from '../../utils/storage';

interface AdminDashboardProps {
  data: SiteData;
  onUpdateData: (newData: SiteData) => void;
  onBackToHome: () => void;
  userEmail: string;
  onLogout: () => void;
}

type TabType = 'profile' | 'projects' | 'timeline' | 'skills' | 'backup';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  data,
  onUpdateData,
  onBackToHome,
  userEmail,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [backupMessage, setBackupMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [jsonInput, setJsonInput] = useState('');

  const handleSaveProfile = (updatedProfile: SiteProfile) => {
    const newData: SiteData = { ...data, profile: updatedProfile };
    onUpdateData(newData);
    saveSiteData(newData);
  };

  const handleSaveProjects = (updatedProjects: ProjectItem[]) => {
    const newData: SiteData = { ...data, projects: updatedProjects };
    onUpdateData(newData);
    saveSiteData(newData);
  };

  const handleSaveTimeline = (updatedTimeline: TimelineItem[]) => {
    const newData: SiteData = { ...data, timeline: updatedTimeline };
    onUpdateData(newData);
    saveSiteData(newData);
  };

  const handleSaveSkills = (updatedSkills: SkillCategory[]) => {
    const newData: SiteData = { ...data, skills: updatedSkills };
    onUpdateData(newData);
    saveSiteData(newData);
  };

  const handleExportJson = () => {
    const jsonStr = exportSiteDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setBackupMessage({ type: 'success', text: '備份 JSON 檔案已下載至您的電腦！' });
  };

  const handleImportJson = () => {
    if (!jsonInput.trim()) return;
    const result = importSiteDataJson(jsonInput);
    if (result.success && result.data) {
      onUpdateData(result.data);
      setBackupMessage({ type: 'success', text: '網站資料已成功從 JSON 匯入並儲存！' });
      setJsonInput('');
    } else {
      setBackupMessage({ type: 'error', text: result.error || '匯入失敗' });
    }
  };

  const handleResetData = () => {
    if (window.confirm('確定要將所有資料還原為初始範例設定嗎？此操作將覆蓋現有內容。')) {
      const defaultData = resetToDefaultData();
      onUpdateData(defaultData);
      setBackupMessage({ type: 'success', text: '已成功還原為初始範例資料！' });
    }
  };

  const navTabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'profile', label: '基本資料', icon: <User className="w-4 h-4" /> },
    { id: 'projects', label: '作品管理', icon: <FolderKanban className="w-4 h-4" /> },
    { id: 'timeline', label: '學習歷程', icon: <Milestone className="w-4 h-4" /> },
    { id: 'skills', label: '多元技能', icon: <Award className="w-4 h-4" /> },
    { id: 'backup', label: '備份與還原', icon: <Database className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Admin Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            返回公開首頁
          </button>
          <div className="h-4 w-px bg-slate-200" />
          <h1 className="text-sm sm:text-base font-extrabold text-slate-800">
            學習歷程管理後台
          </h1>
        </div>

        {/* Current Admin Account & Logout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-bold text-slate-700">{data.profile.name}</span>
            <span className="text-2xs text-slate-400 font-mono">{userEmail}</span>
          </div>
          <button
            type="button"
            onClick={onLogout}
            title="登出後台"
            className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Area */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-56 shrink-0 space-y-1">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setBackupMessage(null);
              }}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-sky-500 to-pink-500 text-white shadow-sm scale-[1.02]'
                  : 'bg-white text-slate-600 hover:bg-sky-50/50 hover:text-sky-700 border border-slate-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Tab Content Area */}
        <main className="flex-1 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs min-h-[500px]">
          {activeTab === 'profile' && (
            <AdminProfileTab profile={data.profile} onSave={handleSaveProfile} />
          )}

          {activeTab === 'projects' && (
            <AdminProjectsTab
              projects={data.projects}
              onSaveProjects={handleSaveProjects}
            />
          )}

          {activeTab === 'timeline' && (
            <AdminTimelineTab
              timeline={data.timeline}
              onSaveTimeline={handleSaveTimeline}
            />
          )}

          {activeTab === 'skills' && (
            <AdminSkillsTab skills={data.skills} onSaveSkills={handleSaveSkills} />
          )}

          {activeTab === 'backup' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h3 className="text-lg font-bold text-slate-800">資料備份與還原</h3>
                <p className="text-xs text-slate-500">
                  可將網站所有內容匯出成 JSON 備份檔，或貼上備份資料進行還原
                </p>
              </div>

              {backupMessage && (
                <div
                  className={`p-4 rounded-2xl text-xs flex items-center gap-2 ${
                    backupMessage.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {backupMessage.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span>{backupMessage.text}</span>
                </div>
              )}

              {/* Download backup button */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Download className="w-4 h-4 text-sky-600" />
                  匯出備份檔案 (JSON)
                </h4>
                <p className="text-xs text-slate-500">
                  下載包含個人基本資料、作品內容、時間軸與技能的完整 JSON 資料檔。
                </p>
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs transition-colors"
                >
                  下載 JSON 備份檔
                </button>
              </div>

              {/* Import backup */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-pink-600" />
                  匯入備份資料 (JSON)
                </h4>
                <textarea
                  rows={4}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder="在此處貼上先前備份的 JSON 內容..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={handleImportJson}
                  className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-xs font-bold text-white shadow-2xs transition-colors"
                >
                  匯入並套用資料
                </button>
              </div>

              {/* Reset to initial data */}
              <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
                <h4 className="text-sm font-bold text-rose-800 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-rose-600" />
                  還原為初始示範資料
                </h4>
                <p className="text-xs text-rose-700">
                  如需清空自訂修改並回復至系統預設範例，可點擊下方按鈕。
                </p>
                <button
                  type="button"
                  onClick={handleResetData}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white shadow-2xs transition-colors"
                >
                  還原預設資料
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
