import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Upload, X, AlertCircle, Film, Image as ImageIcon, Check } from 'lucide-react';
import { ProjectItem } from '../../types';
import { compressImage } from '../../utils/imageCompressor';
import { parseGoogleDriveVideoUrl } from '../../utils/driveVideo';

interface AdminProjectsTabProps {
  projects: ProjectItem[];
  onSaveProjects: (updatedProjects: ProjectItem[]) => void;
}

export const AdminProjectsTab: React.FC<AdminProjectsTabProps> = ({
  projects,
  onSaveProjects,
}) => {
  const [projectList, setProjectList] = useState<ProjectItem[]>([...projects]);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleOpenNew = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: '',
      date: new Date().toISOString().slice(0, 7),
      category: '自主學習與探索',
      summary: '',
      content: '',
      challenge: '',
      solution: '',
      reflection: '',
      images: [],
      videoUrl: '',
      order: projectList.length + 1,
    };
    setEditingProject(newProj);
    setIsNew(true);
    setUploadError('');
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingProject({ ...project });
    setIsNew(false);
    setUploadError('');
  };

  const handleDelete = (id: string) => {
    const updated = projectList.filter((p) => p.id !== id);
    setProjectList(updated);
    onSaveProjects(updated);
    setDeleteConfirmId(null);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= projectList.length) return;

    const updated = [...projectList];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;

    // re-assign order
    const reordered = updated.map((item, idx) => ({ ...item, order: idx + 1 }));
    setProjectList(reordered);
    onSaveProjects(reordered);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingProject) return;
    if (editingProject.images.length >= 3) {
      setUploadError('每個作品最多上傳 3 張照片');
      return;
    }

    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    setUploadError('');

    const result = await compressImage(file, 1200, 400, 0.85);
    setIsCompressing(false);

    if (result.success && result.dataUrl) {
      setEditingProject({
        ...editingProject,
        images: [...editingProject.images, result.dataUrl],
      });
    } else {
      setUploadError(result.error || '圖片上傳壓縮失敗');
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      images: editingProject.images.filter((_, idx) => idx !== indexToRemove),
    });
  };

  const handleSaveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    let updatedList: ProjectItem[];
    if (isNew) {
      updatedList = [...projectList, editingProject];
    } else {
      updatedList = projectList.map((p) =>
        p.id === editingProject.id ? editingProject : p
      );
    }

    setProjectList(updatedList);
    onSaveProjects(updatedList);
    setEditingProject(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">作品專案管理</h3>
          <p className="text-xs text-slate-500">
            可新增、編輯、刪除學習作品，並支援上傳圖片與 Google Drive 影片
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenNew}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          新增作品專案
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>作品清單已更新並儲存！</span>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-3">
        {projectList.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400 text-xs">
            目前尚未建立任何作品，請點擊上方按鈕新增！
          </div>
        ) : (
          projectList.map((project, idx) => (
            <div
              key={project.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div className="w-16 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                  <img
                    src={
                      project.images[0] ||
                      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80'
                    }
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-2xs font-semibold bg-sky-100 text-sky-800">
                      {project.category}
                    </span>
                    <span className="text-2xs text-slate-400">{project.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 truncate mt-0.5">
                    {project.title || '(未命名專案)'}
                  </h4>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                {/* Reorder Buttons */}
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, 'up')}
                  aria-label="向上移動"
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={idx === projectList.length - 1}
                  onClick={() => handleMove(idx, 'down')}
                  aria-label="向下移動"
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                {/* Edit Button */}
                <button
                  type="button"
                  onClick={() => handleOpenEdit(project)}
                  className="p-2 rounded-xl text-sky-600 hover:bg-sky-50 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(project.id)}
                  className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-2xs">
          <div className="max-w-sm w-full bg-white rounded-3xl p-6 shadow-xl border border-slate-100 space-y-4">
            <h4 className="text-base font-bold text-slate-800">
              確定要刪除這個作品嗎？
            </h4>
            <p className="text-xs text-slate-500">
              刪除後此作品將從網站上移除，無法復原。
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
              >
                取消
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700"
              >
                確認刪除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Create Project Full Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 my-8 max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <h3 className="text-base font-bold text-slate-800">
                {isNew ? '新增作品專案' : '編輯作品專案'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProjectForm} className="overflow-y-auto p-6 space-y-5">
              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">作品名稱</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    placeholder="例如：山林生態辨識小工具"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">作品分類</label>
                  <input
                    type="text"
                    required
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    placeholder="例如：AI 與資訊科技"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">完成日期 (年月)</label>
                <input
                  type="text"
                  value={editingProject.date}
                  onChange={(e) => setEditingProject({ ...editingProject, date: e.target.value })}
                  placeholder="例如：2026-03 或 2025 年秋季"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Summary */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">簡短介紹 (卡片摘要)</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.summary}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  placeholder="一句話或兩句話說明這個作品的核心..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Full Content */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">完整作品內容與探究過程</label>
                <textarea
                  rows={4}
                  required
                  value={editingProject.content}
                  onChange={(e) => setEditingProject({ ...editingProject, content: e.target.value })}
                  placeholder="詳細描述專案背景、動機、實作步驟與功能..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">製作過程遇到的問題 (Challenge)</label>
                  <textarea
                    rows={3}
                    value={editingProject.challenge}
                    onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                    placeholder="遇到哪些挫折或挑戰？"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">我是如何解決問題 (Solution)</label>
                  <textarea
                    rows={3}
                    value={editingProject.solution}
                    onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                    placeholder="透過什麼方式或實驗克服困難？"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Reflection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">學習心得與反思 (Reflection)</label>
                <textarea
                  rows={3}
                  value={editingProject.reflection}
                  onChange={(e) => setEditingProject({ ...editingProject, reflection: e.target.value })}
                  placeholder="這次學習帶給你的啟發與收穫..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Image Upload (Max 3) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-sky-600" />
                    作品照片 (最多 3 張，自動壓縮)
                  </span>
                  <span className="text-2xs text-slate-400">
                    已上傳 {editingProject.images.length} / 3 張
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {editingProject.images.map((img, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 group">
                      <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(i)}
                        className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full hover:bg-rose-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {editingProject.images.length < 3 && (
                    <label className="w-20 h-20 rounded-xl border-2 border-dashed border-sky-300 hover:bg-sky-50/50 flex flex-col items-center justify-center text-sky-600 cursor-pointer transition-colors">
                      <Upload className="w-5 h-5 mb-1" />
                      <span className="text-2xs font-bold">上傳照片</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {isCompressing && <p className="text-2xs text-sky-600">正在進行瀏覽器端圖片壓縮...</p>}
                {uploadError && <p className="text-2xs text-rose-600">{uploadError}</p>}
              </div>

              {/* Google Drive Video URL */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Film className="w-4 h-4 text-pink-600" />
                  Google Drive 影片連結 (選填)
                </span>
                <input
                  type="url"
                  value={editingProject.videoUrl}
                  onChange={(e) => setEditingProject({ ...editingProject, videoUrl: e.target.value })}
                  placeholder="https://drive.google.com/file/d/你的檔案ID/view"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                />
                {editingProject.videoUrl && (
                  <div className="text-2xs">
                    {parseGoogleDriveVideoUrl(editingProject.videoUrl).isValid ? (
                      <p className="text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> 成功辨識 Google Drive 影片 ID！
                      </p>
                    ) : (
                      <p className="text-amber-700 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> 網址格式需為 Google Drive 分享連結
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Form Footer */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-xs transition-colors cursor-pointer"
                >
                  {isNew ? '新增並儲存' : '儲存變更'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
