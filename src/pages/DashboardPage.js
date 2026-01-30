import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
} from "recharts";
import { FiSearch } from "react-icons/fi";
import { sites, devices, alarms } from "../data/sampleData";
import "./DashboardPage.css";

const DEVICE_STATUS_COLORS = ["#22c55e", "#3b82f6"]; // active, inactive

const DashboardPage = () => {
  const [selectedSiteId, setSelectedSiteId] = useState(
    sites[0]?.id || ""
  );
  const [mapMode, setMapMode] = useState("map");

  const formattedNow = useMemo(
    () =>
      new Date().toLocaleString(undefined, {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    []
  );

  const selectedSite = useMemo(
    () => sites.find((s) => s.id === selectedSiteId) || null,
    [selectedSiteId]
  );

  const siteDevices = useMemo(
    () => devices.filter((d) => d.siteId === selectedSiteId),
    [selectedSiteId]
  );

  const activeCount = siteDevices.filter((d) => d.status === "Active").length;
  const inactiveCount = siteDevices.length - activeCount;

  const deviceStatusPie = [
    { name: "Active", value: activeCount },
    { name: "Inactive", value: inactiveCount },
  ];

  // Simple fake month stats based on power
  const solarDevices = siteDevices.filter((d) =>
    d.name.toLowerCase().includes("inverter")
  );
  const fenceDevices = siteDevices.filter((d) =>
    d.name.toLowerCase().includes("fence")
  );
  const monthSolar =
    solarDevices.length > 0
      ? (solarDevices.reduce((sum, d) => sum + d.powerKw, 0) / 5).toFixed(2)
      : "0.00";
  const monthFence =
    fenceDevices.length > 0
      ? (fenceDevices.reduce((sum, d) => sum + d.powerKw, 0) / 5).toFixed(2)
      : "0.00";

  // Alarms for the selected site
  const deviceIdsForSite = new Set(siteDevices.map((d) => d.id));
  const siteAlarms = alarms.filter((a) =>
    deviceIdsForSite.has(a.deviceId)
  );

  return (
    <div className="page">
      {/* HERO CARD */}
      <section className="dash-hero">
        <div className="dash-hero-left">
          <div className="dash-hero-icon">☁</div>
          <div>
            <div className="dash-hero-title">
              Fence Cloud Monitoring System
            </div>
            <div className="dash-hero-subtitle">Realtime overview</div>
          </div>
        </div>
        <div className="dash-hero-right">{formattedNow}</div>
      </section>

      {/* TOP CARDS */}
      <section className="dash-top-grid">
        {/* Installation */}
        <div className="card dash-card">
          <div className="dash-card-title">Installation</div>
          <div className="dash-card-subtitle">
            Overall monitored infrastructure
          </div>
          <div className="dash-install-metric">
            <span className="dash-install-metric-label">Total Sites</span>
            <span className="dash-install-metric-value">
              {sites.length}
            </span>
          </div>
          <div className="dash-install-metric">
            <span className="dash-install-metric-label">Total Devices</span>
            <span className="dash-install-metric-value">
              {devices.length}
            </span>
          </div>
        </div>

        {/* Site Status */}
        <div className="card dash-card">
          <div className="dash-card-title">Site Status</div>
          <div className="dash-card-subtitle">Select Site</div>
          <div className="dash-site-status-select">
            <select
              className="select"
              value={selectedSiteId}
              onChange={(e) => setSelectedSiteId(e.target.value)}
            >
              {sites.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="dash-site-status-row">
            <span className="dash-site-status-key">Today Solar</span>
            <span className="dash-site-status-value">NA</span>
          </div>
          <div className="dash-site-status-row">
            <span className="dash-site-status-key">Today Fence</span>
            <span className="dash-site-status-value">NA</span>
          </div>
          <div className="dash-site-status-row">
            <span className="dash-site-status-key">Month Solar</span>
            <span className="dash-site-status-value">{monthSolar}</span>
          </div>
          <div className="dash-site-status-row">
            <span className="dash-site-status-key">Month Fence</span>
            <span className="dash-site-status-value">{monthFence}</span>
          </div>
        </div>

        {/* Site Info */}
        <div className="card dash-card">
          <div className="dash-card-title">Site Info</div>
          {selectedSite ? (
            <div className="dash-site-info-grid">
              <span className="dash-site-info-label">Name</span>
              <span className="dash-site-info-value">
                {selectedSite.name}
              </span>

              <span className="dash-site-info-label">Devices</span>
              <span className="dash-site-info-value">
                {siteDevices.length}
              </span>

              <span className="dash-site-info-label">Type</span>
              <span className="dash-site-info-value">
                {selectedSite.type || "N/A"}
              </span>

              <span className="dash-site-info-label">Address</span>
              <span className="dash-site-info-value">
                {selectedSite.address || "N/A"}
              </span>

              <span className="dash-site-info-label">Location</span>
              <span className="dash-site-info-value">
                {selectedSite.location || "N/A"}
              </span>
            </div>
          ) : (
            <div className="text-muted">No site selected.</div>
          )}
        </div>

        {/* Device Status Donut */}
        <div className="card dash-card">
          <div className="dash-card-title">Device Status</div>
          <div className="dash-device-status-wrap">
            <div className="dash-device-status-chart">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={deviceStatusPie}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={2}
                    stroke="transparent"
                  >
                    {deviceStatusPie.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={DEVICE_STATUS_COLORS[index]}
                      />
                    ))}
                    <Label
                      position="center"
                      content={({ viewBox }) => {
                        if (!viewBox) return null;
                        return (
                          <g>
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy - 6}
                              textAnchor="middle"
                              fill="#111827"
                              fontSize="12"
                              fontWeight="600"
                            >
                              Active Devices:
                            </text>
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy + 10}
                              textAnchor="middle"
                              fill="#111827"
                              fontSize="13"
                              fontWeight="700"
                            >
                              {activeCount} OF {siteDevices.length || 1}
                            </text>
                          </g>
                        );
                      }}
                    />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="dash-device-status-legend">
              <div className="dash-device-status-legend-item">
                <span
                  className="dash-legend-dot"
                  style={{ backgroundColor: DEVICE_STATUS_COLORS[0] }}
                />
                <span>activeDevices</span>
              </div>
              <div className="dash-device-status-legend-item">
                <span
                  className="dash-legend-dot"
                  style={{ backgroundColor: DEVICE_STATUS_COLORS[1] }}
                />
                <span>inactiveDevices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM ROW */}
      <section className="dash-bottom-grid">
        {/* Device Locations */}
        <div className="card dash-card">
          <div className="dash-map-header">
            <div>
              <div className="dash-card-title">Device Locations</div>
            </div>
            <div className="dash-map-toggle-group">
              <button
                type="button"
                className={
                  "dash-map-toggle" +
                  (mapMode === "map" ? " dash-map-toggle--active" : "")
                }
                onClick={() => setMapMode("map")}
              >
                Map
              </button>
              <button
                type="button"
                className={
                  "dash-map-toggle" +
                  (mapMode === "satellite"
                    ? " dash-map-toggle--active"
                    : "")
                }
                onClick={() => setMapMode("satellite")}
              >
                Satellite
              </button>
            </div>
          </div>
          <div className="dash-map-placeholder">
            Google Map would render here ({mapMode} view)
          </div>
        </div>

        {/* Total Site Alarms */}
        <div className="card dash-card">
          <div className="dash-alarms-header">
            <div className="dash-card-title">Total Site Alarms</div>
          </div>

          {siteAlarms.length === 0 ? (
            <div className="dash-empty-state">
              <div className="dash-empty-icon">
                <FiSearch />
              </div>
              <div className="dash-empty-title">Sorry! No Result Found</div>
              <div className="dash-empty-text">
                Try adjusting filters or search.
              </div>
            </div>
          ) : (
            <div className="dash-alarms-table-wrapper table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Sno</th>
                    <th>DeviceId</th>
                    <th>Last Triggered At</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {siteAlarms.map((a, idx) => (
                    <tr key={a.id}>
                      <td>{idx + 1}</td>
                      <td>{a.deviceId}</td>
                      <td>
                        {new Date(a.timestamp).toLocaleString(undefined, {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </td>
                      <td>{a.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;