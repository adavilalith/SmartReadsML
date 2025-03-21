import React from "react";

export default function Footer() {
  const footerStyle = {
    backgroundColor: "#f8f9fa",
    color: "#6c757d",
    fontSize: "14px",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #dee2e6",
  };

  const lightTextStyle = { color: "#adb5bd" };
  const linkStyle = { color: "#007bff", textDecoration: "none" };

  return (
    <footer style={footerStyle}>
      <div>
        <span style={lightTextStyle}>NovelNavigator © 2024 </span>
        <a href="https://novelnavigator.com" style={linkStyle}>
          NovelNavigator
        </a>
        .
      </div>
      <div>
        Powered by{" "}
        <a href="https://chai.com" style={linkStyle}>
          Chai
        </a>
      </div>
    </footer>
  );
}
