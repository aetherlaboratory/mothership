// app/newsletter/page.js
"use client";

import { useState, useEffect } from "react";
import NewsletterList from "./components/newsletterList";

const NewsletterPage = () => {
  const [selectedNewsletter, setSelectedNewsletter] = useState(null);

  return (
	<div className="flex max-w-7xl mx-auto mt-10 border rounded shadow-md h-[80vh]">
	  {/* Sidebar: Scrollable list */}
	  <div className="w-1/3 border-r overflow-y-auto p-4 bg-gray-50">
		<h2 className="text-xl font-semibold mb-4">📧 Email Templates</h2>
		<NewsletterList onSelect={setSelectedNewsletter} />
	  </div>

	  {/* Main Content: Selected Newsletter View/Edit */}
	  <div className="w-2/3 p-6 overflow-y-auto">
		{selectedNewsletter ? (
		  <div>
			<h2 className="text-2xl font-bold mb-4">{selectedNewsletter.title}</h2>
			<div
			  className="prose max-w-none"
			  dangerouslySetInnerHTML={{ __html: selectedNewsletter.content }}
			/>
		  </div>
		) : (
		  <p className="text-gray-500">🪄 Select a newsletter to view/edit</p>
		)}
	  </div>
	</div>
  );
};

export default NewsletterPage;
