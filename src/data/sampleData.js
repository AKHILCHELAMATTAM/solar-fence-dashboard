export const sites = [
  { id: "site-1", name: "North Solar Farm" },
  { id: "site-2", name: "East Perimeter" },
  { id: "site-3", name: "West Yard" },
];

export const devices = [
  {
    id: "dev-1",
    name: "Inverter-01",
    serial: "INV-0001",
    siteId: "site-1",
    status: "Active",
    powerKw: 42.5,
    voltage: 780,
    battery: 85,
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    id: "dev-2",
    name: "Fence-Controller-01",
    serial: "FNC-0101",
    siteId: "site-1",
    status: "Active",
    powerKw: 0.8,
    voltage: 8200,
    battery: 65,
    lat: 37.7799,
    lng: -122.414,
  },
  {
    id: "dev-3",
    name: "Fence-Controller-02",
    serial: "FNC-0102",
    siteId: "site-2",
    status: "Inactive",
    powerKw: 0,
    voltage: 0,
    battery: 10,
    lat: 37.78,
    lng: -122.42,
  },
  {
    id: "dev-4",
    name: "Inverter-02",
    serial: "INV-0002",
    siteId: "site-3",
    status: "Active",
    powerKw: 30.2,
    voltage: 760,
    battery: 92,
    lat: 37.77,
    lng: -122.41,
  },
];

export const alarms = [
  {
    id: "al-1",
    deviceId: "dev-2",
    deviceName: "Fence-Controller-01",
    severity: "High",
    message: "Fence voltage below threshold",
    status: "Active",
    timestamp: "2026-01-27T10:23:00",
  },
  {
    id: "al-2",
    deviceId: "dev-3",
    deviceName: "Fence-Controller-02",
    severity: "Medium",
    message: "Battery low",
    status: "Resolved",
    timestamp: "2026-01-20T14:10:00",
  },
  {
    id: "al-3",
    deviceId: "dev-1",
    deviceName: "Inverter-01",
    severity: "Low",
    message: "Communication warning",
    status: "Active",
    timestamp: "2026-01-28T08:05:00",
  },
];

export const hierarchyData = [
  {
    id: "org-1",
    type: "organization",
    label: "Acme Solar Corp",
    children: [
      {
        id: "user-group-1",
        type: "user",
        label: "Operations Team",
        children: [
          {
            id: "user-1",
            type: "user",
            label: "John Doe",
            children: [],
          },
          {
            id: "user-2",
            type: "user",
            label: "Jane Smith",
            children: [],
          },
        ],
      },
      {
        id: "site-1-node",
        type: "site",
        label: "North Solar Farm",
        children: devices
          .filter((d) => d.siteId === "site-1")
          .map((d) => ({
            id: d.id,
            type: "device",
            label: d.name,
            children: [],
          })),
      },
      {
        id: "site-2-node",
        type: "site",
        label: "East Perimeter",
        children: devices
          .filter((d) => d.siteId === "site-2")
          .map((d) => ({
            id: d.id,
            type: "device",
            label: d.name,
            children: [],
          })),
      },
      {
        id: "site-3-node",
        type: "site",
        label: "West Yard",
        children: devices
          .filter((d) => d.siteId === "site-3")
          .map((d) => ({
            id: d.id,
            type: "device",
            label: d.name,
            children: [],
          })),
      },
    ],
  },
];

export const monthlyReports = [
  {
    month: "2025-12",
    energyKwh: 125000,
    peakKw: 210,
    uptimePercent: 99.3,
  },
  {
    month: "2026-01",
    energyKwh: 132500,
    peakKw: 220,
    uptimePercent: 99.6,
  },
];