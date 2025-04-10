"use client";

import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";

const ECommerceTab = () => {
  const [preview, setPreview] = useState(null);
  const [initialValues, setInitialValues] = useState({ cashtag: "", qrImage: null });

  // ⏬ Load saved data on mount
  useEffect(() => {
    const savedTag = localStorage.getItem("cashtag") || "";
    const savedQR = localStorage.getItem("qrPreviewURL") || null;

    setInitialValues({ cashtag: savedTag, qrImage: null });

    if (savedQR) {
      setPreview(savedQR);
    }
  }, []);

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue("qrImage", file);

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ⏳ Don’t render form until we’ve loaded initialValues
  if (initialValues.cashtag === "" && preview === null) {
    return <p className="text-center text-gray-500">🔄 Loading settings...</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">💸 Cash App Settings</h3>

      <Formik
        enableReinitialize // ⬅️ This is KEY to allow rehydrating form
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log("✅ Saving Cash App settings:", values);

          localStorage.setItem("cashtag", values.cashtag);
          if (preview) {
            localStorage.setItem("qrPreviewURL", preview);
          }

          window.dispatchEvent(new CustomEvent("notify", {
            detail: { message: "✅ Cash App settings saved", type: "success" }
          }));
        }}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-6">
            {/* $Cashtag input */}
            <div>
              <label className="block font-medium mb-1">Your $Cashtag</label>
              <Field
                type="text"
                name="cashtag"
                className="w-full border p-2 rounded"
                placeholder="$yourcashtag"
              />
            </div>

            {/* QR Code Image Upload */}
            <div>
              <label className="block font-medium mb-1">Upload QR Code</label>

              <div className="flex items-center space-x-4">
                <label
                  htmlFor="qrImageUpload"
                  className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded border border-gray-300 shadow-sm"
                >
                  📤 Choose Image
                </label>

                <span className="text-sm text-gray-500">
                  {preview ? "Image selected" : "No file chosen"}
                </span>
              </div>

              <input
                id="qrImageUpload"
                name="qrImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, setFieldValue)}
              />

              {preview && (
                <img
                  src={preview}
                  alt="QR Preview"
                  className="mt-4 w-40 h-40 rounded border shadow-sm"
                />
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              💾 Save Settings
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ECommerceTab;
