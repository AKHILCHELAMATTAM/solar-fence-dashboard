import React from "react";
import "./SummaryCard.css";

const SummaryCard = ({ title, value, subtitle }) => {
  return (
    <div className="summary-card card">
      <div className="summary-card__title">{title}</div>
      <div className="summary-card__value">{value}</div>
      {subtitle && <div className="summary-card__subtitle">{subtitle}</div>}
    </div>
  );
};

export default SummaryCard;