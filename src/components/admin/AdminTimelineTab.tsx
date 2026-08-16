import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, X, Check, Milestone } from 'lucide-react';
import { TimelineItem } from '../../types';

interface AdminTimelineTabProps {
  timeline: TimelineItem[];
  onSaveTimeline: (updatedTimeline: TimelineItem[]) => void;
}

export const AdminTimelineTab: React.FC<AdminTimelineTabProps> = ({
  timeline,
  onSaveTimeline,
}) => {
  const [timelineList, setTimelineList] = useState<TimelineItem[]>([...timeline]);
  const [editingItem, setEditingItem] = useState<TimelineItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleOpenNew = () => {
    const newItem: TimelineItem = {
      id: `time-${Date.now()}`,
      year: `${new Date().getFullYear()}`,
      title: '',
      description: '',
      category: '自主學習',
      order: timelineList.length + 1,
    };
    setEditingItem(newItem);
    setIsNew(true);
  };

  const handleOpenEdit = (item: TimelineItem) => {
    setEditingItem({ ...item });
    setIsNew(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('確定要刪除這筆學習歷程紀錄嗎？')) {
      const updated = timelineList.filter((item) => item.id !== id);
      setTimelineList(updated);
      onSaveTimeline(updated);
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= timelineList.length) return;

    const updated = [...timelineList];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;

    const reordered = updated.map((item, idx) => ({ ...item, order: idx + 1 }));
    setTimelineList(reordered);
    onSaveTimeline(reordered);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    let updatedList: TimelineItem[];
    if (isNew) {
      updatedList = [...timelineList, editingItem];
    } else {
      updatedList = timelineList.map((item) =>
        item.id === editingItem.id ? editingItem : item
      );
    }

    setTimelineList(updatedList);
    onSaveTimeline(updatedList);
    setEditingItem(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">學習歷程時間軸管理</h3>
          <p className="text-xs text-slate-500">
            記錄各學習階段的重要事件、里程碑與未來展望
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenNew}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          新增歷程里程碑
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>時間軸資料已更新並儲存！</span>
        </div>
      )}

      {/* Timeline List */}
      <div className="space-y-3">
        {timelineList.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400 text-xs">
            目前尚未建立歷程里程碑，請點擊上方按鈕新增！
          </div>
        ) : (
          timelineList.map((item, idx) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
                    {item.year}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {item.category}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
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
                  disabled={idx === timelineList.length - 1}
                  onClick={() => handleMove(idx, 'down')}
                  aria-label="向下移動"
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-xl text-sky-600 hover:bg-sky-50"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-xl text-rose-600 hover:bg-rose-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit / Create Timeline Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-base font-bold text-slate-800">
                {isNew ? '新增歷程里程碑' : '編輯歷程里程碑'}
              </h4>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">年份 / 時期</label>
                  <input
                    type="text"
                    required
                    value={editingItem.year}
                    onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                    placeholder="例如：2026 或 未來"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">分類標籤</label>
                  <input
                    type="text"
                    required
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    placeholder="例如：自主探究"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">里程碑標題</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="例如：完成個人學習歷程數位作品集"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">詳細說明</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="描述此里程碑的具體成果、學習內容與體會..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-xs"
                >
                  儲存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
