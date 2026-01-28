import React, { useMemo, useState } from "react";
import { devices, sites } from "../data/sampleData";
import StatusBadge from "../components/common/StatusBadge";
import Pagination from "../components/common/Pagination";

const PAGE_SIZE = 5;

const DevicesPage = () => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const siteById = useMemo(
    () =>
      sites.reduce((map, s) => {
        map[s.id] = s.name;
        return map;
      }, {}),
    []
  );

  const filtered = devices.filter((d) => {
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      d.name.toLowerCase().includes(q) ||
      d.id.toLowerCase().includes(q) ||
      d.serial.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "all" || d.status.toLowerCase() === statusFilter;

    return matchesQuery && matchesStatus;
  });

  const total = filtered.length;
  const startIndex = (page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Device List</h1>
          <div className="text-muted">
            Search, filter and inspect device metrics
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
            justifyContent: "space-between",
          }}
        >
          <input
            placeholder="Search by name, ID, or serial..."
            className="input"
            style={{ minWidth: 220, flex: 1 }}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
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
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Serial</th>
                <th>Site</th>
                <th>Status</th>
                <th>Power (kW)</th>
                <th>Voltage (V)</th>
                <th>Battery (%)</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((d) => (
                <tr key={d.id}>
                  <td>{d.name}</td>
                  <td>{d.id}</td>
                  <td>{d.serial}</td>
                  <td>{siteById[d.siteId] || "-"}</td>
                  <td>
                    <StatusBadge status={d.status} />
                  </td>
                  <td>{d.powerKw.toFixed(2)}</td>
                  <td>{d.voltage}</td>
                  <td>{d.battery}%</td>
                </tr>
              ))}
              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={8}>No devices.</td>
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

export default DevicesPage;