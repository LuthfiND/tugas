import React from "react";
import { Bar } from "react-chartjs-2"; // install chart.js & react-chartjs-2

const Statistics: React.FC = () => {
  // Dummy data, ganti dengan fetch dari API
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Tickets Sold",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(59,130,246,0.5)",
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Event Statistics</h2>
      <Bar data={data} />
      {/* Tambahkan filter by year/month/day */}
    </div>
  );
};

export default Statistics;
