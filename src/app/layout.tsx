// app/layout.tsx
import React from "react";
import "./globals.css";
import Toolbar from "../components/Toolbar";
import StyledComponentsRegistry from "./styled-components-registry";
import ClientErrorBoundaryWrapper from "../components/ClientErrorBoundary";

export const metadata = {
  title: "Composition - Your Graphic Design Learning Companion",
  description: "Your learning companion for mastering Figma, graphic design, and essential resources.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
        }}
      >
        <StyledComponentsRegistry>
          <ClientErrorBoundaryWrapper>
            <Toolbar />
            {children}
          </ClientErrorBoundaryWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;