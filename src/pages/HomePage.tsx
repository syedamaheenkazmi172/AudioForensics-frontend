import React, { useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

function HomePage() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "var(--color-background)",
        color: "var(--color-text-secondary)",
        position: "relative",
      }}
    >
      <Header onToggleSidebar={() => setShowSidebar(!showSidebar)} />

      {showSidebar && <Sidebar />}

      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "6rem 2rem 2rem",
          marginLeft: showSidebar ? "250px" : "0",
          transition: "margin-left 0.3s ease",
        }}
      >
        <h1>Placeholder here</h1>
        {/* Add your home page content here */}
      </div>
    </div>
  );
}

export default HomePage;
