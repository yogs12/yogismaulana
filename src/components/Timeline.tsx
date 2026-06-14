import React from 'react';
import { Briefcase, BookOpen, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { TimelineItem } from '../types';

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <section id="experience" className="py-24 border-t border-gray-900 bg-[#070b13]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-400">RIWAYAT KARIR &amp; PENDIDIKAN</h2>
          <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Perjalanan Profesional Saya</p>
          <div className="h-1 w-20 bg-brand-500 mx-auto rounded-full"></div>
        </div>

        {/* Timeline body */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Track Line */}
          <div className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-brand-500/80 via-indigo-600/50 to-gray-800 -translate-x-1/2 hidden sm:block"></div>
          <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gradient-to-b from-brand-500/80 via-indigo-600/50 to-gray-800 sm:hidden"></div>

          <div className="space-y-12">
            {items.map((item, index) => {
              const isEven = index % 2 === 0;
              const Icon = item.type === 'work' ? Briefcase : BookOpen;

              return (
                <div key={item.id} className="relative flex flex-col sm:flex-row items-stretch">
                  
                  {/* Timeline Badge Dot Indicator */}
                  <div className="absolute left-6 sm:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
                    <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-brand-500 flex items-center justify-center text-brand-400 shadow-md">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Even Card (Left on wide, Full on narrow) */}
                  <div className={`w-full sm:w-1/2 pl-16 pr-4 sm:pl-0 sm:pr-12 text-left ${isEven ? 'sm:text-right sm:ml-0' : 'sm:order-2 sm:pl-12 sm:pr-0'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800/80 hover:border-gray-700/80 transition-all shadow-lg hover:shadow-brand-500/5 group text-left"
                    >
                      {/* Meta header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-xs text-brand-400 font-mono font-medium py-1 px-2.5 rounded-full bg-brand-500/5 border border-brand-500/10">
                          <Clock className="w-3 h-3" />
                          {item.period}
                        </span>
                        
                        <span className="text-xs uppercase font-semibold text-gray-500 tracking-wider">
                          {item.type === 'work' ? 'Pekerjaan' : 'Pendidikan'}
                        </span>
                      </div>

                      {/* Main Titles */}
                      <h3 className="text-lg font-bold text-white group-hover:text-brand-400 transition-colors leading-snug">
                        {item.role}
                      </h3>
                      
                      <p className="text-sm text-gray-400 font-medium mt-1">
                        {item.company}
                      </p>

                      <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Achievements list */}
                      {item.achievements && item.achievements.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-800/50 space-y-2">
                          <span className="block text-xs uppercase font-bold text-gray-400 tracking-wider">Pencapaian Utama:</span>
                          <ul className="space-y-1.5">
                            {item.achievements.map((ach, ai) => (
                              <li key={ai} className="flex gap-2 text-xs text-gray-400 select-none">
                                <CheckCircle className="w-3.5 h-3.5 text-brand-500 flex-shrink-0 mt-0.5" />
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Spacer for large screens layout alignment */}
                  <div className="hidden sm:block sm:w-1/2"></div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
