import React from "react";

const StatusBadge = ({ status }) => {
  const normalized = status.toLowerCase();
  let bg = "#e5e7eb";
  let color = "#111827";

  if (normalized === "active") {
    bg = "rgba(57,181,74,0.1)";
    color = "#15803d";
  } else if (normalized === "inactive") {
    bg = "rgba(148,163,184,0.25)";
    color = "#334155";
  } else if (normalized === "resolved") {
    bg = "rgba(59,130,246,0.1)";
    color = "#1d4ed8";
  }

  return (
    <span
      className="chip"
      style={{
        backgroundColor: bg,
        color,
        textTransform: "capitalize",
      }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;