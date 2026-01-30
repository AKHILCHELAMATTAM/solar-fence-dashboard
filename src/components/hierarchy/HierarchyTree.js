// import React, { useState } from "react";
// import "./HierarchyTree.css";

// const Node = ({ node, level = 0 }) => {
//   const [open, setOpen] = useState(true);
//   const hasChildren =
//     node.children && Array.isArray(node.children) && node.children.length > 0;

//   const colorByType = {
//     organization: "#0ea5e9",
//     user: "#a855f7",
//     site: "#f97316",
//     device: "#6b7280",
//   };

//   return (
//     <div className="ht-node" style={{ marginLeft: level * 16 }}>
//       <div className="ht-node__header">
//         {hasChildren && (
//           <button
//             className="ht-node__toggle"
//             onClick={() => setOpen((v) => !v)}
//           >
//             {open ? "▾" : "▸"}
//           </button>
//         )}
//         {!hasChildren && <span className="ht-node__toggle-placeholder" />}
//         <span
//           className="ht-node__badge"
//           style={{ backgroundColor: colorByType[node.type] || "#6b7280" }}
//         >
//           {node.type}
//         </span>
//         <span className="ht-node__label">{node.label}</span>
//       </div>
//       {hasChildren && open && (
//         <div className="ht-node__children">
//           {node.children.map((child) => (
//             <Node key={child.id} node={child} level={level + 1} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const HierarchyTree = ({ data }) => {
//   return (
//     <div className="card">
//       {data.map((root) => (
//         <Node key={root.id} node={root} />
//       ))}
//     </div>
//   );
// };

// export default HierarchyTree;


import React, { useState } from "react";
import "./HierarchyTree.css";

const capitalize = (text) =>
  text ? text.charAt(0).toUpperCase() + text.slice(1) : text;

const badgeStyleByType = {
  organization: {
    backgroundImage: "linear-gradient(135deg,#0ea5e9,#6366f1)",
    boxShadow: "0 8px 18px rgba(59,130,246,0.35)",
  },
  user: {
    backgroundImage: "linear-gradient(135deg,#a855f7,#ec4899)",
    boxShadow: "0 8px 18px rgba(168,85,247,0.4)",
  },
  site: {
    backgroundImage: "linear-gradient(135deg,#f97316,#fb923c)",
    boxShadow: "0 8px 18px rgba(249,115,22,0.4)",
  },
  device: {
    backgroundColor: "#4b5563",
    boxShadow: "0 6px 14px rgba(15,23,42,0.45)",
  },
};

const Node = ({ node, level = 0 }) => {
  const [open, setOpen] = useState(true);
  const hasChildren =
    node.children && Array.isArray(node.children) && node.children.length > 0;

  const badgeStyle = {
    color: "#ffffff",
    ...badgeStyleByType[node.type],
  };

  return (
    <div
      className="ht-node"
      style={{
        marginLeft: level === 0 ? 0 : 18,
      }}
    >
      <div className="ht-node__header">
        {hasChildren ? (
          <button
            className="ht-node__toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Collapse" : "Expand"}
          >
            {open ? "▾" : "▸"}
          </button>
        ) : (
          <span className="ht-node__toggle-placeholder" />
        )}

        <div className="ht-node__content">
          <span className="ht-node__badge" style={badgeStyle}>
            {capitalize(node.type)}
          </span>
          <span className="ht-node__label">{node.label}</span>
        </div>
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
    <div className="card ht-card">
      {data.map((root) => (
        <Node key={root.id} node={root} />
      ))}
    </div>
  );
};

export default HierarchyTree;
