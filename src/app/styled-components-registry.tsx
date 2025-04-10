// src/app/StyledComponentsRegistry.tsx
"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only create stylesheet once with lazy initial state
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag(); // Clear styles after injection to prevent duplicates
    return <>{styles}</>;
  });

  // If on client-side (after hydration), render children directly
  if (typeof window !== "undefined") {
    return <>{children}</>;
  }

  // On server-side, wrap children with StyleSheetManager
  return <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>;
}