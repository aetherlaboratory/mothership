'use client';

import { useEffect, useState } from 'react';
import { fetchDownloadableProducts } from '../lib/downloads';

const DownloadsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDownloads = async () => {
      try {
        const data = await fetchDownloadableProducts();
        setProducts(data);
      } catch (err) {
        console.error("❌ Error loading downloads:", err);
        setError("Failed to load downloadable products.");
      } finally {
        setLoading(false);
      }
    };

    loadDownloads();
  }, []);

  const handleDownload = async (productId) => {
    try {
      const res = await fetch(`/api/downloads/${productId}`);
      const data = await res.json();

      if (res.ok && data.downloads?.length > 0) {
        window.open(data.downloads[0].url, "_blank");
      } else {
        alert(data.error || "Download failed.");
      }
    } catch (err) {
      console.error("❌ Download failed:", err);
      alert("Error downloading file.");
    }
  };

  if (loading) return <p className="text-center mt-10 text-lg">⏳ Loading downloadable products...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">📥 Your Downloads</h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No downloadable products found.</p>
      ) : (
        <ul className="space-y-6">
          {products.map(product => (
            <li
              key={product.id}
              className="flex items-start gap-6 bg-white shadow-sm border rounded-lg p-5 hover:shadow-md transition"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-md border"
                />
              )}

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>

                <div className="mt-2 mb-3">
                  {product.downloads.map((file, index) => (
                    <span
                      key={index}
                      className="inline-block text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full mr-2 mb-2"
                    >
                      📄 {file.name}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleDownload(product.id)}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  ⬇️ Download
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DownloadsPage;
