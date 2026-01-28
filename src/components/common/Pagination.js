import React from "react";

const Pagination = ({ page, pageSize, total, onPageChange }) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const go = (p) => {
    if (p < 1 || p > totalPages) return;
    onPageChange(p);
  };

  return (
    <div
      style={{
        marginTop: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "0.85rem",
      }}
    >
      <div>
        Page {page} of {totalPages} ({total} items)
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn btn-outline btn-small" onClick={() => go(1)}>
          « First
        </button>
        <button
          className="btn btn-outline btn-small"
          onClick={() => go(page - 1)}
        >
          ‹ Prev
        </button>
        <button
          className="btn btn-outline btn-small"
          onClick={() => go(page + 1)}
        >
          Next ›
        </button>
        <button
          className="btn btn-outline btn-small"
          onClick={() => go(totalPages)}
        >
          Last »
        </button>
      </div>
    </div>
  );
};

export default Pagination;