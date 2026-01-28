import React from "react";
import { devices } from "../data/sampleData";

const MapsPage = () => {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Maps</h1>
          <div className="text-muted">
            Google Maps integration placeholder for device locations
          </div>
        </div>
      </div>

      <div className="grid-2-responsive">
        <div className="card" style={{ minHeight: 320 }}>
          <div
            style={{
              marginBottom: 8,
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                Map View (Placeholder)
              </div>
              <div className="text-muted">
                Integrate Google Maps JavaScript API using your API key.
              </div>
            </div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              <button className="btn btn-outline btn-small">Zoom In</button>
              <button className="btn btn-outline btn-small">Zoom Out</button>
              <button className="btn btn-outline btn-small">Satellite</button>
            </div>
          </div>

          <div
            style={{
              borderRadius: 8,
              border: "1px dashed #cbd5e1",
              height: 260,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6b7280",
              fontSize: "0.9rem",
              background:
                "repeating-linear-gradient(45deg,#f9fafb,#f9fafb 10px,#f3f4f6 10px,#f3f4f6 20px)",
            }}
          >
            Google Map would render here.
          </div>

          <div style={{ marginTop: 8, fontSize: "0.8rem" }}>
            To enable:
            <ol style={{ paddingLeft: 18, marginTop: 4 }}>
              <li>
                Get an API key from{" "}
                <a
                  href="https://console.cloud.google.com/apis"
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Cloud Console
                </a>
              </li>
              <li>
                Load the Maps script in <code>public/index.html</code>:
                <pre
                  style={{
                    background: "#0f172a",
                    color: "#e5e7eb",
                    padding: 8,
                    borderRadius: 4,
                    overflowX: "auto",
                  }}
                >
{`<script
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"
  async
  defer
></script>`}
                </pre>
              </li>
              <li>
                Use <code>window.google.maps.Map</code> or a wrapper library
                like <code>@react-google-maps/api</code>.
              </li>
            </ol>
          </div>
        </div>

        <div className="card">
          <div
            style={{
              fontWeight: 600,
              fontSize: "0.95rem",
              marginBottom: 6,
            }}
          >
            Devices on Map
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Lat</th>
                  <th>Lng</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((d) => (
                  <tr key={d.id}>
                    <td>{d.name}</td>
                    <td>{d.lat.toFixed(4)}</td>
                    <td>{d.lng.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-muted">
            In a full implementation, clicking a device would center the map and
            open an info window.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsPage;