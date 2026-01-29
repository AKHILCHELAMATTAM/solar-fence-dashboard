// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// import React, { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import Sidebar from "./components/layout/Sidebar";
// import Topbar from "./components/layout/Topbar";
// import DashboardPage from "./pages/DashboardPage";
// import DevicesPage from "./pages/DevicesPage";
// import AlarmsPage from "./pages/AlarmsPage";
// import MapsPage from "./pages/MapsPage";
// import HierarchyPage from "./pages/HierarchyPage";
// import ConfigurationsPage from "./pages/ConfigurationsPage";
// import ReportsPage from "./pages/ReportsPage";

// const App = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="app">
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//       <div className="app-main">
//         <Topbar onMenuClick={() => setSidebarOpen((v) => !v)} />
//         <main className="app-content">
//           <Routes>
//             <Route path="/" element={<DashboardPage />} />
//             <Route path="/devices" element={<DevicesPage />} />
//             <Route path="/alarms" element={<AlarmsPage />} />
//             <Route path="/maps" element={<MapsPage />} />
//             <Route path="/hierarchy" element={<HierarchyPage />} />
//             <Route path="/configurations" element={<ConfigurationsPage />} />
//             <Route path="/reports" element={<ReportsPage />} />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import DashboardPage from "./pages/DashboardPage";
import DevicesPage from "./pages/DevicesPage";
import AlarmsPage from "./pages/AlarmsPage";
import MapsPage from "./pages/MapsPage";
import HierarchyPage from "./pages/HierarchyPage";
import ConfigurationsPage from "./pages/ConfigurationsPage";
import ReportsPage from "./pages/ReportsPage";
import LoginPage from "./pages/LoginPage";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";

  const handleLogin = () => {
    // Demo: just mark authenticated. You can replace with real auth later.
    setIsAuthenticated(true);
  };

  // LOGIN LAYOUT (no sidebar/topbar)
  if (isLoginRoute) {
    return (
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        {/* Anything else goes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // MAIN APP LAYOUT (protected by login)
  return (
    <div className="app">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="app-main">
        <Topbar onMenuClick={() => setSidebarOpen((v) => !v)} />
        <main className="app-content">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/devices"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <DevicesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/alarms"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <AlarmsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/maps"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <MapsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hierarchy"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <HierarchyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/configurations"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ConfigurationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ReportsPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;