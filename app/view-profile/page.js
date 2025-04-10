'use client';

import { useEffect, useState } from 'react';
import { Mail, Phone, Globe, Contact, UserRound, AlignLeft } from 'lucide-react';
import useAuthGuard from '../hooks/useAuthGuard';

const ViewProfilePage = () => {
  const { user, loading } = useAuthGuard();
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (user?.custom_profile_image) {
      setProfileImage(user.custom_profile_image);
    }
  }, [user]);

  if (loading || !user) {
    return <p className="text-center text-lg">🔄 Loading profile...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white space-y-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Your Profile</h2>

      {/* 🖼️ Profile Picture */}
      <div className="text-center">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-blue-300 shadow"
          />
        ) : (
          <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* 🧾 Profile Info */}
      <div className="space-y-4 text-gray-800">
        <div className="flex items-center gap-3">
          <UserRound size={20} />
          <span className="font-medium">{user.first_name} {user.last_name}</span>
        </div>

        <div className="flex items-center gap-3">
          <Contact size={20} />
          <span>{user.nickname || '—'}</span>
        </div>

        <div className="flex items-center gap-3">
          <Mail size={20} />
          <span>{user.email || '—'}</span>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={20} />
          <span>{user.billing_phone || '—'}</span>
        </div>

        <div className="flex items-center gap-3">
          <Globe size={20} />
          {user.user_website || user.url ? (
            <a
              href={user.user_website || user.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {user.user_website || user.url}
            </a>
          ) : (
            <span>—</span>
          )}
        </div>

        <div className="flex items-start gap-3">
          <AlignLeft size={20} className="mt-1" />
          <p className="text-sm text-gray-700">{user.description || 'No bio provided.'}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewProfilePage;
