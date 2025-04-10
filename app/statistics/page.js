// app/statistics/page.js
'use client';

import useAuthGuard from '../hooks/useAuthGuard'; // 🪝 Auth protection
import SummaryCards from './components/summaryCards';
import StatsTable from './components/statsTable';
import StatsChart from './components/statsChart';

export default function StatisticsPage() {
  const { user, loading } = useAuthGuard(); // 🔐 Secure this route

  if (loading) return null; // ⏳ Wait for auth before rendering

  return (
    <div className="statistics-page">
      {/* 📊 Overview Summary Cards */}
      <SummaryCards />

      {/* 📈 Sales Chart */}
      <StatsChart />

      {/* 🧾 Top Products Table */}
      <StatsTable />
    </div>
  );
}
