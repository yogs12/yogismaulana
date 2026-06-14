import React, { useState } from 'react';
import { Mail, MapPin, Send, MessageSquareCode, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactMessage } from '../types';

interface ContactProps {
  ownerEmail: string;
  onSendMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>) => void;
}

export default function Contact({ ownerEmail, onSendMessage }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Nama lengkap wajib diisi';
    if (!formData.email.trim()) {
      errors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Format email tidak valid';
    }
    if (!formData.subject.trim()) errors.subject = 'Subjek pesan wajib diisi';
    if (!formData.message.trim()) {
      errors.message = 'Pesan wajib ditulis';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Pesan minimal berisi 10 karakter';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate Network Latency
    setTimeout(() => {
      onSendMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Timeout result back to normal state
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 border-t border-gray-900 bg-[#070b13]/20 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-400">HUBUNGI SAYA</h2>
          <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Koneksikan Ide Luar Biasa Anda</p>
          <div className="h-1 w-20 bg-brand-500 mx-auto rounded-full"></div>
          <p className="text-sm text-gray-400 mt-2">Mencari kolaborator untuk proyek SaaS, aplikasi seluler, atau sekadar ingin berdiskusi teknologi? Kirimkan pesan di bawah ini!</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          
          {/* Info Panels */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-6 text-left">
              <h3 className="text-2xl font-bold text-white tracking-tight">Informasi kontak</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Pesan yang Anda kirim lewat formulir ini akan disimpan di sistem inbox lokal peramban Anda. Anda dapat melihatnya di panel Inbox di bagian kanan atas kapan saja!
              </p>

              {/* Badges list */}
              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-xl bg-gray-900/40 border border-gray-800/80">
                  <span className="w-10 h-10 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="block text-xs uppercase font-mono text-gray-500 font-bold">Email Utama</span>
                    <a href={`mailto:${ownerEmail}`} className="text-sm text-white hover:text-brand-400 transition-colors font-medium">
                      {ownerEmail}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-gray-900/40 border border-gray-800/80">
                  <span className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="block text-xs uppercase font-mono text-gray-500 font-bold">Lokasi Kerja</span>
                    <span className="text-sm text-white font-medium">Surabaya, Indonesia (WIB)</span>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-gray-900/40 border border-gray-800/80">
                  <span className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center flex-shrink-0">
                    <MessageSquareCode className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="block text-xs uppercase font-mono text-gray-500 font-bold">Mode Bekerja</span>
                    <span className="text-sm text-white font-medium">Full-Time, Remote, &amp; Konsultasi Kontrak</span>
                  </div>
                </div>
              </div>
            </div>


          </div>

          {/* Form Panel */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-gray-900/40 border border-gray-800/80 text-left">
              <h4 className="text-lg font-sans font-bold text-white mb-6">Formulir Pesan Instan</h4>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name & Email in grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">Nama Anda *</label>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Contoh: Budi Santoso"
                      className={`w-full px-4 py-3 bg-[#0d121f] text-white text-sm border rounded-xl outline-none transition-all ${
                        formErrors.name ? 'border-rose-500/60 focus:ring-rose-500' : 'border-gray-800 focus:border-brand-500'
                      }`}
                    />
                    {formErrors.name && (
                      <span className="flex items-center gap-1.5 text-xs text-rose-400 font-mono">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.name}
                      </span>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">Alamat Email *</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Contoh: budi@mail.com"
                      className={`w-full px-4 py-3 bg-[#0d121f] text-white text-sm border rounded-xl outline-none transition-all ${
                        formErrors.email ? 'border-rose-500/60 focus:ring-rose-500' : 'border-gray-800 focus:border-brand-500'
                      }`}
                    />
                    {formErrors.email && (
                      <span className="flex items-center gap-1.5 text-xs text-rose-400 font-mono">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">Subjek Pesan *</label>
                  <input
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Contoh: Penawaran Freelance Aplikasi mobile"
                    className={`w-full px-4 py-3 bg-[#0d121f] text-white text-sm border rounded-xl outline-none transition-all ${
                      formErrors.subject ? 'border-rose-500/60 focus:ring-rose-500' : 'border-gray-800 focus:border-brand-500'
                    }`}
                  />
                  {formErrors.subject && (
                    <span className="flex items-center gap-1.5 text-xs text-rose-400 font-mono">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.subject}
                    </span>
                  )}
                </div>

                {/* Message text field */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">Deskripsi Pesan Anda *</label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tulis ide atau pertanyaan kolaborasi Anda di sini secara rinci..."
                    className={`w-full px-4 py-3 bg-[#0d121f] text-white text-sm border rounded-xl outline-none transition-all resize-none ${
                      formErrors.message ? 'border-rose-500/60 focus:ring-rose-500' : 'border-gray-800 focus:border-brand-500'
                    }`}
                  />
                  {formErrors.message && (
                    <span className="flex items-center gap-1.5 text-xs text-rose-400 font-mono">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.message}
                    </span>
                  )}
                </div>

                {/* Submit button with animations */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="w-full py-4 rounded-xl font-medium text-white text-sm transition-all flex items-center justify-center gap-2 transform cursor-pointer disabled:pointer-events-none bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 shadow-md shadow-brand-500/10 active:scale-98"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Sedang Mengirim...</span>
                    </>
                  ) : isSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300 animate-bounce" />
                      <span className="text-emerald-300">Pesan Berhasil Terkirim!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Kirim Pesan Sekarang</span>
                    </>
                  )}
                </button>

              </form>

              {/* Storage Info Toast hint */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 rounded-lg border border-emerald-500/10 bg-emerald-500/5 text-emerald-400 text-xs font-sans text-center"
                  >
                    Sukses! Anda bisa mengecek pesan ini pada tombol **Inbox** (ikon Laci Pesan) di kanan atas navigasi portfolio!
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
