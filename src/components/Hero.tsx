import React from 'react';
import { Sparkles, ArrowRight, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { Profile, SocialLinks } from '../types';

interface HeroProps {
  profile: Profile;
  socials: SocialLinks;
}

export default function Hero({ profile, socials }: HeroProps) {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none animate-float"></div>
      <div className="absolute bottom-1/5 right-1/10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" style={{ animation: 'float 8s ease-in-out infinite alternate' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Announcement Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-mono font-medium text-brand-400"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-spin" style={{ animationDuration: '3s' }} />
              <span>{profile.tagline || 'Seni dalam kode, sains dalam performa.'}</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight"
                id="hero-header"
              >
                Halo, saya <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-400 to-indigo-600">{profile.name}</span>
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl sm:text-3xl font-bold text-gray-300 font-sans tracking-tight"
              >
                {profile.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-gray-400 max-w-2xl leading-relaxed"
              >
                {profile.subTitle}
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => handleScrollTo('projects')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transform hover:-translate-y-0.5 transition-all cursor-pointer"
                id="hero-btn-primary"
              >
                Lihat Portofolio
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => handleScrollTo('contact')}
                className="px-6 py-3.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 hover:bg-gray-800/50 text-white font-medium text-sm flex items-center gap-2 transform hover:-translate-y-0.5 transition-all cursor-pointer"
                id="hero-btn-secondary"
              >
                Hubungi Saya
                <Mail className="w-4 h-4" />
              </button>

              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-transparent border border-dashed border-gray-700 hover:border-brand-500/50 hover:text-brand-400 text-gray-400 font-medium text-sm flex items-center gap-2 transform hover:-translate-y-0.5 transition-all"
                  onClick={(e) => {
                    if (profile.resumeUrl === '#') {
                      e.preventDefault();
                      alert('CV dapat disimulasikan atau diganti di CMS panel di header!');
                    }
                  }}
                >
                  <FileText className="w-4 h-4" />
                  Unduh CV
                </a>
              )}
            </motion.div>

            {/* Socials shortcut */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-4 flex items-center gap-4 text-gray-500"
            >
              <span className="text-xs uppercase font-mono tracking-wider">Sambungkan:</span>
              <div className="flex gap-3">
                {socials.github && (
                  <a href={socials.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="GitHub">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {socials.linkedin && (
                  <a href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {socials.email && (
                  <a href={`mailto:${socials.email}`} className="hover:text-white transition-colors" title="Email">
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Interactive Visual/Avatar Side */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-72 h-72 sm:w-85 sm:h-85"
            >
              {/* Spinning/pulsating decorative background ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-indigo-600/30 rounded-3xl blur-2xl transform rotate-12 scale-105 pointer-events-none"></div>
              
              <div className="absolute inset-0 border-2 border-brand-500/20 rounded-3xl animate-float"></div>
              <div className="absolute inset-4 border border-dashed border-gray-800 rounded-3xl" style={{ animation: 'float 6s ease-in-out infinite alternate-reverse' }}></div>

              {/* Main Avatar Card Frame */}
              <div className="absolute inset-6 bg-gradient-to-b from-gray-900 to-[#0e1726] border border-gray-800/80 rounded-2xl overflow-hidden p-6 flex flex-col justify-between shadow-2xl group cursor-default">
                
                {/* Header terminal decor */}
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/60 block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/60 block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/60 block"></span>
                  </div>
                  <span className="font-mono text-[10px] text-gray-500">portfolio.sh</span>
                </div>

                {/* Main visual placeholder / custom image container */}
                <div className="my-4 flex-1 flex flex-col items-center justify-center relative">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4 rounded-2xl overflow-hidden border-2 border-brand-500/30 shadow-inner group-hover:border-brand-400 group-hover:scale-105 transition-all duration-300">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // Fallback fallback if Unsplash fails to load or internet connection lacks
                        e.currentTarget.style.display = 'none';
                        const fallbackContainer = e.currentTarget.parentElement?.querySelector('.avatar-placeholder');
                        if (fallbackContainer) fallbackContainer.classList.remove('hidden');
                      }}
                    />
                    <div className="avatar-placeholder hidden absolute inset-0 bg-gradient-to-tr from-brand-600 to-indigo-800 flex items-center justify-center font-bold text-white text-3xl">
                      {profile.name[0]}
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="font-sans font-bold text-white text-base tracking-tight">{profile.name}</h3>
                    <p className="font-mono text-xs text-brand-400 flex items-center justify-center gap-1.5 mt-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      Ready to Collaborate
                    </p>
                  </div>
                </div>

                {/* Action telemetry bar */}
                <div className="border-t border-gray-800/80 pt-3 flex items-center justify-between font-mono text-[11px] text-gray-500">
                  <span>LOC: JAKARTA, ID</span>
                  <span>UTC +7:00</span>
                </div>

              </div>
            </motion.div>
          </div>

        </div>

        {/* Stats Section with seamless aesthetic integrations */}
        <div className="mt-28 border-t border-gray-800/80 pt-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {profile.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                className="p-5 rounded-xl bg-gray-900/40 border border-gray-800/50 flex flex-col justify-center items-start text-left relative overflow-hidden group hover:border-gray-700/80 transition-colors"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-brand-500/60 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <span className="font-mono font-bold text-2xl sm:text-3xl text-white group-hover:text-brand-400 transition-colors">
                  {stat.value}
                </span>
                <span className="font-sans text-xs sm:text-sm text-gray-500 mt-2 font-medium">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
