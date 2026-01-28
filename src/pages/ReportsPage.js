import React, { useState } from "react";
import { monthlyReports } from "../data/sampleData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ReportsPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(
    monthlyReports[monthlyReports.length - 1]?.month || ""
  );

  const current = monthlyReports.find((r) => r.month === selectedMonth);

  const chartData = monthlyReports.map((r) => ({
    month: r.month,
    energyKwh: r.energyKwh,
  }));

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports</h1>
          <div className="text-muted">
            Monthly analytics, power generation, and uptime
          </div>
        </div>
        <div>
          <select
            className="select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {monthlyReports.map((r) => (
              <option key={r.month} value={r.month}>
                {r.month}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))" }}
      >
        <div className="card">
          <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "#6b7280" }}>
            Energy Generated
          </div>
          <div style={{ fontSize: "1.4rem", fontWeight: 600 }}>
            {current ? current.energyKwh.toLocaleString() : "-"} kWh
          </div>
          <div className="text-muted">Monthly total</div>
        </div>
        <div className="card">
          <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "#6b7280" }}>
            Peak Power
          </div>
          <div style={{ fontSize: "1.4rem", fontWeight: 600 }}>
            {current ? current.peakKw : "-"} kW
          </div>
          <div className="text-muted">Highest recorded</div>
        </div>
        <div className="card">
          <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "#6b7280" }}>
            System Uptime
          </div>
          <div style={{ fontSize: "1.4rem", fontWeight: 600 }}>
            {current ? current.uptimePercent : "-"}%
          </div>
          <div className="text-muted">Monitored period</div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>
            Monthly Energy Generation
          </div>
        </div>
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="energyKwh" fill="#39B54A" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;