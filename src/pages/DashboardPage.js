import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import SummaryCard from "../components/common/SummaryCard";
import StatusBadge from "../components/common/StatusBadge";
import { sites, devices, alarms } from "../data/sampleData";

const DEVICE_STATUS_COLORS = ["#39B54A", "#ef4444"];

const DashboardPage = () => {
  const [selectedSite, setSelectedSite] = useState("all");
  const [powerData, setPowerData] = useState([]);
  const [voltageData, setVoltageData] = useState([]);

  useEffect(() => {
    const seed = () => {
      const now = new Date();
      const formatTime = (d) => d.toTimeString().slice(0, 8);

      const base = [];
      for (let i = 9; i >= 0; i--) {
        const t = new Date(now.getTime() - i * 1000);
        base.push({
          time: formatTime(t),
          power: 30 + Math.random() * 20,
          fenceVoltage: 7000 + Math.random() * 1500,
        });
      }
      setPowerData(base);
      setVoltageData(base);
    };
    seed();

    const id = setInterval(() => {
      setPowerData((prev) => {
        const now = new Date();
        const formatTime = (d) => d.toTimeString().slice(0, 8);
        const next = {
          time: formatTime(now),
          power: 30 + Math.random() * 20,
        };
        return [...prev.slice(-19), next];
      });
      setVoltageData((prev) => {
        const now = new Date();
        const formatTime = (d) => d.toTimeString().slice(0, 8);
        const next = {
          time: formatTime(now),
          fenceVoltage: 7000 + Math.random() * 1500,
        };
        return [...prev.slice(-19), next];
      });
    }, 3000);

    return () => clearInterval(id);
  }, []);

  const filteredDevices =
    selectedSite === "all"
      ? devices
      : devices.filter((d) => d.siteId === selectedSite);

  const totalSites = sites.length;
  const totalDevices = filteredDevices.length;
  const activeDevices = filteredDevices.filter((d) => d.status === "Active")
    .length;
  const inactiveDevices = totalDevices - activeDevices;

  const deviceStatusPie = [
    { name: "Active", value: activeDevices },
    { name: "Inactive", value: inactiveDevices },
  ];

  const recentAlarms = [...alarms]
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, 5);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <div className="text-muted">
            Installation summary & real-time performance
          </div>
        </div>
        <div>
          <select
            className="select"
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
          >
            <option value="all">All Sites</option>
            {sites.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary cards – already responsive using auto-fit */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
        }}
      >
        <SummaryCard
          title="Total Sites"
          value={totalSites}
          subtitle="Monitored locations"
        />
        <SummaryCard
          title="Devices"
          value={totalDevices}
          subtitle={`Active: ${activeDevices} • Inactive: ${inactiveDevices}`}
        />
        <SummaryCard
          title="Today Energy"
          value="1,250 kWh"
          subtitle="Estimated"
        />
        <SummaryCard
          title="System Uptime"
          value="99.6%"
          subtitle="Last 30 days"
        />
      </div>

      {/* Charts + Pie – now responsive with .grid-3-responsive */}
      <div className="grid-3-responsive" style={{ marginTop: 16 }}>
        {/* Real-time Solar Power */}
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                Solar Power (kW)
              </div>
              <div className="text-muted">Real-time</div>
            </div>
          </div>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <LineChart data={powerData}>
                <XAxis dataKey="time" hide />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="power"
                  stroke="#39B54A"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time Fence Voltage */}
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                Fence Voltage (V)
              </div>
              <div className="text-muted">Real-time</div>
            </div>
          </div>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <LineChart data={voltageData}>
                <XAxis dataKey="time" hide />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="fenceVoltage"
                  stroke="#0A1F44"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Status Pie */}
        <div className="card">
          <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>
            Device Status
          </div>
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={deviceStatusPie}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={4}
                >
                  {deviceStatusPie.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={DEVICE_STATUS_COLORS[index]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ fontSize: "0.8rem" }}>
            <div>
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  backgroundColor: DEVICE_STATUS_COLORS[0],
                  borderRadius: 999,
                  marginRight: 6,
                }}
              />
              Active: {activeDevices}
            </div>
            <div>
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  backgroundColor: DEVICE_STATUS_COLORS[1],
                  borderRadius: 999,
                  marginRight: 6,
                }}
              />
              Inactive: {inactiveDevices}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alarms – wrap table for horizontal scroll on mobile */}
      <div style={{ marginTop: 16 }} className="card">
        <div
          style={{
            marginBottom: 8,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>
              Recent Alarms
            </div>
            <div className="text-muted">Last 5 events</div>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Device</th>
                <th>Severity</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAlarms.map((a) => (
                <tr key={a.id}>
                  <td>
                    {new Date(a.timestamp).toLocaleString(undefined, {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>
                  <td>{a.deviceName}</td>
                  <td>{a.severity}</td>
                  <td>{a.message}</td>
                  <td>
                    <StatusBadge status={a.status} />
                  </td>
                </tr>
              ))}
              {recentAlarms.length === 0 && (
                <tr>
                  <td colSpan={5}>No alarms.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;