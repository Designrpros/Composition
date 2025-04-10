"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

// === Styled Components ===
const ToolbarContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 80px;
  background-color: #2E2E2E;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  z-index: 1200;
  border-radius: 0 12px 12px 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.5s ease-out;

  @keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }

  @media (max-width: 900px) {
    width: ${({ $isOpen }) => ($isOpen ? "200px" : "60px")};
    height: ${({ $isOpen }) => ($isOpen ? "100vh" : "auto")};
    border-radius: ${({ $isOpen }) => ($isOpen ? "0" : "0 12px 12px 0")};
    padding: ${({ $isOpen }) => ($isOpen ? "2rem 1rem" : "0.75rem 0")};
    transition: width 0.3s ease, padding 0.3s ease;
  }
`;

const NavLinks = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
  justify-content: center;

  @media (max-width: 900px) {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    width: 100%;
    align-items: flex-start;
    padding-left: 1rem;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  color: #FDF6E3;
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease-in-out;
  position: relative;

  &:hover {
    color: #FF6F61;
  }

  ${({ $isActive }) =>
    $isActive &&
    `
    color: #FF6F61;
    &::after {
      content: '';
      position: absolute;
      right: -10px;
      width: 4px;
      height: 100%;
      background: #FF6F61;
      border-radius: 2px;
    }
  `}

  @media (max-width: 900px) {
    flex-direction: row;
    align-items: center;
    font-size: 1rem;
    padding: 1rem;
    width: 100%;
    gap: 1rem;
    ${({ $isActive }) =>
      $isActive &&
      `
      &::after {
        display: none; // Hide vertical bar in burger menu
      }
    `}
  }
`;

const Tooltip = styled.span`
  position: absolute;
  left: 90px;
  background: #2E2E2E;
  color: #FDF6E3;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease;
  pointer-events: none;

  ${NavLink}:hover & {
    opacity: 1;
    visibility: visible;
  }

  @media (max-width: 900px) {
    display: none; // Tooltips not needed in burger menu
  }
`;

const BurgerIcon = styled.div<{ $isOpen: boolean }>`
  display: none;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  padding: 1rem;
  z-index: 1300;

  @media (max-width: 900px) {
    display: flex;
  }

  div {
    width: 30px;
    height: 3px;
    background-color: #FDF6E3;
    border-radius: 3px;
    transition: all 0.3s ease-in-out;
  }

  div:nth-child(1) {
    transform: ${({ $isOpen }) =>
      $isOpen ? "rotate(45deg) translate(8px, 8px)" : "rotate(0)"};
  }

  div:nth-child(2) {
    opacity: ${({ $isOpen }) => ($isOpen ? "0" : "1")};
  }

  div:nth-child(3) {
    transform: ${({ $isOpen }) =>
      $isOpen ? "rotate(-45deg) translate(8px, -8px)" : "rotate(0)"};
  }
`;

// === Toolbar Component ===
export default function Toolbar() {
  const [activeTab, setActiveTab] = useState<string | null>("home");
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
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

  // Prevent double animation on hydration
  useEffect(() => {
    // Ensure state is set only on client-side to avoid hydration mismatch
    if (typeof window !== "undefined") {
      setActiveTab(window.location.pathname === "/" ? "home" : window.location.pathname.slice(1) || "home");
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <ToolbarContainer $isOpen={isOpen}>
      <BurgerIcon $isOpen={isOpen} onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </BurgerIcon>
      <NavLinks $isOpen={isOpen}>
        {tabs.map((tab) => (
          <NavLink
            key={tab.id}
            href={tab.href}
            $isActive={activeTab === tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setIsOpen(false); // Close menu on link click
            }}
          >
            <Image
              src={tab.icon}
              alt={`${tab.label} icon`}
              width={24}
              height={24}
              style={{ filter: "invert(1)" }}
            />
            <span>{isOpen && window.innerWidth <= 900 ? tab.label : tab.label.charAt(0)}</span>
            <Tooltip>{tab.label}</Tooltip>
          </NavLink>
        ))}
      </NavLinks>
    </ToolbarContainer>
  );
}