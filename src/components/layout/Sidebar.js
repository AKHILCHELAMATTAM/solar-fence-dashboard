import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__brand">
          <span className="sidebar__logo">☀︎</span>
          <span className="sidebar__title">Solar Fence</span>
        </div>
        <nav className="sidebar__nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "sidebar__link" + (isActive ? " sidebar__link--active" : "")
            }
            onClick={onClose}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/devices"
            className={({ isActive }) =>
              "sidebar__link" + (isActive ? " sidebar__link--active" : "")
            }
            onClick={onClose}
          >
            Device List
          </NavLink>
          <NavLink
            to="/alarms"
            className={({ isActive }) =>
              "sidebar__link" + (isActive ? " sidebar__link--active" : "")
            }
            onClick={onClose}
          >
            Alarms
          </NavLink>
          <NavLink
            to="/maps"
            className={({ isActive }) =>
              "sidebar__link" + (isActive ? " sidebar__link--active" : "")
            }
            onClick={onClose}
          >
            Maps
          </NavLink>
          <NavLink
            to="/hierarchy"
            className={({ isActive }) =>
              "sidebar__link" + (isActive ? " sidebar__link--active" : "")
            }
            onClick={onClose}
          >
            Hierarchy
          </NavLink>
          <NavLink
            to="/configurations"
            className={({ isActive }) =>
              "sidebar__link" + (isActive ? " sidebar__link--active" : "")
            }
            onClick={onClose}
          >
            Configurations
          </NavLink>
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              "sidebar__link" + (isActive ? " sidebar__link--active" : "")
            }
            onClick={onClose}
          >
            Reports
          </NavLink>
        </nav>
      </div>
      {isOpen && <div className="sidebar__backdrop" onClick={onClose} />}
    </>
  );
};

export default Sidebar;