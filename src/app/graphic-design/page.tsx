// app/graphic-design/page.tsx
"use client";

import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import Toolbar from "../../components/Toolbar";

// === Theme ===
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

// === Styled Components ===
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${theme.colors.background};
  color: ${theme.colors.textPrimary};
  font-family: "Montserrat", sans-serif;
  padding-left: 80px;

  @media (max-width: 900px) {
    padding-left: 60px;
  }
`;

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 85vh;
  overflow: hidden;
  background: ${theme.colors.background};
`;

const HeroImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.85;
`;

const HeroText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
  padding: 2.5rem;
  border-radius: 10px;
  background: rgba(255, 111, 97, 0.9); // Slightly transparent coral
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
  color: ${theme.colors.background}; // Contrast with background
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  margin: 0;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.6rem;
  color: ${theme.colors.accent};
  margin-top: 1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const Section = styled.section`
  margin-bottom: 3.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.accent};
  margin-bottom: 1.5rem;
  border-bottom: 2px solid ${theme.colors.highlight};
  padding-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const LargeText = styled.div`
  font-size: 1.25rem;
  color: ${theme.colors.textPrimary};
  line-height: 1.8;
  margin-bottom: 2rem;

  & > p {
    margin: 0;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Card = styled.div<{ $isOpen: boolean }>`
  background: ${theme.colors.cardBackground};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  border: 1px solid ${theme.colors.accent};
`;

const CardTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: ${theme.colors.accent};
`;

const CardDescription = styled.div<{ $isOpen: boolean }>`
  font-size: 1rem;
  color: ${theme.colors.textPrimary};
  line-height: 1.6;
  margin-top: ${({ $isOpen }) => ($isOpen ? "1rem" : "0")};
  max-height: ${({ $isOpen }) => ($isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;

  & > p {
    margin: 0;
  }
`;

const DiveDeeperButton = styled.button`
  background: none;
  border: 1px solid ${theme.colors.accent};
  color: ${theme.colors.accent};
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: ${theme.colors.accent};
    color: ${theme.colors.background};
  }
`;

