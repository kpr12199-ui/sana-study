import React from 'react';
import { Milestone, Calendar, Sparkles, Flag, ArrowUpRight } from 'lucide-react';
import { TimelineItem } from '../types';

interface TimelineSectionProps {
  timeline: TimelineItem[];
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ timeline }) => {
  const sortedTimeline = [...timeline].sort((a, b) => a.order - b.order);

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Milestone className="w-3.5 h-3.5 text-pink-600" />
            LEARNING TIMELINE
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            重要學習歷程與里程碑
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            循序漸進的每一步，累積成專屬自我的成長足跡
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-2 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-1 before:bg-gradient-to-b before:from-sky-400 before:via-pink-400 before:to-sky-300 before:rounded-full">
          {sortedTimeline.map((item, index) => {
            const isFuture = item.year.includes('未來') || item.year.toLowerCase().includes('future');
            return (
              <div
                key={item.id}
                id={`timeline-item-${item.id}`}
                className="relative group"
              >
                {/* Timeline Dot Indicator */}
                <div
                  className={`absolute -left-6 sm:-left-10 top-3 w-5 h-5 sm:w-7 sm:h-7 rounded-full border-2 sm:border-3 flex items-center justify-center transition-all group-hover:scale-125 ${
                    isFuture
                      ? 'bg-gradient-to-tr from-pink-500 to-rose-400 border-white text-white shadow-md'
                      : 'bg-gradient-to-tr from-sky-400 to-sky-600 border-white text-white shadow-md'
                  }`}
                >
                  {isFuture ? (
                    <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  ) : (
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white" />
                  )}
                </div>

                {/* Timeline Card */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-sky-100/80 shadow-xs hover:border-pink-200 hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-sky-100 to-pink-50 text-sky-800 border border-sky-200/70 shadow-2xs">
                        {item.year}
                      </span>
                      {item.category && (
                        <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                          {item.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2 group-hover:text-sky-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
