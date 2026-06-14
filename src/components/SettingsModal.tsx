import React, { useState, useEffect } from 'react';
import { X, Settings, Check, RefreshCw, Smartphone, Monitor, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioData } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (updatedData: PortfolioData) => void;
  onReset: () => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  data,
  onSave,
  onReset,
}: SettingsModalProps) {
  const [profileForm, setProfileForm] = useState({ ...data.profile });
  const [socialsForm, setSocialsForm] = useState({ ...data.socials });
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'socials' | 'stats'>('profile');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProfileForm({ ...data.profile });
      setSocialsForm({ ...data.socials });
      setIsSaved(false);
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatValueChange = (index: number, attr: 'label' | 'value', value: string) => {
    const updatedStats = [...profileForm.stats];
    updatedStats[index] = { ...updatedStats[index], [attr]: value };
    setProfileForm((prev) => ({ ...prev, stats: updatedStats }));
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialsForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...data,
      profile: profileForm,
      socials: socialsForm,
    });
    
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-xs"
        />

        {/* Modal frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative max-w-2xl w-full bg-[#0d121f] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-brand-500/10 text-brand-400 rounded-xl border border-brand-500/20">
                <Settings className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-sans font-bold text-white text-lg">Portfolio CMS Sandbox</h3>
                <p className="text-[11px] font-mono text-gray-500 uppercase tracking-widest">
                  Kustomisasi Semua Teks, Data, &amp; Status Secara Instan
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/40 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            
            {/* Modal Navigation Sub-tabs */}
            <div className="flex border-b border-gray-805 bg-gray-950/25 px-6">
              {[
                { id: 'profile', label: 'Profil Utama' },
                { id: 'socials', label: 'Tautan Sosial' },
                { id: 'stats', label: 'Statistik Pencapaian' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`px-4 py-3 text-xs font-sans font-medium transition-all relative border-b-2 ${
                    activeSubTab === tab.id
                      ? 'border-brand-500 text-brand-400 font-semibold'
                      : 'border-transparent text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form scrollable inputs body area */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-left">
              
              {/* Profile TAB Form */}
              {activeSubTab === 'profile' && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">Nama Lengkap</label>
                      <input
                        type="text"
                        name="name"
                        value={profileForm.name}
                        onChange={handleProfileChange}
                        className="w-full px-3.5 py-2.5 bg-[#0a0d18] border border-gray-800 focus:border-brand-500 rounded-xl text-xs text-white outline-none"
                        required
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">Pekerjaan Utama</label>
                      <input
                        type="text"
                        name="title"
                        value={profileForm.title}
                        onChange={handleProfileChange}
                        className="w-full px-3.5 py-2.5 bg-[#0a0d18] border border-gray-800 focus:border-brand-500 rounded-xl text-xs text-white outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">Tagline Hero (Pendek)</label>
                    <input
                      type="text"
                      name="tagline"
                      value={profileForm.tagline}
                      onChange={handleProfileChange}
                      className="w-full px-3.5 py-2.5 bg-[#0a0d18] border border-gray-800 focus:border-brand-500 rounded-xl text-xs text-white outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">Deskripsi Sub-Hero</label>
                    <input
                      type="text"
                      name="subTitle"
                      value={profileForm.subTitle}
                      onChange={handleProfileChange}
                      className="w-full px-3.5 py-2.5 bg-[#0a0d18] border border-gray-800 focus:border-brand-500 rounded-xl text-xs text-white outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">Biografi Lengkap</label>
                    <textarea
                      name="bio"
                      rows={4}
                      value={profileForm.bio}
                      onChange={handleProfileChange}
                      className="w-full px-3.5 py-2.5 bg-[#0a0d18] border border-gray-800 focus:border-brand-500 rounded-xl text-xs text-white outline-none resize-none"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">Foto Profil (URL Gambar)</label>
                      <input
                        type="url"
                        name="avatarUrl"
                        value={profileForm.avatarUrl}
                        onChange={handleProfileChange}
                        className="w-full px-3.5 py-2.5 bg-[#0a0d18] border border-gray-800 focus:border-brand-500 rounded-xl text-xs text-white outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">Status Ketersediaan Bekerja</label>
                      <select
                        name="status"
                        value={profileForm.status}
                        onChange={handleProfileChange}
                        className="w-full px-3.5 py-2.5 bg-[#0a0d18] border border-gray-800 focus:border-brand-500 rounded-xl text-xs text-white outline-none"
                      >
                        <option value="open">Aktif - Buka Lowongan Bekerja</option>
                        <option value="hiring">Menerima Freelance / Kontrak</option>
                        <option value="busy">Sedang Sibuk / Terikat Fulltime</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Socials TAB Form */}
              {activeSubTab === 'socials' && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">Alamat Email Bisnis</label>
                      <input
                        type="email"
                        name="email"
                        value={socialsForm.email || ''}
                        onChange={handleSocialChange}
                        placeholder="nama@email.com"
                        className="w-full px-3.5 py-2.5 bg-[#0a0d18] border border-gray-800 focus:border-brand-500 rounded-xl text-xs text-white outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">GitHub URL</label>
                      <input
                        type="url"
                        name="github"
                        value={socialsForm.github || ''}
                        onChange={handleSocialChange}
                        className="w-full px-3.5 py-2.5 bg-[#0a0d18] border border-gray-800 focus:border-brand-500 rounded-xl text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">LinkedIn URL</label>
                      <input
                        type="url"
                        name="linkedin"
                        value={socialsForm.linkedin || ''}
                        onChange={handleSocialChange}
                        className="w-full px-3.5 py-2.5 bg-[#0a0d18] border border-gray-800 focus:border-brand-500 rounded-xl text-xs text-white outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">Instagram URL</label>
                      <input
                        type="url"
                        name="instagram"
                        value={socialsForm.instagram || ''}
                        onChange={handleSocialChange}
                        className="w-full px-3.5 py-2.5 bg-[#0a0d18] border border-gray-800 focus:border-brand-500 rounded-xl text-xs text-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Stats TAB Form */}
              {activeSubTab === 'stats' && (
                <div className="space-y-4">
                  <p className="text-xs text-gray-400 mb-4 font-sans">Sesuaikan 4 kartu metrik utama yang ditampilkan di beranda portfolio.</p>
                  
                  <div className="grid gap-4">
                    {profileForm.stats.map((stat, i) => (
                      <div key={i} className="p-4 rounded-xl bg-gray-950/40 border border-gray-800 grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-500 uppercase font-bold">Label Metrik #{i+1}</label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => handleStatValueChange(i, 'label', e.target.value)}
                            className="w-full px-3 py-2 bg-[#0d121f] border border-gray-800 focus:border-brand-500 rounded-lg text-xs text-white outline-none"
                            placeholder="Contoh: Pengalaman"
                            required
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-500 uppercase font-bold">Angka/Nilai #{i+1}</label>
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => handleStatValueChange(i, 'value', e.target.value)}
                            className="w-full px-3 py-2 bg-[#0d121f] border border-gray-800 focus:border-brand-500 rounded-lg text-xs text-white outline-none"
                            placeholder="Contoh: 5+ Tahun"
                            required
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Sticky Actions bar */}
            <div className="p-6 border-t border-gray-800 bg-gray-950/20 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Apakah Anda yakin ingin memulihkan data asli portfolio Giri Pradana? Perubahan Anda akan ditimpa.')) {
                    onReset();
                    onClose();
                  }
                }}
                className="text-xs text-gray-500 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer font-mono font-bold uppercase tracking-wider h-10 px-4"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Pulihkan Default
              </button>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-gray-800 hover:bg-gray-800 text-xs font-semibold text-gray-400 hover:text-white transition-all cursor-pointer h-10"
                >
                  Kembali
                </button>
                
                <button
                  type="submit"
                  disabled={isSaved}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:bg-emerald-600 font-semibold text-xs text-white flex items-center justify-center gap-2 transition-all cursor-pointer h-10"
                >
                  {isSaved ? (
                    <>
                      <Check className="w-4 h-4 animate-bounce" />
                      Tersimpan!
                    </>
                  ) : (
                    "Simpan Perubahan"
                  )}
                </button>
              </div>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
