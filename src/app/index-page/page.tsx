// app/index-page/page.tsx
"use client";

import { useState } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Toolbar from "../../components/Toolbar";

// === Theme (Minimal Use) ===
const theme = {
  colors: {
    background: "#FDF6E3",
    textPrimary: "#4A4A4A",
    textSecondary: "#7A7A7A",
    accent: "#2E2E2E",
    cardBackground: "#ECE5CE",
    highlight: "#FF6F61",
  },
};

// === Styled Components (Inspired by Music Index) ===
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${theme.colors.background};
  color: ${theme.colors.textPrimary};
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 5rem 1rem 1rem 100px; /* Offset for fixed toolbar */

  @media (max-width: 768px) {
    padding: 5rem 1rem 1rem 80px; /* Adjust for mobile toolbar */
  }
`;

const ContentContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: 0rem;
  scroll-margin-top: 4rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.accent};
  margin: 0;
  border-bottom: 1px solid ${theme.colors.textSecondary};
  padding-bottom: 0.2rem;
`;

const ToggleIcon = styled.span`
  font-size: 1.2rem;
  color: ${theme.colors.textSecondary};
`;

const SectionText = styled.p`
  font-size: 0.75rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.4;
  margin-bottom: 0.75rem;
`;

const SectionContent = styled.div<{ isOpen: boolean }>`
  padding: ${({ isOpen }) => (isOpen ? "0.5rem 0" : "0")};
  height: ${({ isOpen }) => (isOpen ? "auto" : "0")};
  overflow: hidden;
`;

const SectionList = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 0;
`;

const ListItem = styled.li`
  font-size: 0.75rem;
  color: ${theme.colors.textPrimary};
  line-height: 1.4;
  margin-bottom: 0.5rem;
