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

        </div>

      </div>
    </section>
  );
}
