// src/components/Toolbar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "./Toolbar.css";

interface Tab {
  id: string;
  href: string;
  icon: string;
  label: string;
}

const tabs: Tab[] = [
  { id: "home", href: "/", icon: "/composition-logo.png", label: "Home" },
  { id: "basics", href: "/basics", icon: "/basics.png", label: "Basics" },
  {
    id: "graphic-design",
    href: "/graphic-design",
    icon: "/graphic-design.png",
    label: "Graphic Design",
  },
  { id: "figma", href: "/figma", icon: "/figma-logo.svg", label: "Figma" },
  {
    id: "resources",
    href: "/resources",
    icon: "/resources.png",
    label: "Resources",
  },
  { id: "index", href: "/index-page", icon: "/index.png", label: "Index" },
];

// Toolbar Component
export default function Toolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const activeTab = pathname === "/" ? "home" : pathname.slice(1) || "home";

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="toolbar-container" data-is-open={isOpen}>
      <div className="burger-icon" data-is-open={isOpen} onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </div>
      <div className="nav-links" data-is-open={isOpen}>
        {tabs.map((tab: Tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className="nav-link"
            data-is-active={activeTab === tab.id}
            data-is-open={isOpen}
            onClick={() => setIsOpen(false)}
          >
            <Image
              src={tab.icon}
              alt={`${tab.label} icon`}
              width={24}
              height={24}
              style={{ filter: "invert(1)" }}
            />
            <span data-is-open={isOpen}>
              {isOpen && window.innerWidth <= 1200 ? tab.label : tab.label.charAt(0)}
            </span>
            <span className="tooltip">{tab.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}