`;

const HighlightedText = styled.span`
  background-color: ${theme.colors.accent};
  color: ${theme.colors.background};
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-weight: 600;
`;

// === Main Component ===
export default function IndexPage() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    alignment: false,
    contrast: false,
    frame: false,
    typography: false,
    "color-theory": false,
    hierarchy: false,
    grid: false,
    components: false,
    prototyping: false,
    "auto-layout": false,
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const glossary = [
    {
      id: "alignment",
      title: "Alignment",
      preview: "Positioning elements to create order and balance in your design.",
      details: [
        { highlight: "Types:", text: "Left, right, center, or justified alignment." },
        { highlight: "In Figma:", text: "Use the Align tools (top bar) to snap elements." },
        { text: "Example: Align text and icons in a button for a clean look." },
        { text: "Tip: Enable Layout Grid (Shift+Ctrl+4) to align precisely." },
      ],
    },
    {
      id: "contrast",
      title: "Contrast",
      preview: "Using differences in color, size, or shape to draw attention.",
      details: [
        { highlight: "Methods:", text: "Color (e.g., `#FF6F61` vs. `#FDF6E3`), size, or weight." },
        { highlight: "In Figma:", text: "Fill a circle with `#FF6F61` and text with `#FDF6E3`." },
        { text: "Example: Bold headlines vs. light body text." },
        { text: "Tip: Check contrast ratios with plugins like Stark." },
      ],
    },
    {
      id: "frame",
      title: "Frame",
      preview: "Figma’s version of an artboard for organizing designs.",
      details: [
        { highlight: "Purpose:", text: "Group elements like a webpage or app screen." },
        { highlight: "In Figma:", text: "Press F to create (e.g., 1440x900px)." },
        { text: "Example: Nest a header frame within a main frame." },
        { text: "Tip: Use frames over groups for responsive design." },
      ],
    },
    {
      id: "typography",
      title: "Typography",
      preview: "The art of arranging text for readability and impact.",
      details: [
        { highlight: "Elements:", text: "Font, size, weight, spacing (e.g., ‘Montserrat’ at 24px)." },
        { highlight: "In Figma:", text: "Add text (T), set to `#4A4A4A`." },
        { text: "Example: Pair ‘Montserrat’ Bold with ‘Open Sans’ Regular." },
        { text: "Tip: Keep text sizes consistent (e.g., 16px body, 24px headers)." },
      ],
    },
    {
      id: "color-theory",
      title: "Color Theory",
      preview: "Understanding how colors influence mood and attention.",
      details: [
        { highlight: "Basics:", text: "Warm colors (e.g., `#FF6F61`) energize; cool colors (e.g., `#2E2E2E`) calm." },
        { highlight: "In Figma:", text: "Create a palette (`#FF6F61`, `#FDF6E3`)." },
        { text: "Example: Use complementary colors for contrast (orange and blue)." },
        { text: "Tip: Use Figma’s color picker to sample inspiration." },
      ],
    },
    {
      id: "hierarchy",
      title: "Visual Hierarchy",
      preview: "Guiding the viewer’s eye with size, color, and spacing.",
      details: [
        { highlight: "Tools:", text: "Size (e.g., 48px titles), color, position." },
        { highlight: "In Figma:", text: "Set a title (48px, `#2E2E2E`)." },
        { text: "Example: Larger text for headlines, smaller for details." },
        { text: "Tip: Use spacing to separate sections clearly." },
      ],
    },
    {
      id: "grid",
      title: "Grid",
      preview: "A system for aligning elements consistently.",
      details: [
        { highlight: "Types:", text: "12-column grids are common for web design." },
        { highlight: "In Figma:", text: "Enable Layout Grid (Shift+Ctrl+4)." },
        { text: "Example: Space elements 16px apart in a 12-column grid." },
        { text: "Tip: Use Auto Layout (Shift+A) for dynamic spacing." },
      ],
    },
    {
      id: "components",
      title: "Components",
      preview: "Reusable design elements in Figma, like buttons or icons.",
      details: [
        { highlight: "Creation:", text: "Design a button, right-click > Create Component." },
        { highlight: "In Figma:", text: "Edit the main component, instances update." },
        { text: "Example: A button with hover and default states." },
        { text: "Tip: Use variants for multiple states (e.g., hover, active)." },
      ],
    },
    {
      id: "prototyping",
      title: "Prototyping",
      preview: "Creating interactive mockups in Figma.",
      details: [
        { highlight: "Process:", text: "Link frames with connectors in Prototype mode." },
        { highlight: "In Figma:", text: "Add a button, connect to another frame." },
        { text: "Example: Link a ‘Sign Up’ button to a form frame." },
        { text: "Tip: Use Smart Animate for smooth transitions." },
      ],
    },
    {
      id: "auto-layout",
      title: "Auto Layout",
      preview: "Figma’s tool for dynamic, responsive layouts.",
      details: [
        { highlight: "Features:", text: "Spacing, direction, padding control." },
        { highlight: "In Figma:", text: "Select items, press Shift+A." },
        { text: "Example: Stack buttons vertically with consistent gaps." },
        { text: "Tip: Use it for lists or forms to save time." },
      ],
    },
  ];

  return (
    <PageContainer>
      <MainContent>
        <ContentContainer>
          {glossary.map((entry) => (
            <Section key={entry.id} id={entry.id}>
              <SectionHeader onClick={() => toggleSection(entry.id)}>
                <SectionTitle>{entry.title}</SectionTitle>
                <ToggleIcon>
                  {openSections[entry.id] ? "−" : "+"}
                </ToggleIcon>
              </SectionHeader>
              <SectionText>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {entry.preview}
                </ReactMarkdown>
              </SectionText>
              <SectionContent isOpen={openSections[entry.id]}>
                <SectionList>
                  {entry.details.map((item, index) => (
                    <ListItem key={index}>
                      {item.highlight && (
                        <HighlightedText>{item.highlight}</HighlightedText>
                      )}{" "}
                      {item.text}
                    </ListItem>
                  ))}
                </SectionList>
              </SectionContent>
            </Section>
          ))}
        </ContentContainer>
      </MainContent>
    </PageContainer>
  );
}