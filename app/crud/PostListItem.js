'use client';
import Image from 'next/image';

// Helper to get the post thumbnail URL
function getThumbnail(post) {
  // Looks for the featured media image (requires `_embed` in the fetch URL)
  return (
    post?._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    'https://via.placeholder.com/100x100?text=No+Image'
  );
}

export default function PostListItem({ post, listType = 'text', isSelected, onClick }) {
  const baseClasses = 'p-2 border-b cursor-pointer hover:bg-gray-100 transition-all';
  const activeClass = isSelected ? 'bg-gray-200 font-semibold' : '';

  return (
    <li onClick={onClick} className={`${baseClasses} ${activeClass}`}>
      {listType === 'text' && <p>{post.title.rendered}</p>}

      {listType === 'thumbnail' && (
        <div className="w-full h-24 overflow-hidden rounded">
          <Image
            src={getThumbnail(post)}
            alt={post.title.rendered || 'Thumbnail'}
            width={100}
            height={100}
            className="object-cover rounded"
          />
        </div>
      )}

      {listType === 'thumbText' && (
        <div className="flex items-center gap-3">
          <Image
            src={getThumbnail(post)}
            alt={post.title.rendered || 'Thumbnail'}
            width={60}
            height={60}
            className="object-cover rounded"
          />
          <p>{post.title.rendered}</p>
        </div>
      )}
    </li>
  );
}
