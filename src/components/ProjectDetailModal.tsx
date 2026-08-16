import React, { useState } from 'react';
import { X, Calendar, Tag, AlertCircle, Lightbulb, HeartHandshake, Film, Image as ImageIcon } from 'lucide-react';
import { ProjectItem } from '../types';
import { parseGoogleDriveVideoUrl } from '../utils/driveVideo';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!project) return null;

  const videoParse = project.videoUrl ? parseGoogleDriveVideoUrl(project.videoUrl) : null;
  const hasImages = project.images && project.images.length > 0;

  return (
    <div
      id="project-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="project-detail-modal-card"
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
              {project.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {project.date}
            </span>
          </div>
          <button
            id="modal-close-btn"
            type="button"
            onClick={onClose}
            aria-label="關閉"
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Main Title & Summary */}
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 mb-3">
              {project.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {project.summary}
            </p>
          </div>

          {/* Project Images Gallery */}
          {hasImages && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <ImageIcon className="w-4 h-4 text-sky-600" />
                作品照片展示
              </div>
              <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 aspect-video flex items-center justify-center">
                <img
                  src={project.images[activeImageIndex] || project.images[0]}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              {project.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {project.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        activeImageIndex === idx ? 'border-sky-500 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`預覽圖 ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Google Drive Video Player */}
          {project.videoUrl && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Film className="w-4 h-4 text-pink-600" />
                專案展示影片 (Google Drive)
              </div>
              {videoParse && videoParse.isValid && videoParse.embedUrl ? (
                <div className="relative w-full rounded-2xl overflow-hidden bg-black aspect-video shadow-xs border border-slate-200">
                  <iframe
                    src={videoParse.embedUrl}
                    title="Google Drive 專案展示影片"
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">無法辨識 Google Drive 影片網址</p>
                    <p className="mt-0.5 text-amber-700">請確認分享連結是否為公開可讀取之 Google Drive 檔案連結。</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Full Project Content */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              專案背景與詳細內容
            </h3>
            <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line bg-sky-50/40 p-5 rounded-2xl border border-sky-100">
              {project.content}
            </div>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Challenge */}
            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100/80 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                製作過程遇到的問題
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {project.challenge || '無特別遭遇之困難'}
              </p>
            </div>

            {/* Solution */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100/80 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <Lightbulb className="w-4 h-4 text-emerald-600" />
                我是如何解決問題
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {project.solution || '透過查詢資料與反覆實驗順利解決'}
              </p>
            </div>
          </div>

          {/* Reflection */}
          <div className="p-5 rounded-2xl bg-pink-50/60 border border-pink-100 space-y-2">
            <div className="flex items-center gap-2 text-pink-800 font-bold text-sm">
              <HeartHandshake className="w-4 h-4 text-pink-600" />
              學習心得與反思
            </div>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {project.reflection || '在專案過程中獲得寶貴的探究與實作經驗。'}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            關閉視窗
          </button>
        </div>
      </div>
    </div>
  );
};
