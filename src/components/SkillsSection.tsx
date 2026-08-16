import React from 'react';
import { Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { SkillCategory } from '../types';

interface SkillsSectionProps {
  skills: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const sortedCategories = [...skills].sort((a, b) => a.order - b.order);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/70">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-sky-600" />
            MY SKILLS & INTERESTS
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            多元技能與專業素養
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            跨越數位科技、戶外實踐與表達溝通的多元能力積累
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sortedCategories.map((category, idx) => {
            const isPinkAccent = idx % 2 === 1;
            return (
              <div
                key={category.id}
                id={`skill-category-${category.id}`}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-sky-200 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                        isPinkAccent
                          ? 'bg-gradient-to-tr from-pink-100 to-rose-100 text-pink-700 border border-pink-200/60 shadow-2xs'
                          : 'bg-gradient-to-tr from-sky-100 to-blue-100 text-sky-700 border border-sky-200/60 shadow-2xs'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800">
                      {category.name}
                    </h3>
                  </div>

                  {/* Skills Badges Cloud */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-105 ${
                          isPinkAccent
                            ? 'bg-pink-50/80 hover:bg-pink-100 text-pink-900 border-pink-200/90 shadow-2xs'
                            : 'bg-sky-50/80 hover:bg-sky-100 text-sky-900 border-sky-200/90 shadow-2xs'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${isPinkAccent ? 'text-pink-600' : 'text-sky-600'}`}
                        />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 text-xs text-slate-400 font-medium flex items-center justify-between">
                  <span>共 {category.skills.length} 項核心能力</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-300"></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
