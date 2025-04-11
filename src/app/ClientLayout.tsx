// app/ClientLayout.tsx
"use client";

import React, { useState } from "react";
import Toolbar from "../components/Toolbar";

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen] = useState(false);

  return (
    <>
      <Toolbar />
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { isOpen } as { isOpen: boolean })
          : child
      )}
    </>
  );
};

export default ClientLayout;