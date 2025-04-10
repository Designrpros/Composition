// app/layout.tsx
import "./globals.css";
import ClientLayout from "./ClientLayout"; // New client-side wrapper
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
          margin: 0,
          minHeight: "100vh",
        }}
      >
        <StyledComponentsRegistry>
          <ClientLayout>{children}</ClientLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;