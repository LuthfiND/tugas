"use client";

import { useState, useEffect } from "react";
import Sidebar from "./layout/sidebar";
// import Overview from "./tab/overview";
// import MyEvent from "./tab/my-event";
import Statistics from "./tab/statistics";
import Transaction from "./tab/transactions";
import EventAttendees from "./tab/event-attendees";
import TransactionModal from "./transactionModal/transactionModal";

export type TabKey =
  | "overview"
  | "myEvents"
  | "statistics"
  | "transactions"
  | "attendees";

interface DashboardData {
  totalEvents: number;
  totalAttendees: number;
  upcomingEvent: {
    id: string;
    title: string;
    date: string;
  };
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [isModalOpen, setModalOpen] = useState(false);

  // State untuk data dashboard
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data dashboard
  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/dashboard");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as DashboardData;
        setData(json);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const renderContent = () => {
    if (activeTab === "overview") {
      if (loading) return <p>Loading overview...</p>;
      if (error) return <p className="text-red-500">Error: {error}</p>;
      // if (data) return <Overview data={data} />;
      return null;
    }
    switch (activeTab) {
      case "myEvents":
      // return <MyEvent />;
      case "statistics":
        return <Statistics />;
      case "transactions":
        return <Transaction onOpenModal={() => setModalOpen(true)} />;
      case "attendees":
        return <EventAttendees />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} onChangeTab={setActiveTab} />
      <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
