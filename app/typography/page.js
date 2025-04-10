'use client';

import { useState, useEffect } from 'react';
import useAuthGuard from '../hooks/useAuthGuard';

// ⏳ Tailwind loading spinner component
const Spinner = () => (
  <div className="ml-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
);

const fontCategories = [
  'title', 'paragraph', 'list', 'button', 'toast', 'footer', 'legal'
];

const fontOptions = [
  'Roboto', 'Open Sans', 'Montserrat', 'Lato', 'Playfair Display', 'Poppins', 'CustomFont'
];

export default function TypographyAdminPage() {
  const { user, loading } = useAuthGuard();
  const [fonts, setFonts] = useState({});
  const [isLoading, setIsLoading] = useState({});
  const [appliedFonts, setAppliedFonts] = useState({}); // For confirming computed font values

  // 🧠 Load saved font settings on mount
  useEffect(() => {
    const saved = localStorage.getItem('typography-settings');
    if (saved) {
      try {
        setFonts(JSON.parse(saved));
      } catch (err) {
        console.error('🛑 Failed to parse saved fonts:', err);
      }
    }
  }, []);

  // 📦 Handle font change
  const handleChange = (category, font) => {
    console.log(`📥 Font selected for ${category}:`, font);
    const updated = { ...fonts, [category]: font };
    setFonts(updated);
    setIsLoading((prev) => ({ ...prev, [category]: true }));
    localStorage.setItem('typography-settings', JSON.stringify(updated));

    // ⏳ Simulate async load (fonts load in browser)
    setTimeout(() => {
      setIsLoading((prev) => ({ ...prev, [category]: false }));

      // 👀 Grab applied style from the DOM for confirmation
      const test = document.querySelector(`[data-font-preview="${category}"]`);
      if (test) {
        const computed = getComputedStyle(test).fontFamily;
        console.log(`✅ Computed font for ${category}:`, computed);
        setAppliedFonts((prev) => ({ ...prev, [category]: computed }));
      } else {
        console.warn(`⚠️ Preview element not found for ${category}`);
      }
    }, 600); // mimic font loading delay
  };

  if (loading) return null;

  const allowedRoles = ['administrator', 'admin'];
  const userRoles = user?.roles?.map((r) => r.toLowerCase?.()) || [];
  const isAllowed = userRoles.some((role) => allowedRoles.includes(role));

  if (!isAllowed) {
    return (
      <div className="text-center py-10 text-lg text-red-600">
        ❌ You do not have permission to view this page.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🎨 Typography Settings</h1>

      <div className="flex flex-col-reverse md:flex-row gap-6">
        {/* 👁️ Preview Section */}
        <div className="w-full md:w-1/2 p-4 bg-gray-100 rounded order-1 md:order-2">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ fontFamily: fonts.title }}
            data-font-preview="title"
          >
            🔍 Live Preview
          </h2>

          <p style={{ fontFamily: fonts.paragraph }} data-font-preview="paragraph">
            This preview shows how your{' '}
            <strong style={{ fontFamily: fonts.title }}>title</strong> and paragraph fonts apply
            around the button.
          </p>

          <button
            style={{ fontFamily: fonts.button }}
            data-font-preview="button"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Button preview
          </button>

          {/* 🔔 Notification Preview Button */}
          <div className="mt-6">
            <label className="block font-semibold mb-1">Toast Preview</label>
            <button
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent('notify', {
                    detail: {
                      message: '🔤 This is a preview notification font!',
                      type: 'info',
                    },
                  })
                );
              }}
              data-font-preview="toast"
              className="px-4 py-2 bg-indigo-600 text-white rounded"
              style={{ fontFamily: fonts.toast }}
            >
              🔔 Test Notification Font
              {isLoading.toast && <Spinner />}
            </button>
          </div>
        </div>

        {/* 🎛️ Font Selectors */}
        <div className="w-full md:w-1/2 space-y-4 order-2 md:order-1">
          {fontCategories.map((category) => (
            <div key={category}>
              <label className="block font-semibold capitalize mb-1">
                {category} font
              </label>
              <select
                className="border px-3 py-2 rounded w-full"
                value={fonts[category] || ''}
                onChange={(e) => handleChange(category, e.target.value)}
              >
                <option value="">Select a font</option>
                {fontOptions.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>

              {/* ⏳ Spinner next to field */}
              {isLoading[category] && (
                <div className="text-sm text-gray-500 mt-1 flex items-center">
                  Applying font... <Spinner />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
