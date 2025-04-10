// app/layout.tsx
import React, { useState } from "react";
import "./globals.css";
import Toolbar from "../components/Toolbar";
import StyledComponentsRegistry from "./styled-components-registry";

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

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Client-side error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children; // Fixed: Use this.props.children instead of this.state.children
  }
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
        }}
      >
        <StyledComponentsRegistry>
          <ErrorBoundary>
            <Toolbar isOpen={isOpen} setIsOpen={setIsOpen} />
            {React.Children.map(children, (child) =>
              React.isValidElement(child) && typeof child.type !== "string"
                ? React.cloneElement(child, { isOpen } as { isOpen: boolean })
                : child
            )}
          </ErrorBoundary>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;