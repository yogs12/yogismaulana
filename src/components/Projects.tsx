import React, { useState } from 'react';
import { Filter, Search, Github, ExternalLink, ArrowRight, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Semua Proyek' },
    { id: 'frontend', label: 'Frontend Only' },
    { id: 'backend', label: 'Backend Ops' },
    { id: 'fullstack', label: 'Full-Stack' },
  ];

  const handleToggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = filter === 'all' || project.category === filter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 border-t border-gray-900 bg-gray-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-400">FAVORIT SAYA</h2>
          <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Karya Seni Digital Unggulan</p>
          <div className="h-1 w-20 bg-brand-500 mx-auto rounded-full"></div>
          <p className="text-sm text-gray-400 mt-2">Daftar proyek terpilih yang menunjukkan keahlian teknis dan perhatian mendalam pada detail.</p>
        </div>

        {/* Filter and Search Bar controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          {/* Categories Tab list */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-gray-900/60 rounded-xl border border-gray-800">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                  filter === cat.id
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Clean Realtime Search */}
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Cari kata kunci, modul, stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-900/60 border border-gray-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-xl text-xs text-white placeholder-gray-500 transition-all outline-none"
            />
          </div>
        </div>

        {/* Projects Grid Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, i) => {
                const isExpanded = expandedId === project.id;
                return (
                  <motion.div
                    key={project.id}
                    layout="position"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="flex flex-col rounded-2xl bg-gray-900/40 border border-gray-800/80 overflow-hidden hover:border-gray-700/80 transition-all shadow-lg group relative"
                  >
                    {/* Featured label tag */}
                    {project.featured && (
                      <span className="absolute top-4 right-4 z-10 font-mono text-[10px] font-bold text-white bg-indigo-600 border border-indigo-500 px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                        Unggulan
                      </span>
                    )}

                    {/* Project Preview Image Grid */}
                    <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-950 flex justify-center items-center">
                      <img
                        src={project.imageUrl}
                        alt={project.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-85 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent"></div>
                    </div>

                    {/* Project Meta and Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between text-left">
                      <div className="space-y-4">
                        {/* Tags Badges */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[10px] font-medium text-brand-300 border border-brand-500/10 bg-brand-500/5 px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Title & brief */}
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-white tracking-snug group-hover:text-brand-400 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      {/* Expandable highlight sections */}
                      <div className="mt-4">
                        <button
                          onClick={(e) => handleToggleExpand(project.id, e)}
                          className="flex items-center gap-1 text-[11px] font-mono uppercase font-bold text-brand-400 hover:text-white transition-colors cursor-pointer"
                        >
                          {isExpanded ? (
                            <>
                              Sembunyikan Detail <ChevronUp className="w-3.5 h-3.5" />
                            </>
                          ) : (
                            <>
                              Detail Pencapaian <ChevronDown className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden mt-3 pt-3 border-t border-gray-800 space-y-2 text-xs"
                            >
                              <div className="font-mono text-[10px] uppercase text-gray-500 font-bold tracking-wider">Hasil Konstruksi:</div>
                              <ul className="space-y-1.5 text-gray-400">
                                {project.highlights.map((hil, hi) => (
                                  <li key={hi} className="flex gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                    <span>{hil}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Launch Buttons in meta */}
                      <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between gap-4">
                        <div className="flex gap-3">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-gray-400 hover:text-white flex items-center gap-1.5 text-xs font-mono"
                              title="Link Repositori"
                            >
                              <Github className="w-4 h-4" />
                              <span>Repository</span>
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-gray-400 hover:text-white flex items-center gap-1.5 text-xs font-mono"
                              title="Demo Live Aplikasi"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>

                        <span className="text-[10px] tracking-widest font-mono text-gray-500 uppercase">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-2 py-10 px-6 rounded-2xl bg-[#0e1424] border border-gray-800/80 text-center space-y-2">
                <p className="text-gray-300 font-bold">Proyek Tidak Ditemukan</p>
                <p className="text-xs text-gray-500">Silakan periksa kata kunci query pencarian lain atau pilih tab kategori yang berbeda.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
