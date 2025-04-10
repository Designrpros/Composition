// app/page.tsx (assuming this is the home page)
"use client";

import Image from "next/image";
import styled from "styled-components";
import { useState } from "react";

// === Theme ===
const theme = {
  colors: {
    background: "#FDF6E3",
    accent: "#2E2E2E",
    textPrimary: "#4A4A4A",
    textSecondary: "#7A7A7A",
    highlight: "#FF6F61",
  },
};

// === Styled Components ===
interface PageContainerProps {
  isOpen?: boolean;
}

const PageContainer = styled.div<PageContainerProps>`
  display: grid;
  grid-template-rows: 1fr auto; /* Main content and footer */
  min-height: 100vh;
  background: ${theme.colors.background};
  font-family: "Montserrat", sans-serif;
  padding: 2rem 2rem 2rem 80px; /* Matches Toolbar desktop width */
  overflow-x: hidden; /* Prevent horizontal scroll */

  @media (max-width: 900px) {
    padding-left: ${({ isOpen }) => (isOpen ? "200px" : "60px")}; /* Sync with Toolbar mobile */
    transition: padding-left 0.25s ease; /* Smooth transition with Toolbar */
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem 1.5rem 60px; /* Tighter padding for mobile */
  }

  @media (max-width: 480px) {
    padding: 1rem 1rem 1rem 60px; /* Even tighter for small screens */
  }
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  text-align: center;
  padding: 2rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  color: ${theme.colors.accent};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0;
  line-height: 1.2;

  /* Simplified animation for performance */
  opacity: 1;
  transform: translateY(0);
  animation: fadeIn 0.8s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 900px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: ${theme.colors.textSecondary};
  max-width: 600px;
  line-height: 1.6;
  margin: 0;

  @media (max-width: 900px) {
    font-size: 1.3rem;
    max-width: 500px;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    max-width: 400px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    max-width: 300px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
    margin-top: 1.5rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    margin-top: 1rem;
  }
`;

const ActionButton = styled.a<{ primary?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 50px;
  background: ${({ primary }) => (primary ? theme.colors.highlight : "transparent")};
  color: ${({ primary }) => (primary ? "#FFFFFF" : theme.colors.accent)};
  border: 2px solid ${({ primary }) => (primary ? theme.colors.highlight : theme.colors.accent)};
  transition: background 0.25s ease, color 0.25s ease; /* Simplified for performance */
  cursor: pointer;

  &:hover {
    background: ${({ primary }) => (primary ? "#FF8A75" : theme.colors.accent)};
    color: ${theme.colors.background};
  }

  @media (max-width: 900px) {
    padding: 0.7rem 1.3rem;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    width: 100%; /* Full width on small screens */
    max-width: 250px;
  }
`;

const DesignBlob = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 111, 97, 0.3), transparent);
  border-radius: 50%;
  filter: blur(50px);
  z-index: -1;
  top: 10%;
  left: 20%;

  /* Simplified animation */
  animation: float 6s infinite ease-in-out;

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @media (max-width: 900px) {
    width: 250px;
    height: 250px;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    left: 15%;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
    top: 5%;
    left: 10%;
  }
`;

const Footer = styled.footer`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  color: ${theme.colors.textSecondary};

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 0.75rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
  }
`;

const FooterLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.textPrimary};
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.25s ease;

  &:hover {
    color: ${theme.colors.highlight};
    text-decoration: underline;
    text-decoration-offset: 4px;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    width: 100%;
    justify-content: center;
  }
`;

// === Main Component ===
export default function Composition() {
  const [hovered, setHovered] = useState(false);

  return (
    <PageContainer>
      <MainContent>
        <DesignBlob />
        <Image
          src="/composition-logo.png" // Replace with your custom logo
          alt="Composition logo"
          width={200}
          height={200}
          priority
          style={{
            filter: hovered ? "drop-shadow(0 0 10px rgba(255, 111, 97, 0.5))" : "none",
            transition: "filter 0.25s ease", // Smooth hover effect
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
        <HeroTitle>Composition</HeroTitle>
        <HeroSubtitle>
          Your learning companion for mastering Figma, graphic design, and essential resources.
        </HeroSubtitle>
        <ButtonContainer>
          <ActionButton
            primary
            href="/basics"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            Explore Resources
          </ActionButton>
          <ActionButton
            href="https://www.figma.com/community"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/figma-icon.svg" // Replace with Figma icon
              alt="Figma icon"
              width={20}
              height={20}
            />
            Figma Community
          </ActionButton>
        </ButtonContainer>
      </MainContent>
      <Footer>
        <FooterLink href="https://dribbble.com/" target="_blank" rel="noopener noreferrer">
          <Image
            src="/dribbble-icon.svg" // Replace with Dribbble icon
            alt="Dribbble icon"
            width={16}
            height={16}
          />
          Dribbble
        </FooterLink>
        <FooterLink href="https://www.awwwards.com/" target="_blank" rel="noopener noreferrer">
          <Image
            src="/awwwards-icon.svg" // Replace with Awwwards icon
            alt="Awwwards icon"
            width={16}
            height={16}
          />
          Awwwards
        </FooterLink>
        <FooterLink href="https://fonts.google.com/" target="_blank" rel="noopener noreferrer">
          <Image
            src="/google-fonts-icon.svg" // Replace with Google Fonts icon
            alt="Google Fonts icon"
            width={16}
            height={16}
          />
          Google Fonts
        </FooterLink>
      </Footer>
    </PageContainer>
  );
}