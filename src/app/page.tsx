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
const PageContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
  background: ${theme.colors.background};
  font-family: "Montserrat", sans-serif;
  padding: 2rem 2rem 2rem 100px; // Offset for toolbar width
  overflow: hidden;

  @media (max-width: 768px) {
    padding-left: 80px; // Adjust for smaller toolbar on mobile
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
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  color: ${theme.colors.accent};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0;
  line-height: 1.2;
  animation: fadeIn 1s ease-in;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: ${theme.colors.textSecondary};
  max-width: 600px;
  line-height: 1.6;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
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
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: ${({ primary }) => (primary ? "#FF8A75" : theme.colors.accent)};
    color: ${theme.colors.background};
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
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
  animation: float 6s infinite ease-in-out;

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    left: 15%;
  }
`;

const Footer = styled.footer`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  color: ${theme.colors.textSecondary};
`;

const FooterLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.textPrimary};
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.colors.highlight};
    text-decoration: underline;
    text-decoration-offset: 4px;
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
          style={{ filter: hovered ? "drop-shadow(0 0 10px rgba(255, 111, 97, 0.5))" : "none" }}
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
            href="/graphic-design-resources"
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
        <FooterLink
          href="https://dribbble.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/dribbble-icon.svg" // Replace with Dribbble icon
            alt="Dribbble icon"
            width={16}
            height={16}
          />
          Dribbble
        </FooterLink>
        <FooterLink
          href="https://www.awwwards.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/awwwards-icon.svg" // Replace with Awwwards icon
            alt="Awwwards icon"
            width={16}
            height={16}
          />
          Awwwards
        </FooterLink>
        <FooterLink
          href="https://fonts.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
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