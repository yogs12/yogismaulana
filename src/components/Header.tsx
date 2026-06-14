import React, { useState, useEffect } from 'react';
import { Menu, X, Settings, Inbox, Briefcase, User, Mail, FolderGit, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Profile, ContactMessage } from '../types';

interface HeaderProps {
  profile: Profile;
  unreadCount: number;
  onOpenSettings: () => void;
  onOpenInbox: () => void;
}

export default function Header({ profile, unreadCount, onOpenSettings, onOpenInbox }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Beranda', id: 'home', icon: User },
    { label: 'Tentang', id: 'about', icon: BookOpen },
    { label: 'Pengalaman', id: 'experience', icon: Briefcase },
    { label: 'Proyek', id: 'projects', icon: FolderGit },
    { label: 'Kontak', id: 'contact', icon: Mail },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-[#0b0f19]/95 backdrop-blur-md border-b border-gray-800/80 shadow-lg py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="#home" className="flex items-center gap-2 group" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center font-mono font-bold text-white text-lg shadow-md group-hover:scale-105 transition-transform">
                {profile.name[0]}
              </div>
              <div className="hidden sm:block">
                <span className="font-sans font-bold text-white tracking-tight group-hover:text-brand-400 transition-colors">
                  {profile.name}
                </span>
                <span className="block font-mono text-[10px] text-gray-500 uppercase tracking-widest">{profile.title}</span>
              </div>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 rounded-lg font-sans text-sm font-medium transition-colors flex items-center gap-2 ${
                    activeSection === item.id ? 'text-brand-400 bg-gray-800/40' : 'text-gray-400 hover:text-white hover:bg-gray-800/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-brand-400 to-indigo-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Control Actions (Inbox , Settings) */}
          <div className="flex items-center gap-2">
            {/* Inbox */}
            <button
              onClick={onOpenInbox}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/40 rounded-lg transition-colors relative"
              title="Inbox Pesan Masuk"
              id="header-inbox-btn"
            >
              <Inbox className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                </span>
              )}
            </button>

            {/* Customizer */}
            <button
              onClick={onOpenSettings}
              className="p-2 text-gray-400 hover:text-brand-400 hover:bg-gray-800/40 rounded-lg transition-colors flex items-center gap-2 group"
              title="Edit Portofolio ini"
              id="header-edit-btn"
            >
              <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
              <span className="hidden md:inline text-xs font-mono font-medium tracking-wide border border-dashed border-gray-700/50 px-2 py-0.5 rounded text-gray-500 group-hover:text-brand-400 group-hover:border-brand-500/30 transition-colors">CMS</span>
            </button>

            {/* Availability */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-semibold max-w-sm bg-gray-900/60 border border-gray-800 text-xs text-gray-300 font-medium">
              <span className={`relative flex h-2 w-2`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  profile.status === 'hiring' ? 'bg-indigo-400' : profile.status === 'open' ? 'bg-emerald-400' : 'bg-amber-404'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  profile.status === 'hiring' ? 'bg-indigo-500' : profile.status === 'open' ? 'bg-emerald-500' : 'bg-amber-500'
                }`}></span>
              </span>
              <span>
                {profile.status === 'hiring' ? 'Menerikan Freelance' : profile.status === 'open' ? 'Buka untuk Kerja' : 'Sedang Sibuk'}
              </span>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/40 rounded-lg transition-colors lg:hidden"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#0c111e] border-b border-gray-800"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-sans text-base font-medium transition-colors flex items-center gap-3 ${
                      activeSection === item.id ? 'text-brand-400 bg-gray-800/60 font-semibold' : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-gray-500" />
                    {item.label}
                  </button>
                );
              })}
              
              <div className="pt-4 border-t border-gray-800 flex items-center justify-between px-4">
                <span className="text-xs text-gray-400">Status ketersediaan</span>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900 border border-gray-800 text-xs text-brand-300">
                  <span className={`h-1.5 w-1.5 rounded-full ${
                    profile.status === 'hiring' ? 'bg-indigo-500' : profile.status === 'open' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}></span>
                  {profile.status === 'hiring' ? 'Freelance' : profile.status === 'open' ? 'Buka Tawaran' : 'Sibuk'}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
