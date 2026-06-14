import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Contact from './components/Contact';
import InboxModal from './components/InboxModal';
import SettingsModal from './components/SettingsModal';
import { defaultPortfolioData } from './defaultData';
import { PortfolioData, ContactMessage } from './types';
import { Sparkles, Heart } from 'lucide-react';

const LOCAL_STORAGE_DATA_KEY = 'portofolio_user_data';
const LOCAL_STORAGE_MSG_KEY = 'portofolio_user_messages';

const SEED_MESSAGE: ContactMessage = {
  id: 'seeded-1',
  name: 'Andi Wijaya (PT Telkom)',
  email: 'andi.wijaya@telkom.co.id',
  subject: 'Penawaran Kolaborasi Arsitektur Aplikasi',
  message: `Halo Giri,\n\nSaya melihat portfolio personal Anda dan sangat tertarik dengan demo sistem Logistik Nusantara yang Anda kembangkan menggunakan Golang dan React.\n\nApakah Anda memiliki waktu luang minggu ini untuk berbincang santai secara online mengenai potensi konsultasi kontrak di departemen kami?\n\nSalam,\nAndi Wijaya`,
  createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
  isRead: false
};

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultPortfolioData);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize data and sync on mounts
  useEffect(() => {
    // Portfolio details loading
    const savedData = localStorage.getItem(LOCAL_STORAGE_DATA_KEY);
    if (savedData) {
      try {
        setPortfolioData(JSON.parse(savedData));
      } catch (e) {
        console.error('Error loading saved portfolio data:', e);
      }
    }

    // Inbox messages loading
    const savedMessages = localStorage.getItem(LOCAL_STORAGE_MSG_KEY);
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Error loading messages:', e);
      }
    } else {
      // Seed with initial message
      const initialMsgs = [SEED_MESSAGE];
      setMessages(initialMsgs);
      localStorage.setItem(LOCAL_STORAGE_MSG_KEY, JSON.stringify(initialMsgs));
    }

    // Scroll progress handler
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save updated portfolio details
  const handleSaveData = (updatedData: PortfolioData) => {
    setPortfolioData(updatedData);
    localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(updatedData));
  };

  // Reset portfolio to default
  const handleResetData = () => {
    setPortfolioData(defaultPortfolioData);
    localStorage.removeItem(LOCAL_STORAGE_DATA_KEY);
  };

  // Send message simulation
  const handleSendMessage = (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: 'msg-' + Date.now(),
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    const updatedMessages = [newMsg, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem(LOCAL_STORAGE_MSG_KEY, JSON.stringify(updatedMessages));
  };

  // Toggle read/unread status (or special seed trigger if id is 'seed')
  const handleToggleRead = (id: string) => {
    if (id === 'seed') {
      // Special trigger: Seed demo messages
      const seededDummys = [
        {
          id: 'msg-seed-2',
          name: 'Sarah Amalia (Unicorn Startup)',
          email: 'sarah.amalia@go-co.id',
          subject: 'Kesempatan Full-Time Senior Frontend Engineer',
          message: 'Halo Gigi,\n\nSaya Tech Recruiter dari Karya Anak Bangsa Group. Kami terkesan dengan rekam jejak portofolio Next.js dan optimasi vitals Anda.\n\nApakah Anda tertarik untuk menjajaki posisi Senior Frontend Developer di kantor Jakarta? Informasi kompensasi dan tunjangan sangat kompetitif.\n\nBest Regards,\nSarah',
          createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          isRead: false
        },
        SEED_MESSAGE
      ];
      setMessages(seededDummys);
      localStorage.setItem(LOCAL_STORAGE_MSG_KEY, JSON.stringify(seededDummys));
      return;
    }

    const updated = messages.map((m) => (m.id === id ? { ...m, isRead: !m.isRead } : m));
    setMessages(updated);
    localStorage.setItem(LOCAL_STORAGE_MSG_KEY, JSON.stringify(updated));
  };

  // Delete message
  const handleDeleteMessage = (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem(LOCAL_STORAGE_MSG_KEY, JSON.stringify(updated));
  };

  // Clear all inbox
  const handleClearAllMessages = () => {
    const updated: ContactMessage[] = [];
    setMessages(updated);
    localStorage.setItem(LOCAL_STORAGE_MSG_KEY, JSON.stringify(updated));
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="relative min-h-screen bg-[#0b0f19] text-gray-200 antialiased selection:bg-brand-500/30 selection:text-brand-300">
      
      {/* Scroll progress linear track top bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-400 via-indigo-500 to-indigo-600 z-50 transform origin-left transition-all duration-75"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Main Header navigation */}
      <Header
        profile={portfolioData.profile}
        unreadCount={unreadCount}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenInbox={() => setIsInboxOpen(true)}
      />

      {/* Main blocks content pages layouts */}
      <main>
        {/* Cinematic welcome section */}
        <Hero profile={portfolioData.profile} socials={portfolioData.socials} />
        
        {/* Core detailed about background and level skill sliders */}
        <About profile={portfolioData.profile} skillCategories={portfolioData.skillCategories} />
        
        {/* Timeline trace logs for employment history and credentials background */}
        <Timeline items={portfolioData.timeline} />
        
        {/* Selective interactive portfolio project catalog showcase search grids */}
        <Projects projects={portfolioData.projects} />
        
        {/* Active local submission contacts forms systems */}
        <Contact ownerEmail={portfolioData.socials.email || 'giri.pradana@dev.id'} onSendMessage={handleSendMessage} />
      </main>

      {/* Footer information credit */}
      <footer className="border-t border-gray-900 bg-gray-950/60 py-12 text-sm text-gray-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-white font-sans font-bold tracking-tight">
              {portfolioData.profile.name}
            </span>
            <span className="text-gray-700 font-sans">|</span>
            <span className="text-xs">© {new Date().getFullYear()} All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-gray-600">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>&amp; React + Tailwind CSS</span>
          </div>
        </div>
      </footer>

      {/* Reactive Sandbox Config Modals overlay overlay */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        data={portfolioData}
        onSave={handleSaveData}
        onReset={handleResetData}
      />

      {/* Inbox message details modal */}
      <InboxModal
        isOpen={isInboxOpen}
        onClose={() => setIsInboxOpen(false)}
        messages={messages}
        onToggleRead={handleToggleRead}
        onDeleteMessage={handleDeleteMessage}
        onClearAll={handleClearAllMessages}
      />

    </div>
  );
}

