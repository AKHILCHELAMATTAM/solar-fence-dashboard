import React, { useState } from "react";
import Tabs from "../components/common/Tabs";
import StatusBadge from "../components/common/StatusBadge";
import { devices } from "../data/sampleData";

const initialUsers = [
  { id: "user-1", name: "John Doe", role: "Operator", email: "john@example.com" },
  { id: "user-2", name: "Jane Smith", role: "Admin", email: "jane@example.com" },
];

const initialDeviceTypes = [
  { id: "type-1", name: "Inverter", description: "Solar inverter" },
  { id: "type-2", name: "Fence Controller", description: "Electric fence unit" },
];

const initialRules = [
  {
    id: "rule-1",
    name: "Low Fence Voltage",
    condition: "FenceVoltage < 6000",
    channel: "Email",
  },
];

const ConfigurationsPage = () => {
  const [activeTab, setActiveTab] = useState("devices");

  const [deviceConfigs, setDeviceConfigs] = useState(
    devices.map((d) => ({ id: d.id, name: d.name, status: d.status }))
  );
  const [users, setUsers] = useState(initialUsers);
  const [deviceTypes, setDeviceTypes] = useState(initialDeviceTypes);
  const [rules, setRules] = useState(initialRules);

  const [newItem, setNewItem] = useState({});

  const tabs = [
    { key: "devices", label: "Devices" },
    { key: "users", label: "Users" },
    { key: "deviceTypes", label: "Device Types" },
    { key: "notificationRules", label: "Notification Rules" },
  ];

  const resetNewItem = () => setNewItem({});

  const handleAdd = () => {
    if (activeTab === "devices") {
      if (!newItem.name) return;
      setDeviceConfigs((prev) => [
        ...prev,
        {
          id: "dev-" + (prev.length + 1),
          name: newItem.name,
          status: newItem.status || "Active",
        },
      ]);
    } else if (activeTab === "users") {
      if (!newItem.name) return;
      setUsers((prev) => [
        ...prev,
        {
          id: "user-" + (prev.length + 1),
          name: newItem.name,
          role: newItem.role || "Operator",
          email: newItem.email || "",
        },
      ]);
    } else if (activeTab === "deviceTypes") {
      if (!newItem.name) return;
      setDeviceTypes((prev) => [
        ...prev,
        {
          id: "type-" + (prev.length + 1),
          name: newItem.name,
          description: newItem.description || "",
        },
      ]);
    } else if (activeTab === "notificationRules") {
      if (!newItem.name) return;
      setRules((prev) => [
        ...prev,
        {
          id: "rule-" + (prev.length + 1),
          name: newItem.name,
          condition: newItem.condition || "",
          channel: newItem.channel || "Email",
        },
      ]);
    }
    resetNewItem();
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this item?")) return;
    if (activeTab === "devices") {
      setDeviceConfigs((prev) => prev.filter((d) => d.id !== id));
    } else if (activeTab === "users") {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } else if (activeTab === "deviceTypes") {
      setDeviceTypes((prev) => prev.filter((t) => t.id !== id));
    } else if (activeTab === "notificationRules") {
      setRules((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Configurations</h1>
          <div className="text-muted">
            Manage devices, users, device types, and notification rules
          </div>
        </div>
      </div>

      <div className="card">
        <Tabs tabs={tabs} activeKey={activeTab} onChange={setActiveTab} />

        {/* ADD FORM */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 8,
            alignItems: "center",
          }}
        >
          {activeTab === "devices" && (
            <>
              <input
                className="input"
                placeholder="Device name"
                value={newItem.name || ""}
                onChange={(e) =>
                  setNewItem((v) => ({ ...v, name: e.target.value }))
                }
              />
              <select
                className="select"
                value={newItem.status || "Active"}
                onChange={(e) =>
                  setNewItem((v) => ({ ...v, status: e.target.value }))
                }
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </>
          )}

          {activeTab === "users" && (
            <>
              <input
                className="input"
                placeholder="User name"
                value={newItem.name || ""}
                onChange={(e) =>
                  setNewItem((v) => ({ ...v, name: e.target.value }))
                }
              />
              <input
                className="input"
                placeholder="Email"
                value={newItem.email || ""}
                onChange={(e) =>
                  setNewItem((v) => ({ ...v, email: e.target.value }))
                }
              />
              <select
                className="select"
                value={newItem.role || "Operator"}
                onChange={(e) =>
                  setNewItem((v) => ({ ...v, role: e.target.value }))
                }
              >
                <option>Operator</option>
                <option>Admin</option>
              </select>
            </>
          )}

          {activeTab === "deviceTypes" && (
            <>
              <input
                className="input"
                placeholder="Type name"
                value={newItem.name || ""}
                onChange={(e) =>
                  setNewItem((v) => ({ ...v, name: e.target.value }))
                }
              />
              <input
                className="input"
                placeholder="Description"
                value={newItem.description || ""}
                onChange={(e) =>
                  setNewItem((v) => ({ ...v, description: e.target.value }))
                }
                style={{ minWidth: 220, flex: 1 }}
              />
            </>
          )}

          {activeTab === "notificationRules" && (
            <>
              <input
                className="input"
                placeholder="Rule name"
                value={newItem.name || ""}
                onChange={(e) =>
                  setNewItem((v) => ({ ...v, name: e.target.value }))
                }
              />
              <input
                className="input"
                placeholder="Condition (e.g. FenceVoltage < 6000)"
                value={newItem.condition || ""}
                onChange={(e) =>
                  setNewItem((v) => ({ ...v, condition: e.target.value }))
                }
                style={{ minWidth: 220, flex: 1 }}
              />
              <select
                className="select"
                value={newItem.channel || "Email"}
                onChange={(e) =>
                  setNewItem((v) => ({ ...v, channel: e.target.value }))
                }
              >
                <option>Email</option>
                <option>SMS</option>
                <option>Push</option>
              </select>
            </>
          )}

          <button className="btn btn-primary btn-small" onClick={handleAdd}>
            Add
          </button>
        </div>

        {/* TAB CONTENT TABLES (all wrapped) */}
        {activeTab === "devices" && (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Device ID</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {deviceConfigs.map((d) => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.name}</td>
                    <td>
                      <StatusBadge status={d.status} />
                    </td>
                    <td>
                      <button
                        className="btn btn-outline btn-small"
                        onClick={() => handleDelete(d.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {deviceConfigs.length === 0 && (
                  <tr>
                    <td colSpan={4}>No device configurations.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "users" && (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      <button
                        className="btn btn-outline btn-small"
                        onClick={() => handleDelete(u.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={5}>No users.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "deviceTypes" && (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Type ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {deviceTypes.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.name}</td>
                    <td>{t.description}</td>
                    <td>
                      <button
                        className="btn btn-outline btn-small"
                        onClick={() => handleDelete(t.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {deviceTypes.length === 0 && (
                  <tr>
                    <td colSpan={4}>No device types.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "notificationRules" && (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Rule ID</th>
                  <th>Name</th>
                  <th>Condition</th>
                  <th>Channel</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rules.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.name}</td>
                    <td>{r.condition}</td>
                    <td>{r.channel}</td>
                    <td>
                      <button
                        className="btn btn-outline btn-small"
                        onClick={() => handleDelete(r.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {rules.length === 0 && (
                  <tr>
                    <td colSpan={5}>No rules.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigurationsPage;