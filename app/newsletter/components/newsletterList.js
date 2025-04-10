"use client";

const NewsletterList = ({ onSelect }) => {
  // Placeholder dummy data
  const newsletters = [
	{ id: 1, title: "📰 October Newsletter", content: "<p>Welcome to October!</p>" },
	{ id: 2, title: "🎉 Launch Announcement", content: "<p>Our product just launched!</p>" },
	{ id: 3, title: "🛍️ Holiday Specials", content: "<p>Don't miss our holiday deals.</p>" },
  ];

  return (
	<ul className="space-y-3">
	  {newsletters.map((item) => (
		<li
		  key={item.id}
		  className="p-3 bg-white border rounded cursor-pointer hover:bg-blue-50"
		  onClick={() => onSelect(item)}
		>
		  {item.title}
		</li>
	  ))}
	</ul>
  );
};

export default NewsletterList;
