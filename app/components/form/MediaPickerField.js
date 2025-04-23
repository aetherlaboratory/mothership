'use client';

import { useContext } from 'react';
import { useField, useFormikContext } from 'formik';
import { MediaManagerContext } from '@/app/media/MediaManager/MediaManagerProvider';

export default function MediaPickerField({ name, label = 'Media URL', buttonLabel = 'Choose Media' }) {
  const [field, meta] = useField(name);
  const { setFieldValue, values } = useFormikContext();
  const { openModal } = useContext(MediaManagerContext);

  const openPicker = () => {
    openModal((url) => {
      setFieldValue(name, url);
    });
  };

  // Extract the raw field value (safely handles nested keys like 'meta.featured_image')
  const rawName = name.includes('.') ? name.split('.').pop() : name;
  const currentValue = values?.meta?.[rawName] || '';

  return (
    <div className="space-y-1">
      {label && <label className="font-medium">{label}</label>}

      {/* Preview if image URL is present */}
      {currentValue.startsWith('http') && currentValue.match(/\.(jpg|jpeg|png|gif|webp|svg)/i) && (
        <img
          src={currentValue}
          alt="Selected"
          className="rounded w-full max-w-xs mb-2 border"
        />
      )}

      <div className="flex items-center gap-2">
        <input
          type="text"
          {...field}
          value={field.value || ''} // ✅ prevent uncontrolled to controlled error
          className="border p-2 w-full"
          placeholder="https://example.com/media.jpg"
        />
        <button
          type="button"
          onClick={openPicker}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
        >
          {buttonLabel}
        </button>
      </div>

      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm">{meta.error}</div>
      )}
    </div>
  );
}
