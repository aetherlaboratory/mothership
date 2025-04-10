"use client";

import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleNotification = (event) => {
      const { message, type } = event.detail;
      console.log(`🔔 Notification Triggered: ${message} (${type})`);

      // ✅ Add new notification
      setNotifications((prev) => [...prev, { id: Date.now(), message, type }]);

      // ✅ Auto-remove after 4 seconds
      setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, 4000);
    };

    window.addEventListener("notify", handleNotification);
    return () => {
      window.removeEventListener("notify", handleNotification);
    };
  }, []);

  // ✅ Define colors based on notification type
  const getTypeClasses = (type) => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-black";
      case "info":
      default:
        return "bg-blue-500 text-white";
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50 space-y-3">
      {notifications.map(({ id, message, type }) => (
        <Transition
          key={id}
          appear
          show={true}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={`p-4 rounded-lg shadow-lg ${getTypeClasses(type)}`}>
            {message}
          </div>
        </Transition>
      ))}
    </div>
  );
};

export default Notifications;
