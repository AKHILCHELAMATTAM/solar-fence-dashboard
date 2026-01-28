import React, { useState } from "react";
import { alarms } from "../data/sampleData";
import StatusBadge from "../components/common/StatusBadge";
import Pagination from "../components/common/Pagination";

const PAGE_SIZE = 6;

const AlarmsPage = () => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);

  const filtered = alarms.filter((a) => {
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      a.deviceName.toLowerCase().includes(q) ||
      a.message.toLowerCase().includes(q) ||
      a.id.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "all" || a.status.toLowerCase() === statusFilter;

    let matchesDate = true;
    const ts = new Date(a.timestamp).getTime();
    if (startDate) {
      matchesDate = matchesDate && ts >= new Date(startDate).getTime();
    }
    if (endDate) {
      matchesDate =
        matchesDate &&
        ts <= new Date(endDate + "T23:59:59").getTime();
    }

    return matchesQuery && matchesStatus && matchesDate;
  });

  const total = filtered.length;
  const startIdx = (page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(startIdx, startIdx + PAGE_SIZE);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Alarms</h1>
          <div className="text-muted">
            Monitor active and resolved alarms with filtering
          </div>
        </div>
      </div>

      <div
        className="card"
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <input
            className="input"
            placeholder="Search alarms..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            style={{ minWidth: 200, flex: 1 }}
          />
          <select
            className="select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="resolved">Resolved</option>
          </select>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <input
              type="date"
              className="input"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setPage(1);
              }}
            />
            <input
              type="date"
              className="input"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Alarm ID</th>
                <th>Device</th>
                <th>Severity</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((a) => (
                <tr key={a.id}>
                  <td>
                    {new Date(a.timestamp).toLocaleString(undefined, {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>
                  <td>{a.id}</td>
                  <td>{a.deviceName}</td>
                  <td>{a.severity}</td>
                  <td>{a.message}</td>
                  <td>
                    <StatusBadge status={a.status} />
                  </td>
                </tr>
              ))}
              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={6}>No alarms found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          pageSize={PAGE_SIZE}
          total={total}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default AlarmsPage;