const TopicCard: React.FC<{
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ title, description, isOpen, onToggle }) => {
  return (
    <Card $isOpen={isOpen}>
      <CardTitle>{title}</CardTitle>
      <CardDescription $isOpen={isOpen}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  style={vscDarkPlus}
                  customStyle={{
                    marginTop: "1rem",
                    borderRadius: "4px",
                    padding: "1rem",
                    backgroundColor: "#1e1e1e",
                  }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {description}
        </ReactMarkdown>
      </CardDescription>
      <DiveDeeperButton onClick={onToggle}>
        {isOpen ? "Collapse" : "Dive Deeper"}
      </DiveDeeperButton>
    </Card>
  );
};

// === Main Component ===
export default function GraphicDesign() {
  const [openTopics, setOpenTopics] = useState<{ [key: number]: boolean }>({});

  const toggleTopic = (index: number) => {
    setOpenTopics((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const sections = [
    {
      title: "Introduction to Graphic Design",
      largeText:
        "Graphic design is more than just aesthetics—it's about solving problems through visual communication. Whether you're crafting a logo, designing a poster, or building a website, the principles remain the same: clarity, impact, and intent. This page dives into advanced techniques, but let’s start with why it matters.\n\nDesign influences how people perceive information. A well-designed layout can make complex ideas simple, while poor design can confuse or alienate. Tools like Figma empower you to experiment and iterate quickly, bridging the gap between creativity and execution.",
    },
    {
      title: "Core Principles",
      largeText:
        "Before diving into specifics, understand the backbone of graphic design:\n\n- **Balance**: Distribute elements to create stability.\n- **Contrast**: Highlight differences to draw attention.\n- **Alignment**: Organize content for readability.\n- **Proximity**: Group related items to show relationships.\n\nThese principles guide every decision, from typography to layout. They’re universal, whether you’re working in Figma, Photoshop, or pen and paper.",
      topics: [
        {
          title: "Visual Hierarchy",
          description:
            "Visual hierarchy directs the viewer’s eye through a design in a deliberate order. Size, color, and spacing are your tools.\n\n**In Figma:**\n1. Create a frame (F) at 1440x900px.\n2. Add a bold title (T, 48px, `#2E2E2E`).\n3. Place a subtitle below (24px, `#4A4A4A`).\n4. Add body text (16px, `#7A7A7A`).\n5. Use the Layout Grid (Shift+Ctrl+4) to adjust spacing.\n\n**Why it works:** Larger elements signal importance, while spacing separates sections, making the design scannable.",
        },
        {
          title: "Contrast and Emphasis",
          description:
            "Contrast creates focus. Use it to make key elements pop.\n\n**In Figma:**\n1. Draw a circle (O) and fill it with `#FF6F61`.\n2. Overlay text (T) in `#FDF6E3` at 24px.\n3. Add a subtle drop shadow (Effects > Drop Shadow).\n4. Adjust opacity to balance the effect.\n\n**Pro Tip:** High contrast works for CTAs, but subtle contrast adds sophistication to backgrounds or secondary elements.",
        },
      ],
    },
    {
      title: "Layout Techniques",
      largeText:
        "Layouts are the skeleton of your design. A strong layout ensures content is digestible and visually appealing. Two key approaches dominate modern design: grid systems and modular design.\n\nGrids provide structure, while modular design allows flexibility. Both can be explored in Figma with its built-in tools like Layout Grid and Auto Layout.",
      topics: [
        {
          title: "Grid Systems",
          description:
            "Grids impose order on chaos, aligning elements consistently.\n\n**In Figma:**\n1. Enable the grid (Shift+Ctrl+4).\n2. Set a 12-column grid (Preferences > Layout Grid).\n3. Draw rectangles (R) aligned to columns.\n4. Use Auto Layout (Shift+A) to stack elements with equal spacing.\n\n**Applications:** Websites, posters, and magazines rely on grids for harmony. A 12-column grid is versatile for responsive design.",
        },
        {
          title: "Modular Design",
          description:
            "Modular design breaks layouts into reusable blocks.\n\n**In Figma:**\n1. Create a card (R, 300x200px, `#ECE5CE`).\n2. Add text (T) and an image placeholder.\n3. Turn it into a component (Ctrl+Alt+K).\n4. Duplicate (Ctrl+D) and tweak instances.\n\n**Benefits:** Speeds up workflows and ensures consistency across pages.",
        },
      ],
    },
    {
      title: "Adding Depth and Texture",
      largeText:
        "Flat design is clean, but depth and texture add personality. Shadows, gradients, and subtle textures can elevate your work without overwhelming it. Figma’s effects and layer blending make this easy to experiment with.",
      topics: [
        {
          title: "Shadows",
          description:
            "Shadows suggest elevation and focus.\n\n**In Figma:**\n1. Draw a rectangle (R, `#ECE5CE`).\n2. Add a drop shadow (Effects > Drop Shadow, X: 4, Y: 4, Blur: 10).\n3. Lower opacity to 20% for subtlety.\n\n**Tip:** Use multiple shadows (inner + drop) for a neumorphic effect.",
        },
        {
          title: "Gradients",
          description:
            "Gradients add vibrancy or depth.\n\n**In Figma:**\n1. Draw a shape (R or O).\n2. Select Fill > Linear Gradient.\n3. Set colors (e.g., `#FF6F61` to `#FDF6E3`).\n4. Adjust angle for flow.\n\n**Use Case:** Great for backgrounds or buttons to suggest dynamism.",
        },
      ],
    },
    {
      title: "Typography in Depth",
      largeText:
        "Typography isn’t just text—it’s a design element. Choosing the right typeface, size, and spacing can make or break your project. Aim for legibility and personality.\n\nIn Figma, you can test pairings live:\n1. Add two text layers (T).\n2. Try 'Montserrat' Bold (32px) with 'Open Sans' Regular (16px).\n3. Adjust line height (e.g., 1.5x font size) for breathing room.",
    },
  ];

  return (
    <PageContainer>
      <Toolbar />
      <HeroContainer>
        <HeroImage
          src="/graphic-design.png" // Replace with a relevant image
          alt="Graphic Design Hero"
          layout="fill"
          priority
        />
        <HeroText>
          <HeroTitle>Graphic Design</HeroTitle>
          <HeroSubtitle>Mastering the Art of Visual Communication</HeroSubtitle>
        </HeroText>
      </HeroContainer>

      <ContentContainer>
        {sections.map((section, sectionIndex) => (
          <Section key={sectionIndex}>
            <SectionTitle>{section.title}</SectionTitle>
            {section.largeText && (
              <LargeText>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return match ? (
                        <SyntaxHighlighter
                          language={match[1]}
                          style={vscDarkPlus}
                          customStyle={{
                            marginTop: "1rem",
                            borderRadius: "4px",
                            padding: "1rem",
                            backgroundColor: "#1e1e1e",
                          }}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {section.largeText}
                </ReactMarkdown>
              </LargeText>
            )}
            {section.topics &&
              section.topics.map((topic, topicIndex) => {
                const globalIndex = sectionIndex * 100 + topicIndex;
                return (
                  <TopicCard
                    key={globalIndex}
                    title={topic.title}
                    description={topic.description}
                    isOpen={!!openTopics[globalIndex]}
                    onToggle={() => toggleTopic(globalIndex)}
                  />
                );
              })}
          </Section>
        ))}
      </ContentContainer>
    </PageContainer>
  );
}