'use client';

import useAuthGuard from '../hooks/useAuthGuard'; // 🪝 Import reusable hook
import OrdersTabs from './components/ordersTabs';

export default function OrdersPage() {
  const { user, loading } = useAuthGuard(); // 🔐 Handles auth + user fetch

  if (loading) return null; // ⏳ Wait for auth check to complete

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">🧾 Orders Dashboard</h1>
      <OrdersTabs />
    </main>
  );
}
