import React, { useState } from 'react';
import { 
  Building2, 
  Trash2, 
  Send 
} from 'lucide-react';
import { useAdmin } from '../AdminContext';
import { AdminInquiry, InquiryStatus } from '../types';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';

export function InquiriesTab() {
  const { 
    inquiries, 
    updateInquiryStatus, 
    updateInquiryNote, 
    deleteInquiry, 
    searchQuery 
  } = useAdmin();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [inquiryToDelete, setInquiryToDelete] = useState<AdminInquiry | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch = 
      inq.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.tierInterest && inq.tierInterest.toLowerCase().includes(searchQuery.toLowerCase())) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStartNote = (inq: AdminInquiry) => {
    setEditingNoteId(inq.id);
    setTempNote(inq.internalNote || '');
  };

  const handleSaveNote = (id: string) => {
    updateInquiryNote(id, tempNote);
    setEditingNoteId(null);
  };

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          {['all', 'NEW', 'UNDER_REVIEW', 'CONTACTED', 'CONFIRMED', 'DECLINED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-lg text-xs uppercase font-mono transition-colors ${
                statusFilter === st
                  ? 'bg-black text-white font-semibold'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-gray-400">{filteredInquiries.length} inquiries</span>
      </div>

      {/* Inquiries List */}
      {filteredInquiries.length === 0 ? (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <p className="text-xs text-gray-500">No inquiries found.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-150 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          {filteredInquiries.map((inq) => (
            <div key={inq.id} className="p-4 space-y-3 hover:bg-gray-50/60 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 tracking-tight">{inq.companyName}</h4>
                    <p className="text-[11px] text-gray-500">{inq.contactName} • {inq.email} {inq.phone && `• ${inq.phone}`}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={inq.status}
                    onChange={(e) => updateInquiryStatus(inq.id, e.target.value as InquiryStatus)}
                    className="bg-white border border-gray-200 text-gray-800 text-xs rounded-lg px-2.5 py-1 focus:outline-none font-mono"
                  >
                    <option value="NEW">New</option>
                    <option value="UNDER_REVIEW">Under Review</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="DECLINED">Declined</option>
                  </select>

                  <a
                    href={`mailto:${inq.email}?subject=GDG FIEM Partnership — ${inq.companyName}`}
                    className="p-1.5 text-gray-500 hover:text-black rounded-lg border border-gray-200 hover:bg-gray-50"
                    title="Send Email"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setInquiryToDelete(inq)}
                    className="p-1.5 text-red-500 hover:text-red-700 rounded-lg border border-red-200 hover:bg-red-50"
                    title="Archive"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="text-xs text-gray-700 font-sans bg-gray-50 p-3 rounded-lg border border-gray-200 leading-relaxed">
                "{inq.message}"
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
                <span>Tier Interest: <span className="text-gray-800 font-semibold">{inq.tierInterest}</span></span>
                {editingNoteId === inq.id ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={tempNote}
                      onChange={(e) => setTempNote(e.target.value)}
                      placeholder="Add note..."
                      className="bg-white border border-gray-300 rounded px-2 py-0.5 text-xs text-gray-900"
                    />
                    <button onClick={() => handleSaveNote(inq.id)} className="text-gray-900 font-semibold underline">Save</button>
                    <button onClick={() => setEditingNoteId(null)} className="text-gray-400">Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => handleStartNote(inq)} className="text-gray-500 hover:text-black underline">
                    Note: {inq.internalNote || 'Add internal note'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(inquiryToDelete)}
        title="Archive Inquiry"
        itemName={inquiryToDelete?.companyName || ''}
        onCancel={() => setInquiryToDelete(null)}
        onConfirm={() => {
          if (inquiryToDelete) {
            deleteInquiry(inquiryToDelete.id);
            setInquiryToDelete(null);
          }
        }}
      />
    </div>
  );
}
