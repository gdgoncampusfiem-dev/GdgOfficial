import React, { useState } from 'react';
import Head from 'next/head';
import { AdminProvider, useAdmin } from './AdminContext';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';
import { ToastNotification } from './components/ToastNotification';

// Tabs
import { DashboardTab } from './tabs/DashboardTab';
import { EventsTab } from './tabs/EventsTab';
import { GalleryTab } from './tabs/GalleryTab';
import { TeamTab } from './tabs/TeamTab';
import { DomainsTab } from './tabs/DomainsTab';
import { InquiriesTab } from './tabs/InquiriesTab';
import { StatsTab } from './tabs/StatsTab';
import { AnnouncementsTab } from './tabs/AnnouncementsTab';

// Modals
import { EventModal } from './modals/EventModal';
import { PhotoModal } from './modals/PhotoModal';
import { TeamModal } from './modals/TeamModal';

import { AdminEvent } from './types';
import { GalleryItem } from '@/data/gallery';
import { TeamMember } from '@/data/team';

function AdminMainContent() {
  const { 
    activeTab, 
    addEvent, 
    updateEvent, 
    addPhoto, 
    updatePhoto, 
    addTeamMember, 
    updateTeamMember 
  } = useAdmin();

  // Modal States
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AdminEvent | null>(null);

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<GalleryItem | null>(null);

  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const handleOpenNewEvent = () => {
    setEditingEvent(null);
    setIsEventModalOpen(true);
  };

  const handleEditEvent = (event: AdminEvent) => {
    setEditingEvent(event);
    setIsEventModalOpen(true);
  };

  const handleOpenNewPhoto = () => {
    setEditingPhoto(null);
    setIsPhotoModalOpen(true);
  };

  const handleEditPhoto = (photo: GalleryItem) => {
    setEditingPhoto(photo);
    setIsPhotoModalOpen(true);
  };

  const handleOpenNewMember = () => {
    setEditingMember(null);
    setIsTeamModalOpen(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setIsTeamModalOpen(true);
  };

  const getHeaderAction = () => {
    if (activeTab === 'events') return handleOpenNewEvent;
    if (activeTab === 'gallery') return handleOpenNewPhoto;
    if (activeTab === 'team') return handleOpenNewMember;
    return undefined;
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#111827] font-sans flex antialiased">
      {/* Side Navigation Panel */}
      <AdminSidebar />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#FBFBFA]">
        <AdminHeader onOpenCreateModal={getHeaderAction()} />

        <main className="p-6 md:p-8 flex-1 overflow-y-auto max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardTab
              onOpenEventModal={handleOpenNewEvent}
              onOpenPhotoModal={handleOpenNewPhoto}
              onOpenTeamModal={handleOpenNewMember}
            />
          )}

          {activeTab === 'events' && (
            <EventsTab
              onEditEvent={handleEditEvent}
              onNewEvent={handleOpenNewEvent}
            />
          )}

          {activeTab === 'gallery' && (
            <GalleryTab
              onEditPhoto={handleEditPhoto}
              onNewPhoto={handleOpenNewPhoto}
            />
          )}

          {activeTab === 'team' && (
            <TeamTab
              onEditMember={handleEditMember}
              onNewMember={handleOpenNewMember}
            />
          )}

          {activeTab === 'domains' && <DomainsTab />}

          {activeTab === 'inquiries' && <InquiriesTab />}

          {activeTab === 'stats' && <StatsTab />}

          {activeTab === 'announcements' && <AnnouncementsTab />}
        </main>
      </div>

      {/* Modals */}
      <EventModal
        isOpen={isEventModalOpen}
        eventToEdit={editingEvent}
        onClose={() => setIsEventModalOpen(false)}
        onSave={(data) => {
          if (editingEvent) {
            updateEvent(editingEvent.id, data);
          } else {
            addEvent(data);
          }
        }}
      />

      <PhotoModal
        isOpen={isPhotoModalOpen}
        photoToEdit={editingPhoto}
        onClose={() => setIsPhotoModalOpen(false)}
        onSave={(data) => {
          if (editingPhoto) {
            updatePhoto(editingPhoto.id, data);
          } else {
            addPhoto(data);
          }
        }}
      />

      <TeamModal
        isOpen={isTeamModalOpen}
        memberToEdit={editingMember}
        onClose={() => setIsTeamModalOpen(false)}
        onSave={(data) => {
          if (editingMember) {
            updateTeamMember(editingMember.id, data);
          } else {
            addTeamMember(data);
          }
        }}
      />

      {/* Toast Notification */}
      <ToastNotification />
    </div>
  );
}

export function AdminApp() {
  return (
    <AdminProvider>
      <Head>
        <title>Control Panel | GDG FIEM Admin</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AdminMainContent />
    </AdminProvider>
  );
}
