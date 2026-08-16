import React, { useState } from 'react';
import { Plus, Trash2, X, Check, Award, Edit2 } from 'lucide-react';
import { SkillCategory } from '../../types';

interface AdminSkillsTabProps {
  skills: SkillCategory[];
  onSaveSkills: (updatedSkills: SkillCategory[]) => void;
}

export const AdminSkillsTab: React.FC<AdminSkillsTabProps> = ({
  skills,
  onSaveSkills,
}) => {
  const [categories, setCategories] = useState<SkillCategory[]>([...skills]);
  const [newCatName, setNewCatName] = useState('');
  const [newSkillInput, setNewSkillInput] = useState<{ [catId: string]: string }>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    const newCat: SkillCategory = {
      id: `cat-${Date.now()}`,
      name: newCatName.trim(),
      skills: [],
      order: categories.length + 1,
    };
    const updated = [...categories, newCat];
    setCategories(updated);
    onSaveSkills(updated);
    setNewCatName('');
    notifySuccess();
  };

  const handleDeleteCategory = (catId: string) => {
    if (window.confirm('確定要刪除整個技能分類嗎？')) {
      const updated = categories.filter((c) => c.id !== catId);
      setCategories(updated);
      onSaveSkills(updated);
      notifySuccess();
    }
  };

  const handleAddSkill = (catId: string) => {
    const val = newSkillInput[catId]?.trim();
    if (!val) return;

    const updated = categories.map((cat) => {
      if (cat.id === catId && !cat.skills.includes(val)) {
        return { ...cat, skills: [...cat.skills, val] };
      }
      return cat;
    });

    setCategories(updated);
    onSaveSkills(updated);
    setNewSkillInput({ ...newSkillInput, [catId]: '' });
    notifySuccess();
  };

  const handleRemoveSkill = (catId: string, skillToRemove: string) => {
    const updated = categories.map((cat) => {
      if (cat.id === catId) {
        return { ...cat, skills: cat.skills.filter((s) => s !== skillToRemove) };
      }
      return cat;
    });

    setCategories(updated);
    onSaveSkills(updated);
    notifySuccess();
  };

  const notifySuccess = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">多元技能分類管理</h3>
          <p className="text-xs text-slate-500">
            維護專長領域與技能標籤，展現多元探索與學習成效
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>技能資料已更新並儲存！</span>
        </div>
      )}

      {/* Add New Category Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
          placeholder="輸入新分類名稱（例如：領導與表達、外語能力）"
          className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
        />
        <button
          type="button"
          onClick={handleAddCategory}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          新增技能分類
        </button>
      </div>

      {/* Categories & Badges List */}
      <div className="space-y-5">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Award className="w-4 h-4 text-sky-600" />
                {category.name}
              </h4>
              <button
                type="button"
                onClick={() => handleDeleteCategory(category.id)}
                className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 text-xs flex items-center gap-1 font-semibold transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                刪除分類
              </button>
            </div>

            {/* Current Skills Chips */}
            <div className="flex flex-wrap gap-2 min-h-[32px]">
              {category.skills.length === 0 ? (
                <p className="text-2xs text-slate-400 italic">此分類目前尚無技能標籤</p>
              ) : (
                category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-800 border border-sky-200"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(category.id, skill)}
                      className="p-0.5 rounded-full hover:bg-sky-200 text-sky-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Add Skill to Category */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newSkillInput[category.id] || ''}
                onChange={(e) =>
                  setNewSkillInput({ ...newSkillInput, [category.id]: e.target.value })
                }
                placeholder={`新增「${category.name}」內的技能標籤...`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(category.id);
                  }
                }}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
              />
              <button
                type="button"
                onClick={() => handleAddSkill(category.id)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                新增標籤
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
