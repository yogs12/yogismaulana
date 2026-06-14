import React from 'react';
import { X, Trash2, MailOpen, Mail, AlertCircle, Inbox } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactMessage } from '../types';

interface InboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ContactMessage[];
  onToggleRead: (id: string) => void;
  onDeleteMessage: (id: string) => void;
  onClearAll: () => void;
}

export default function InboxModal({
  isOpen,
  onClose,
  messages,
  onToggleRead,
  onDeleteMessage,
  onClearAll,
}: InboxModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal content body */}
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
                <Inbox className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-sans font-bold text-white text-lg">Local Inbox Simulator</h3>
                <p className="text-[11px] font-mono text-gray-500 uppercase tracking-widest">
                  Pesan instan tersimpan di peramban Anda
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

          {/* Action header bar */}
          {messages.length > 0 && (
            <div className="px-6 py-2.5 bg-gray-950/40 border-b border-gray-850 flex justify-between items-center text-xs text-gray-500">
              <span>Total: {messages.length} pesan ({messages.filter(m => !m.isRead).length} baru)</span>
              
              <button
                onClick={onClearAll}
                className="hover:text-rose-400 font-mono text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer"
              >
                Hapus Semua Pesan
              </button>
            </div>
          )}

          {/* Message List */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-xl border transition-all relative group text-left ${
                    msg.isRead
                      ? 'bg-gray-900/15 border-gray-800/50 opacity-75'
                      : 'bg-gradient-to-r from-[#11182c] to-[#0e1322] border-brand-500/20 shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4 mb-2.5">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-bold text-white text-sm">{msg.name}</span>
                        <span className="font-mono text-[10px] text-gray-500">({msg.email})</span>
                      </div>
                      
                      <span className="block font-sans font-semibold text-xs text-brand-300">{msg.subject}</span>
                    </div>

                    {/* Quick message Controls */}
                    <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onToggleRead(msg.id)}
                        className={`p-1.5 rounded hover:bg-gray-800 transition-colors cursor-pointer ${
                          msg.isRead ? 'text-gray-500 hover:text-white' : 'text-brand-400'
                        }`}
                        title={msg.isRead ? 'Tandai Belum Dibaca' : 'Tandai Sudah Dibaca'}
                      >
                        {msg.isRead ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                      </button>
                      
                      <button
                        onClick={() => onDeleteMessage(msg.id)}
                        className="p-1.5 rounded hover:bg-gray-800 text-gray-500 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Hapus Pesan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed bg-[#0a0d18] p-3 rounded-lg border border-gray-800/60 font-sans whitespace-pre-wrap">
                    {msg.message}
                  </p>

                  <div className="mt-2 text-right font-mono text-[9px] text-gray-600">
                    Sistem Log: {new Date(msg.createdAt).toLocaleString('id-ID')}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center border border-gray-800 text-gray-700">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div className="max-w-sm space-y-1">
                  <p className="text-sm font-bold text-gray-300">Belum Ada Pesan Masuk</p>
                  <p className="text-xs text-gray-500 font-sans">
                    Tulis pesan simulasi di formulir bagian **Kontak** paling bawah halaman untuk mencoba mengiriim pesan ke sistem ini!
                  </p>
                </div>
                
                {/* Seed button */}
                <button
                  onClick={() => {
                    onToggleRead('seed'); // Special trigger to seed dummy message in parent
                  }}
                  className="px-4 py-2 bg-gray-900 border border-gray-800 hover:border-gray-700 hover:bg-gray-800 text-xs font-mono font-bold text-gray-400 rounded-lg transition-all cursor-pointer"
                >
                  Tambahkan Contoh Pesan
                </button>
              </div>
            )}
          </div>

          {/* Footer warning */}
          <div className="p-4 bg-gray-950 font-mono text-[9px] text-gray-500 text-center border-t border-gray-805">
            LOGS REAR-TIME • SEMUA DATA DISIMPAN DI LOCAL STORAGE BROWSER (STRATEGI CLIENT PERSISTENCE)
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
