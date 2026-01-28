import React from "react";
import "./Tabs.css";

const Tabs = ({ tabs, activeKey, onChange }) => {
  return (
    <div className="tabs">
      {tabs.map((t) => (
        <button
          key={t.key}
          className={
            "tabs__tab" + (t.key === activeKey ? " tabs__tab--active" : "")
          }
          onClick={() => onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;