// app/layout.tsx
import "./globals.css";
import Toolbar from "../components/Toolbar";
import StyledComponentsRegistry from "./styled-components-registry";

// Metadata for the application
export const metadata = {
  title: "Composition - Your Graphic Design Learning Companion",
  description: "Your learning companion for mastering Figma, graphic design, and essential resources.",
  icons: {
    icon: "/favicon.ico",
  },
};

// Separate viewport export
export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

// RootLayout component with TypeScript typing
const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body
        style={{
          marginLeft: "0px", // Offset for toolbar width
          minHeight: "100vh",
        }}
      >
        <StyledComponentsRegistry>
          <Toolbar />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;