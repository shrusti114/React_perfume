import React, { useState } from 'react';
import { MessageSquare, Sparkles, Send, Trash2 } from 'lucide-react';
import { DataTable } from '../../ui/DataTable';
import { Modal } from '../../ui/Modal';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/Button';

const AdminSupport = ({ feedbackData, isFeedbackLoading, deleteFeedback, sendNotification }) => {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  return (
    <div className="space-y-12 pb-20 animate-in zoom-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-xl font-bold text-[var(--admin-text-primary)] tracking-wider uppercase opacity-90">Client Relations</h3>
            <p className="text-[9px] text-[var(--admin-text-secondary)] font-bold uppercase tracking-[0.2em] mt-2">Oversee communication stream and broadcast intelligence</p>
          </div>
          <Button 
            onClick={() => setIsNoteModalOpen(true)}
            className="bg-[var(--admin-accent)] text-black h-12 px-8 rounded-xl flex items-center gap-3 hover:scale-105 transition-all"
          >
              <Send size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Global Broadcast</span>
          </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3 space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--admin-accent)] ml-2">Communication Stream</h4>
              {isFeedbackLoading ? (
                 <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[var(--admin-accent)]"></div></div>
              ) : (
                feedbackData?.map((f, i) => (
                    <div key={i} className="glass-card !p-6 flex gap-6 items-start group hover:border-[var(--admin-accent)]/20 transition-all">
                        <div className="h-10 w-10 bg-[var(--admin-text-primary)]/[0.05] rounded-2xl flex items-center justify-center text-[var(--admin-accent)] group-hover:bg-[var(--admin-accent)] group-hover:text-black transition-all">
                            <MessageSquare size={16} />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h5 className="text-[var(--admin-text-primary)] font-bold text-[13px]">{f.product_id?.name || f.subject || 'Platform Inquiry'}</h5>
                                    <p className="text-[9px] text-[var(--admin-text-secondary)] font-bold uppercase">{f.user_id?.name || 'Anonymous'} ({f.user_id?.email || 'N/A'})</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[9px] text-[var(--admin-text-secondary)] font-bold uppercase">{new Date(f.createdAt).toLocaleDateString()}</span>
                                    <button onClick={() => deleteFeedback.mutate(f._id)} className="text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14}/></button>
                                </div>
                            </div>
                            <p className="text-[11px] text-[var(--admin-text-secondary)] leading-relaxed max-w-xl">{f.comment}</p>
                        </div>
                    </div>
                ))
              )}
          </div>

      </div>

      <Modal 
        isOpen={isNoteModalOpen} 
        onClose={() => setIsNoteModalOpen(false)}
        title="Protocol Global Broadcast"
      >
        <form className="space-y-6" onSubmit={(e) => {
          e.preventDefault();
          const target = new FormData(e.target).get('target');
          const message = new FormData(e.target).get('message');
          sendNotification.mutate({ target, message }, { onSuccess: () => setIsNoteModalOpen(false) });
        }}>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--admin-text-secondary)]">Target Audience</label>
            <select name="target" className="w-full glass-panel rounded-xl px-4 py-3 text-[11px] text-[var(--admin-text-primary)] outline-none">
              <option value="all" className="bg-[var(--admin-panel)]">All Channels</option>
              <option value="sellers" className="bg-[var(--admin-panel)]">Sellers Only</option>
              <option value="users" className="bg-[var(--admin-panel)]">Customers Only</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--admin-text-secondary)]">Broadcast Message</label>
            <Textarea name="message" className="glass-panel h-32 text-[var(--admin-text-primary)]" required placeholder="Initiating sequence..."/>
          </div>
          <div className="flex justify-end pt-4">
              <Button type="submit" className="px-10 bg-[var(--admin-accent)] text-black font-bold">Deploy Broadcast</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminSupport;
