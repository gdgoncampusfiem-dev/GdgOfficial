import React, { useState } from 'react';
import { Plus, X, Check, Edit2 } from 'lucide-react';
import { useAdmin } from '../AdminContext';
import { AdminDomain } from '../types';

export function DomainsTab() {
  const { domains, updateDomain, triggerToast } = useAdmin();
  const [editingDomainId, setEditingDomainId] = useState<string | null>(null);
  const [editDesc, setEditDesc] = useState('');
  const [editLead, setEditLead] = useState('');
  const [newTagInput, setNewTagInput] = useState('');

  const startEditing = (d: AdminDomain) => {
    setEditingDomainId(d.id);
    setEditDesc(d.description);
    setEditLead(d.leadName || '');
  };

  const saveEditing = (domainId: string) => {
    updateDomain(domainId, {
      description: editDesc,
      leadName: editLead
    });
    setEditingDomainId(null);
  };

  const addTag = (domain: AdminDomain) => {
    if (!newTagInput.trim()) return;
    if (domain.technologies.includes(newTagInput.trim())) return;

    updateDomain(domain.id, {
      technologies: [...domain.technologies, newTagInput.trim()]
    });
    setNewTagInput('');
    triggerToast(`Added tag "${newTagInput.trim()}"`);
  };

  const removeTag = (domain: AdminDomain, tagToRemove: string) => {
    updateDomain(domain.id, {
      technologies: domain.technologies.filter(t => t !== tagToRemove)
    });
    triggerToast(`Removed tag "${tagToRemove}"`);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {domains.map((domain) => {
          const isEditing = editingDomainId === domain.id;
          return (
            <div
              key={domain.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-gray-400">
                      Track {domain.index}
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 tracking-tight">
                      {domain.name}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-gray-400">{domain.watermark}</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-gray-400 block mb-0.5">
                    Lead
                  </span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editLead}
                      onChange={(e) => setEditLead(e.target.value)}
                      placeholder="Domain Lead Name"
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-1 text-xs text-gray-900 focus:outline-none focus:bg-white"
                    />
                  ) : (
                    <p className="text-xs text-gray-800 font-semibold">
                      {domain.leadName || 'Unassigned'}
                    </p>
                  )}
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-gray-400 block mb-0.5">
                    Description
                  </span>
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-xs text-gray-900 focus:outline-none focus:bg-white font-sans"
                    />
                  ) : (
                    <p className="text-xs text-gray-600 leading-relaxed font-sans">
                      {domain.description}
                    </p>
                  )}
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-gray-400 block mb-1.5">
                    Focus Areas / Stack
                  </span>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {domain.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-gray-100 border border-gray-200 text-gray-700"
                      >
                        <span>{tech}</span>
                        <button
                          onClick={() => removeTag(domain, tech)}
                          className="hover:text-red-500"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      placeholder="Add tag..."
                      value={editingDomainId === domain.id ? newTagInput : ''}
                      onFocus={() => setEditingDomainId(domain.id)}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag(domain);
                        }
                      }}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-xs text-gray-900 focus:outline-none focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => addTag(domain)}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-black hover:text-white text-gray-700 rounded-lg text-xs font-mono transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingDomainId(null)}
                      className="text-xs text-gray-500 hover:text-black"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => saveEditing(domain.id)}
                      className="px-3 py-1 bg-black text-white rounded-lg text-xs font-semibold uppercase font-mono"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEditing(domain)}
                    className="text-xs text-gray-500 hover:text-black flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" /> Edit Track
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
