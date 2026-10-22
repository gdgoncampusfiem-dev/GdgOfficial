import React, { useState } from 'react';
import { useAdmin } from '../AdminContext';
import { AdminStat } from '../types';

export function StatsTab() {
  const { stats, updateStat } = useAdmin();
  const [editingStatId, setEditingStatId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [editLabel, setEditLabel] = useState('');
  const [editNote, setEditNote] = useState('');

  const startEdit = (stat: AdminStat) => {
    setEditingStatId(stat.id);
    setEditValue(stat.value);
    setEditLabel(stat.label);
    setEditNote(stat.verificationNote);
  };

  const handleSave = (id: string) => {
    updateStat(id, {
      value: editValue,
      label: editLabel,
      verificationNote: editNote
    });
    setEditingStatId(null);
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat) => {
          const isEditing = editingStatId === stat.id;
          return (
            <div
              key={stat.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-xs uppercase text-gray-400 block mb-1 font-sans">
                  Key: {stat.key}
                </span>

                {isEditing ? (
                  <div className="space-y-2 font-sans">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      placeholder="e.g. 2,500+"
                      className="w-full bg-gray-50 border border-gray-300 rounded px-2.5 py-1 text-sm font-bold text-black font-sans focus:bg-white"
                    />
                    <input
                      type="text"
                      value={editLabel}
                      onChange={(e) => setEditLabel(e.target.value)}
                      placeholder="Label"
                      className="w-full bg-gray-50 border border-gray-300 rounded px-2.5 py-1 text-xs text-gray-900 font-sans focus:bg-white"
                    />
                    <textarea
                      rows={2}
                      value={editNote}
                      onChange={(e) => setEditNote(e.target.value)}
                      placeholder="Verification source proof"
                      className="w-full bg-gray-50 border border-gray-300 rounded p-2 text-xs text-gray-900 font-sans focus:bg-white"
                    />
                  </div>
                ) : (
                  <div>
                    <div 
                      className="text-3xl font-bold text-black font-sans mb-0.5"
                      style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold text-gray-900 uppercase font-sans">
                      {stat.label}
                    </div>
                    <p className="text-xs text-gray-500 mt-2 font-sans">
                      Proof: {stat.verificationNote}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-end font-sans">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingStatId(null)}
                      className="text-xs text-gray-400 hover:text-black transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave(stat.id)}
                      className="px-2.5 py-1 bg-black text-white rounded text-xs font-semibold shadow-sm"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEdit(stat)}
                    className="text-xs text-gray-600 hover:text-black font-medium transition-colors"
                  >
                    Edit Number & Proof →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
