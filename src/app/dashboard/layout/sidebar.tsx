import React from "react";
import { TabKey } from "../page";

interface Props {
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
}

const tabs: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "myEvents", label: "My Events" },
  { key: "statistics", label: "Statistics" },
  { key: "transactions", label: "Transactions" },
  { key: "attendees", label: "Attendees" },
];

const Sidebar: React.FC<Props> = ({ activeTab, onChangeTab }) => (
  <nav className="w-64 bg-gray-100 h-full p-4">
    <h1 className="text-xl font-bold mb-6">Dashboard</h1>
    <ul>
      {tabs.map((tab) => (
        <li key={tab.key}>
          <button
            className={`block w-full text-left py-2 px-3 rounded ${
              activeTab === tab.key
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => onChangeTab(tab.key)}
          >
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  </nav>
);

export default Sidebar;
