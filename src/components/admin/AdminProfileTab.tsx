import React, { useState } from 'react';
import { Upload, Plus, X, Check, AlertCircle, Sparkles, User, Image as ImageIcon } from 'lucide-react';
import { SiteProfile } from '../../types';
import { compressImage } from '../../utils/imageCompressor';

interface AdminProfileTabProps {
  profile: SiteProfile;
  onSave: (updatedProfile: SiteProfile) => void;
}

export const AdminProfileTab: React.FC<AdminProfileTabProps> = ({ profile, onSave }) => {
  const [formData, setFormData] = useState<SiteProfile>({ ...profile });
  const [newInterest, setNewInterest] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [imageError, setImageError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    setImageError('');

    const result = await compressImage(file, 1200, 400, 0.85);
    setIsCompressing(false);

    if (result.success && result.dataUrl) {
      setFormData((prev) => ({ ...prev, avatarUrl: result.dataUrl! }));
    } else {
      setImageError(result.error || '圖片處理失敗，請重試');
    }
  };

  const handleAddInterest = () => {
    if (!newInterest.trim()) return;
    if (!formData.interests.includes(newInterest.trim())) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()],
      }));
    }
    setNewInterest('');
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interestToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {/* Toast Notification */}
      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2 animate-in fade-in">
          <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>基本資料已成功儲存！重新整理後資料依然存在。</span>
        </div>
      )}

      {/* Avatar & Basic Info Header Card */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
          <User className="w-4 h-4 text-sky-600" />
          個人基本資料
        </h3>

        {/* Photo Upload & Preview */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-3 border-sky-200 bg-slate-100 shadow-sm">
              <img
                src={formData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                alt="大頭貼預覽"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            {isCompressing && (
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white text-2xs font-semibold">
                壓縮中...
              </div>
            )}
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <p className="text-sm font-semibold text-slate-700">個人照片上傳</p>
            <p className="text-xs text-slate-400">
              支援自動瀏覽器端圖片壓縮（最大寬度 1200px、轉換為 WebP 且保持小於 400KB）
            </p>
            <div className="flex flex-wrap gap-2 pt-1 justify-center sm:justify-start">
              <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-sky-100 text-sky-800 hover:bg-sky-200 cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                選擇新照片
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            </div>
            {imageError && (
              <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {imageError}
              </p>
            )}
          </div>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">姓名</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">英文姓名 (選填)</label>
            <input
              type="text"
              value={formData.englishName}
              onChange={(e) => setFormData({ ...formData, englishName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">就讀學校</label>
            <input
              type="text"
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">年級</label>
            <input
              type="text"
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">一句自我介紹 / 座右銘</label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Interests Badges Manager */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">我的興趣標籤</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.interests.map((interest, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200"
              >
                {interest}
                <button
                  type="button"
                  onClick={() => handleRemoveInterest(interest)}
                  className="p-0.5 rounded-full hover:bg-sky-200 text-sky-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="新增興趣標籤（例如：登山、吉他、露營）"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddInterest();
                }
              }}
              className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
            />
            <button
              type="button"
              onClick={handleAddInterest}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              新增標籤
            </button>
          </div>
        </div>
      </div>

      {/* About Me Section Descriptions */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Sparkles className="w-4 h-4 text-pink-600" />
          「關於我」詳細內容設定
        </h3>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">完整自我介紹</label>
          <textarea
            rows={4}
            value={formData.aboutIntro}
            onChange={(e) => setFormData({ ...formData, aboutIntro: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500 leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">學習方向與理念</label>
          <textarea
            rows={3}
            value={formData.learningFocus}
            onChange={(e) => setFormData({ ...formData, learningFocus: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500 leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">目前正在學習的內容</label>
          <textarea
            rows={3}
            value={formData.currentLearning}
            onChange={(e) => setFormData({ ...formData, currentLearning: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500 leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">未來想挑戰的事情</label>
          <textarea
            rows={3}
            value={formData.futureGoals}
            onChange={(e) => setFormData({ ...formData, futureGoals: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500 leading-relaxed"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-8 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          儲存基本資料
        </button>
      </div>
    </form>
  );
};
