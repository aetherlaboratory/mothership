// app/crud/page.js
'use client';

import { useState } from 'react';
import useAuthGuard from '../hooks/useAuthGuard'; // 🪝 Auth wrapper

import Blog, { meta as blogMeta } from './blog';
import Artwork, { meta as artworkMeta } from './artwork';
import Photography, { meta as photographyMeta } from './photography';
import Audio, { meta as audioMeta } from './audio';
import Video, { meta as videoMeta } from './Videos';
import Models3D, { meta as models3dMeta } from './Models3D';
import Event, { meta as eventMeta } from './Events';

import PostList from './PostList';
import PostEditor from './PostEditor';

// 🧩 Tab definitions
const tabs = [
  { name: 'Blog', key: 'blog', component: Blog, meta: blogMeta },
  { name: 'Artwork', key: 'artwork', component: Artwork, meta: artworkMeta },
  { name: 'Photography', key: 'photography', component: photographyMeta },
  { name: 'Audio', key: 'audio', component: audioMeta },
  { name: 'Video', key: 'video', component: Video, meta: videoMeta },
  { name: '3D Models', key: 'models3d', component: Models3D, meta: models3dMeta },
  { name: 'Event', key: 'event', component: Event, meta: eventMeta }
];

export default function CrudPage() {
  const { user, loading } = useAuthGuard(); // 🔐 Auth protection
  const [activeTab, setActiveTab] = useState('blog');
  const [selectedItem, setSelectedItem] = useState(null); // { id, source }

  if (loading) return null; // ⏳ Wait for auth before showing anything

  const { component: ActiveComponent, meta } = tabs.find(t => t.key === activeTab);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">CRUD Manager</h1>

      {/* 🔄 Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setSelectedItem(null); // 🧼 Clear selection on tab switch
            }}
            className={`px-4 py-2 border rounded ${
              activeTab === tab.key ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        {/* 📄 Sidebar: Post List */}
        <div className="w-64 max-h-[80vh] overflow-y-auto border rounded bg-white shadow">
          <PostList
            meta={meta}
            onSelect={setSelectedItem}
            selectedId={selectedItem?.id}
          />
        </div>

        {/* ✍️ Right: Editor or Tab Component */}
        <div className="flex-1 p-4 border rounded bg-white shadow max-h-[80vh] overflow-y-auto">
          {selectedItem ? (
            <PostEditor
              postId={selectedItem.id}
              source={selectedItem.source}
              slug={meta.slug}
            />
          ) : (
            <ActiveComponent />
          )}
        </div>
      </div>
    </div>
  );
}
