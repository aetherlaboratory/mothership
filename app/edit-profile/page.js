'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAuthGuard from '../hooks/useAuthGuard';
import { uploadProfilePicture } from '../utils/api'; // ✅ make sure this is imported
import { updateProfile } from '../utils/api';
import LogoutButton from '../components/LogoutButton';

const EditProfilePage = () => {
  const { user, loading } = useAuthGuard();
  const [imagePreview, setImagePreview] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [imageUploading, setImageUploading] = useState(false); // ✅ add this
  const [formSaving, setFormSaving] = useState(false); // ✅ add this
  const fileInputRef = useRef();
  
  useEffect(() => {
    if (user?.custom_profile_image) {
      setImagePreview(user.custom_profile_image);
    }
  }, [user]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    setImageUploading(true);
  
    const uploadedImageUrl = await uploadProfilePicture(file);
  
    if (uploadedImageUrl) {
      setImagePreview(uploadedImageUrl);
      setProfileImage(uploadedImageUrl);
  
      window.dispatchEvent(
        new CustomEvent("notify", {
          detail: {
            message: `📷 Profile picture uploaded successfully.`,
            type: "success",
          },
        })
      );
    } else {
      window.dispatchEvent(
        new CustomEvent("notify", {
          detail: {
            message: `❌ Failed to upload profile picture.`,
            type: "error",
          },
        })
      );
    }
  
    setImageUploading(false);
  };
  

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      nickname: user?.nickname || '',
      email: user?.email || '',
      phone: user?.billing_phone || '',
      website: user?.user_website || user?.url || '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('Required'),
      last_name: Yup.string().required('Required'),
      nickname: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      phone: Yup.string().matches(/^[0-9]+$/, 'Must be only digits'),
      website: Yup.string().url('Invalid URL'),
    }),
    onSubmit: async (values) => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        console.error("❌ No user token found.");
        return;
      }
    
      setFormSaving(true);
    
      const updateData = {
        first_name: values.first_name,
        last_name: values.last_name,
        nickname: values.nickname,
        email: values.email,
        billing_phone: values.phone,
        user_website: values.website,
        custom_profile_image: profileImage || user?.custom_profile_image || null,
      };
    
      const result = await updateProfile(token, updateData);
    
      if (result) {
        console.log("✅ Profile Updated Successfully:", result);
        window.dispatchEvent(
          new CustomEvent("notify", {
            detail: {
              message: `✅ Profile saved successfully.`,
              type: "success",
            },
          })
        );
      } else {
        window.dispatchEvent(
          new CustomEvent("notify", {
            detail: {
              message: `❌ Failed to save profile.`,
              type: "error",
            },
          })
        );
      }
    
      setFormSaving(false);
    }
    ,
  });

  if (loading || !user) {
    return <p className="text-center text-lg">🔄 Loading profile...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Profile</h2>

      <div className="mb-6 text-center relative">
  <div className="relative w-32 h-32 mx-auto">
    {/* Circular border ring when uploading */}
    {imageUploading && (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full rounded-full border-4 border-blue-400 animate-spin-slow" />
      </div>
    )}

    {/* Profile Image or Placeholder */}
    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 relative z-10">
      {imagePreview ? (
        <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}
    </div>
  </div>

  {/* File Upload */}
  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    ref={fileInputRef}
    className="hidden"
  />
  <button
    type="button"
    onClick={() => fileInputRef.current.click()}
    className="mt-2 px-4 py-1 border rounded text-sm bg-blue-100 hover:bg-blue-200"
    disabled={imageUploading}
  >
    {imageUploading ? "Uploading..." : "Upload Image"}
  </button>
</div>


      {/* 📝 Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block font-medium">First Name</label>
          <input
            type="text"
            {...formik.getFieldProps('first_name')}
            className="w-full p-2 border rounded"
          />
          {formik.touched.first_name && formik.errors.first_name && (
            <p className="text-red-500 text-sm">{formik.errors.first_name}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-medium">Last Name</label>
          <input
            type="text"
            {...formik.getFieldProps('last_name')}
            className="w-full p-2 border rounded"
          />
          {formik.touched.last_name && formik.errors.last_name && (
            <p className="text-red-500 text-sm">{formik.errors.last_name}</p>
          )}
        </div>

        {/* Nickname */}
        <div>
          <label className="block font-medium">Nickname</label>
          <input
            type="text"
            {...formik.getFieldProps('nickname')}
            className="w-full p-2 border rounded"
          />
          {formik.touched.nickname && formik.errors.nickname && (
            <p className="text-red-500 text-sm">{formik.errors.nickname}</p>
          )}
        </div>

        {/* Email (disabled) */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            {...formik.getFieldProps('email')}
            className="w-full p-2 border rounded"
            disabled
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            {...formik.getFieldProps('phone')}
            className="w-full p-2 border rounded"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-sm">{formik.errors.phone}</p>
          )}
        </div>

        {/* Website */}
        <div>
          <label className="block font-medium">Website</label>
          <input
            type="text"
            {...formik.getFieldProps('website')}
            className="w-full p-2 border rounded"
          />
          {formik.touched.website && formik.errors.website && (
            <p className="text-red-500 text-sm">{formik.errors.website}</p>
          )}
        </div>

        <button
  type="submit"
  disabled={formSaving}
  className={`w-1/2 block mx-auto p-2 rounded text-white ${
    formSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
  }`}
>
  {formSaving ? 'Saving...' : 'Save Changes'}
</button>

      </form>
<div className='flex flex-wrap justify-center'>
      <LogoutButton />
      </div>
    </div>
  );
};

export default EditProfilePage;
