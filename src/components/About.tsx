import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Profile, SkillCategory } from '../types';

interface AboutProps {
  profile: Profile;
  skillCategories: SkillCategory[];
}

export default function About({ profile, skillCategories }: AboutProps) {
  const [activeTab, setActiveTab] = useState(0);

  // Helper to render lucide icon dynamically
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="w-5 h-5" />;
    }
    return <Icons.Code className="w-5 h-5" />;
  };

  return (
    <section id="about" className="py-24 border-t border-gray-900 bg-gray-950/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-400">TENTANG SAYA</h2>
          <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Menyelaraskan Desain Visual &amp; Kompleksitas Logika</p>
          <div className="h-1 w-20 bg-brand-500 mx-auto rounded-full"></div>
        </div>

        {/* Info Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Bio side */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-tight">Siapa saya sebenarnya?</h3>
            
            <p className="text-gray-400 leading-relaxed font-sans text-base">
              {profile.bio}
            </p>

            <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800/80 space-y-4">
              <h4 className="font-sans font-semibold text-white">Prinsip Kerja Saya</h4>
              
              <ul className="space-y-3">
                {[
                  { title: "Kualitas Kode Utama", desc: "Menulis kode yang bersih, terdokumentasi, dan mudah dirawat." },
                  { title: "Desain Berpusat Pada Pengguna", desc: "Aplikasi tak sekadar bekerja, namun harus intuitif dan indah dipandang." },
                  { title: "Skalabilitas & Performa", desc: "Optimasi latensi, struktur database, dan pemanfaatan caching tingkat lanjut." }
                ].map((item, index) => (
                  <li key={index} className="flex gap-3 text-left">
                    <span className="w-6 h-6 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                      {index + 1}
                    </span>
                    <div>
                      <span className="block font-medium text-white text-sm">{item.title}</span>
                      <span className="text-xs text-gray-500 block mt-0.5">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skills side */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold text-white tracking-tight">Kemampuan Teknis</h3>
              <p className="text-sm text-gray-400">Ringkasan alat, bahasa pemrograman, dan framework yang saya gunakan sehari-hari.</p>
            </div>

            {/* Tabs Trigger */}
            <div className="flex flex-wrap border-b border-gray-800 gap-2">
              {skillCategories.map((category, index) => (
                <button
                  key={category.name}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-2.5 font-sans font-medium text-sm border-b-2 transition-all relative ${
                    activeTab === index
                      ? 'border-brand-500 text-brand-400 font-semibold'
                      : 'border-transparent text-gray-500 hover:text-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Active Tab Panel */}
            <div className="p-6 rounded-2xl bg-[#0e1424] border border-gray-800/80">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {skillCategories[activeTab]?.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2 text-left">
                      <div className="flex justify-between items-center text-sm">
                        <span className="flex items-center gap-2.5 text-gray-200 font-medium">
                          <span className="p-1.5 rounded-lg bg-gray-900/80 text-brand-400 border border-gray-800/50">
                            {renderIcon(skill.iconName)}
                          </span>
                          {skill.name}
                        </span>
                        <span className="font-mono text-xs text-gray-500">{skill.level}%</span>
                      </div>
                      
                      {/* Bar indicator */}
                      <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden border border-gray-800/40">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-brand-500 via-brand-400 to-indigo-600 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
