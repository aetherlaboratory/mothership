'use client';

import { useContext } from 'react';
import { useFormikContext } from 'formik';
import { MediaManagerContext } from '@/app/media/MediaManager/MediaManagerProvider';
import { Trash2 } from 'lucide-react';

export default function GalleryPickerField({ name, label = 'Image Gallery', buttonLabel = 'Add Images' }) {
  const { values, setFieldValue } = useFormikContext();
  const { openModal } = useContext(MediaManagerContext);

  const current = values?.meta?.[name] || [];

  const handleAddImage = () => {
    openModal((url) => {
      const updated = Array.isArray(current) ? [...current, url] : [url];
      setFieldValue(`meta.${name}`, updated);
    });
  };

  const removeImage = (index) => {
    const updated = current.filter((_, i) => i !== index);
    setFieldValue(`meta.${name}`, updated);
  };

  return (
    <div className="space-y-1">
      <label className="font-medium">{label}</label>

      <div className="flex flex-wrap gap-3 mb-2">
        {current?.map((url, index) => (
          <div key={index} className="relative w-24 h-24 border rounded overflow-hidden group">
            <img src={url} alt="" className="object-cover w-full h-full" />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddImage}
        className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
      >
        {buttonLabel}
      </button>
    </div>
  );
}
