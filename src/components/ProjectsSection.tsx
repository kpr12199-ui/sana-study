import React, { useState } from 'react';
import { Sparkles, Calendar, ArrowRight, FolderKanban, Film, ImageIcon } from 'lucide-react';
import { ProjectItem } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  // Extract unique categories
  const categories = ['全部', ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))];

  // Sort by order asc, then filter
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);
  const filteredProjects =
    selectedCategory === '全部'
      ? sortedProjects
      : sortedProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/70">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <FolderKanban className="w-3.5 h-3.5 text-sky-600" />
            MY PROJECTS
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            精選學習與探索專題
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
            記錄自主學習、課堂探究與課外創作的真實軌跡與成果
          </p>
        </div>

        {/* Category Filter Tabs */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-sky-500 to-pink-500 text-white shadow-xs font-semibold scale-105'
                    : 'bg-white text-slate-600 hover:bg-sky-50 border border-slate-200 hover:border-sky-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Projects Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-500 text-sm">目前此分類尚無專案展示</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => {
              const coverImage =
                project.images && project.images.length > 0
                  ? project.images[0]
                  : 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
              const hasVideo = !!project.videoUrl;
              const hasMultipleImages = project.images && project.images.length > 1;

              return (
                <div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  onClick={() => setActiveProject(project)}
                  className="group bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-sky-300 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer hover:-translate-y-1"
                >
                  {/* Cover Image Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <img
                      src={coverImage}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    {/* Category Badge overlay */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-sky-800 shadow-xs backdrop-blur-xs border border-sky-100">
                        {project.category}
                      </span>
                    </div>

                    {/* Media Indicators */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                      {hasVideo && (
                        <span className="p-1.5 rounded-full bg-slate-900/80 text-pink-300 backdrop-blur-xs shadow-xs" title="包含展示影片">
                          <Film className="w-3.5 h-3.5" />
                        </span>
                      )}
                      {hasMultipleImages && (
                        <span className="p-1.5 rounded-full bg-slate-900/80 text-sky-300 backdrop-blur-xs shadow-xs" title={`共 ${project.images.length} 張照片`}>
                          <ImageIcon className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Date */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{project.date}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-slate-800 group-hover:text-sky-700 transition-colors line-clamp-1">
                        {project.title}
                      </h3>

                      {/* Summary */}
                      <p className="mt-2 text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    {/* Card Action Link */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-700 group-hover:text-pink-600 transition-colors">
                      <span>查看詳細歷程</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
