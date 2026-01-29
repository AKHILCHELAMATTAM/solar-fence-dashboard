import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMicrochip,
  FaBell,
  FaMapMarkedAlt,
  FaSitemap,
  FaCogs,
  FaChartBar,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__brand">
          <span className="sidebar__logo">☀︎</span>
          <span className="sidebar__title">Wildohms Pvt Ltd</span>
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
            <FaTachometerAlt className="sidebar__icon" />
            Dashboard
          </NavLink>

          <NavLink
            to="/devices"
            className={({ isActive }) =>
              "sidebar__link" + (isActive ? " sidebar__link--active" : "")
            }
            onClick={onClose}
          >
            <FaMicrochip className="sidebar__icon" />
            Device List
          </NavLink>

          <NavLink
            to="/alarms"
            className={({ isActive }) =>
              "sidebar__link" + (isActive ? " sidebar__link--active" : "")
            }
            onClick={onClose}
          >
            <FaBell className="sidebar__icon" />
            Alarm
          </NavLink>

          <NavLink
            to="/maps"
            className={({ isActive }) =>
              "sidebar__link" + (isActive ? " sidebar__link--active" : "")
            }
            onClick={onClose}
          >
            <FaMapMarkedAlt className="sidebar__icon" />
            Maps
          </NavLink>

          <NavLink
            to="/hierarchy"
            className={({ isActive }) =>
              "sidebar__link" + (isActive ? " sidebar__link--active" : "")
            }
            onClick={onClose}
          >
            <FaSitemap className="sidebar__icon" />
            Hierarchy
          </NavLink>

          <NavLink
            to="/configurations"
            className={({ isActive }) =>
              "sidebar__link" + (isActive ? " sidebar__link--active" : "")
            }
            onClick={onClose}
          >
            <FaCogs className="sidebar__icon" />
            Configuration
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              "sidebar__link" + (isActive ? " sidebar__link--active" : "")
            }
            onClick={onClose}
          >
            <FaChartBar className="sidebar__icon" />
            Reports
          </NavLink>
        </nav>
      </div>

      {isOpen && <div className="sidebar__backdrop" onClick={onClose} />}
    </>
  );
};

export default Sidebar;
