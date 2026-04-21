import React, { useState } from 'react';
import { Search, Filter, ShieldCheck, ShieldAlert, Trash2, Eye, Shield, Calendar, Mail, MapPin, Phone } from 'lucide-react';
import { DataTable } from '../../ui/DataTable';
import { Modal } from '../../ui/Modal';

const AdminRegisters = ({ usersData, isUsersLoading, updateUserStatus, approveSeller, deleteUserMutation, viewRole }) => {
  const [userSearch, setUserSearch] = useState('');
  const [viewingUser, setViewingUser] = useState(null);

  const filteredData = usersData?.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = viewRole ? u.role === viewRole : true;
    return matchesSearch && matchesRole;
  }) || [];

  return (
    <div className="space-y-12 pb-20 animate-in fade-in slide-in-from-right duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-xl font-bold text-[var(--admin-text-primary)] tracking-wider uppercase opacity-90">
                {viewRole === 'seller' ? 'Seller Registry' : 'User Registry'}
            </h3>
            <p className="text-[9px] text-[var(--admin-text-secondary)] font-bold uppercase tracking-[0.2em] mt-2">
                Manage {filteredData.length} active {viewRole === 'seller' ? 'market partners' : 'neural links'}
            </p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
              <div className="relative group flex-1 md:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--admin-text-secondary)] group-focus-within:text-[var(--admin-accent)] transition-colors" size={12} />
                  <input 
                    placeholder="Identify user..." 
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="w-full glass-panel rounded-xl px-12 py-3 text-[11px] outline-none focus:border-[var(--admin-accent)]/40 text-[var(--admin-text-primary)]" 
                  />
              </div>
          </div>
      </div>

      {isUsersLoading ? (
        <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[var(--admin-accent)]"></div></div>
      ) : (
        <div className="glass-card !p-0 overflow-hidden">
          <DataTable 
            data={filteredData}
            columns={[
              { accessorKey: 'name', header: 'Identity', cell: info => (
                  <div className="flex items-center gap-4 py-3 ml-4">
                      <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center overflow-hidden">
                          <span className="text-[var(--admin-accent)] font-bold">{info.getValue()?.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-[var(--admin-text-primary)] font-bold text-[11px]">{info.getValue()}</p>
                        <p className="text-[9px] text-[var(--admin-text-secondary)] font-bold uppercase tracking-widest">{info.row.original.role}</p>
                      </div>
                  </div>
              )},
              { accessorKey: 'email', header: 'Comms', cell: info => <span className="text-[var(--admin-text-secondary)] font-medium text-[11px]">{info.getValue()}</span> },
              { accessorKey: 'status', header: 'State', cell: info => (
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase border ${
                    info.getValue() === 'Active' 
                      ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' 
                      : 'text-rose-500 bg-rose-500/10 border-rose-500/30'
                  }`}>
                      {info.getValue()}
                  </span>
              )},
              { id: 'actions', header: 'Protocols', cell: (info) => (
                  <div className="flex gap-4 pr-4">
                      <button 
                        onClick={() => setViewingUser(info.row.original)}
                        title="Deep Scan"
                        className="p-2 rounded-lg border border-[var(--admin-panel-border)] text-[var(--admin-text-secondary)] hover:text-[var(--admin-accent)] hover:border-[var(--admin-accent)]/30 transition-all"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => updateUserStatus.mutate({ id: info.row.original._id, status: info.row.original.status === 'Active' ? 'Blocked' : 'Active' })}
                        title={info.row.original.status === 'Active' ? 'Excommunicate' : 'Reactivate'}
                        className={`p-2 rounded-lg border transition-all ${
                          info.row.original.status === 'Active' 
                            ? 'text-rose-500 border-rose-500/20 hover:bg-rose-500 hover:text-white' 
                            : 'text-emerald-500 border-emerald-500/20 hover:bg-emerald-500 hover:text-white'
                        }`}
                      >
                        {info.row.original.status === 'Active' ? <ShieldAlert size={16} /> : <ShieldCheck size={16} />}
                      </button>
                      {info.row.original.role === 'seller' && !info.row.original.isApproved && (
                        <button 
                          onClick={() => approveSeller.mutate(info.row.original._id)}
                          className="px-4 py-2 bg-[var(--admin-accent)]/10 text-[var(--admin-accent)] border border-[var(--admin-accent)]/20 rounded-lg text-[9px] font-bold uppercase hover:bg-[var(--admin-accent)] hover:text-black transition-all"
                        >
                          Verify Shop
                        </button>
                      )}
                      <button 
                        onClick={() => { if(window.confirm('Erase this signature?')) deleteUserMutation.mutate(info.row.original._id); }}
                        className="p-2 text-[var(--admin-text-secondary)] hover:text-rose-500 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                  </div>
              )}
            ]}
          />
        </div>
      )}
      {/* Deep Scan Modal */}
      <Modal
        isOpen={!!viewingUser}
        onClose={() => setViewingUser(null)}
        title="Neural Trace: User Identity Details"
        maxWidth="max-w-4xl"
      >
        {viewingUser && (
          <div className="space-y-8 py-4">
            {/* Header Profile */}
            <div className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-[var(--admin-panel-border)]">
              <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-[var(--admin-accent)] to-[#8c440a] p-1 shadow-2xl">
                <div className="h-full w-full rounded-[22px] bg-[var(--admin-panel)] flex items-center justify-center text-3xl font-serif text-[var(--admin-accent)]">
                  {viewingUser.name?.charAt(0)}
                </div>
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 className="text-3xl font-serif font-bold text-[var(--admin-text-primary)] mb-1">{viewingUser.name}</h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 items-center mt-3">
                  <span className="px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[var(--admin-accent)] text-black">
                    {viewingUser.role}
                  </span>
                  <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[var(--admin-panel-border)] ${viewingUser.status === 'active' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {viewingUser.status}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--admin-text-secondary)] opacity-60">
                    ID: {viewingUser._id}
                  </span>
                </div>
              </div>
            </div>

            {/* Matrix Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Primary Comms */}
              <div className="space-y-6">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--admin-accent)]">Security & Comms</h4>
                <div className="glass-panel !bg-transparent rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="text-[var(--admin-text-secondary)]" size={16} />
                    <div>
                      <p className="text-[9px] uppercase font-bold text-[var(--admin-text-secondary)] opacity-60">Primary Email</p>
                      <p className="text-sm font-medium text-[var(--admin-text-primary)]">{viewingUser.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Shield className="text-[var(--admin-text-secondary)]" size={16} />
                    <div>
                      <p className="text-[9px] uppercase font-bold text-[var(--admin-text-secondary)] opacity-60">Verification State</p>
                      <p className={`text-sm font-bold ${viewingUser.isEmailVerified ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {viewingUser.isEmailVerified ? 'Verified Nexus' : 'Unverified Identity'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="text-[var(--admin-text-secondary)]" size={16} />
                    <div>
                      <p className="text-[9px] uppercase font-bold text-[var(--admin-text-secondary)] opacity-60">Phone Terminal</p>
                      <p className="text-sm font-medium text-[var(--admin-text-primary)]">{viewingUser.phone || 'NO TERMINAL LINKED'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Physical & Timeline */}
              <div className="space-y-6">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--admin-accent)]">Demometrics & Timeline</h4>
                <div className="glass-panel !bg-transparent rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <MapPin className="text-[var(--admin-text-secondary)]" size={16} />
                    <div>
                      <p className="text-[9px] uppercase font-bold text-[var(--admin-text-secondary)] opacity-60">Physical Address</p>
                      <p className="text-sm font-medium text-[var(--admin-text-primary)]">{viewingUser.address || 'NO PHYSICAL DATA'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Calendar className="text-[var(--admin-text-secondary)]" size={16} />
                    <div>
                      <p className="text-[9px] uppercase font-bold text-[var(--admin-text-secondary)] opacity-60">Origin Date</p>
                      <p className="text-sm font-medium text-[var(--admin-text-primary)]">
                        {new Date(viewingUser.created_at?.$date || viewingUser.created_at).toLocaleString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions for this user */}
            <div className="pt-8 mt-8 border-t border-[var(--admin-panel-border)] flex justify-end gap-4">
                <button 
                  onClick={() => setViewingUser(null)}
                  className="px-8 py-3 rounded-xl border border-[var(--admin-panel-border)] text-[10px] font-bold uppercase tracking-widest text-[var(--admin-text-secondary)] hover:bg-[var(--admin-text-primary)]/[0.05] transition-all"
                >
                  Close Trace
                </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminRegisters;
