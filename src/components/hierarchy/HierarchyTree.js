import React, { useState } from "react";
import "./HierarchyTree.css";

const Node = ({ node, level = 0 }) => {
  const [open, setOpen] = useState(true);
  const hasChildren =
    node.children && Array.isArray(node.children) && node.children.length > 0;

  const colorByType = {
    organization: "#0ea5e9",
    user: "#a855f7",
    site: "#f97316",
    device: "#6b7280",
  };

  return (
    <div className="ht-node" style={{ marginLeft: level * 16 }}>
      <div className="ht-node__header">
        {hasChildren && (
          <button
            className="ht-node__toggle"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "▾" : "▸"}
          </button>
        )}
        {!hasChildren && <span className="ht-node__toggle-placeholder" />}
        <span
          className="ht-node__badge"
          style={{ backgroundColor: colorByType[node.type] || "#6b7280" }}
        >
          {node.type}
        </span>
        <span className="ht-node__label">{node.label}</span>
      </div>
      {hasChildren && open && (
        <div className="ht-node__children">
          {node.children.map((child) => (
            <Node key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const HierarchyTree = ({ data }) => {
  return (
    <div className="card">
      {data.map((root) => (
        <Node key={root.id} node={root} />
      ))}
    </div>
  );
};

export default HierarchyTree;