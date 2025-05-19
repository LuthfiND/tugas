import React from "react";
import type { TabKey } from "../page";

const tabs: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "myEvents", label: "My Events" },
  { key: "statistics", label: "Statistics" },
  { key: "transactions", label: "Transactions" },
  { key: "attendees", label: "Attendees" },
];

const Sidebar: React.FC<{
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
}> = ({ activeTab, onChangeTab }) => (
  <aside className="w-64 bg-gray-100 h-full p-6">
    <nav className="flex flex-col gap-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`text-left px-4 py-2 rounded ${
            activeTab === tab.key
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-100"
          }`}
          onClick={() => onChangeTab(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
