// app/basics/page.tsx
"use client";

import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import Toolbar from "../../components/Toolbar";
import Link from "next/link";

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
interface PageContainerProps {
  isOpen?: boolean;
}

const PageContainer = styled.div<PageContainerProps>`
  width: 100%;
  min-height: 100vh;
  background: ${theme.colors.background};
  color: ${theme.colors.textPrimary};
  font-family: "Montserrat", sans-serif;
  padding: 2rem 2rem 2rem 80px; /* Matches Toolbar desktop width */
  box-sizing: border-box; /* Include padding in width */
  overflow-x: hidden; /* Prevent horizontal scroll */

  @media (max-width: 900px) {
    padding-left: ${({ isOpen }) => (isOpen ? "200px" : "60px")}; /* Sync with Toolbar mobile */
    padding-right: 1.5rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    transition: padding-left 0.25s ease;
  }

  @media (max-width: 768px) {
    padding-left: 60px; /* Default to closed Toolbar */
    padding-right: 1.5rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    padding-left: 60px;
    padding-right: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  @media (max-width: 360px) {
    padding-left: 60px;
    padding-right: 0.75rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
`;

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 85vh;
  overflow: hidden;
  background: ${theme.colors.background};

  @media (max-width: 900px) {
    height: 70vh;
  }

  @media (max-width: 768px) {
    height: 60vh;
  }

  @media (max-width: 480px) {
    height: 50vh;
  }

  @media (max-width: 360px) {
    height: 40vh;
  }
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
  background: rgba(255, 111, 97, 0.9);
  width: 90%; /* Prevent overflow */
  max-width: 800px; /* Cap width */
  box-sizing: border-box;

  @media (max-width: 900px) {
    padding: 2rem;
    max-width: 700px;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 600px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    max-width: 100%;
    width: 85%;
  }

  @media (max-width: 360px) {
    padding: 0.75rem;
    width: 80%;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
  color: ${theme.colors.background};
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  margin: 0;
  line-height: 1.1;

  @media (max-width: 900px) {
    font-size: 3.5rem;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }

  @media (max-width: 360px) {
    font-size: 1.8rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.6rem;
  color: ${theme.colors.accent};
  margin-top: 1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  line-height: 1.4;

  @media (max-width: 900px) {
    font-size: 1.4rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-top: 0.5rem;
  }

  @media (max-width: 360px) {
    font-size: 0.9rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 0; /* Remove horizontal padding, rely on PageContainer */
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 900px) {
    padding: 2.5rem 0;
  }

  @media (max-width: 768px) {
    padding: 2rem 0;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 0;
  }

  @media (max-width: 360px) {
    padding: 1rem 0;
  }
`;

const Section = styled.section`
  margin-bottom: 3.5rem;
  padding: 0 2rem; /* Inner padding for content */
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 900px) {
    margin-bottom: 3rem;
    padding: 0 1.5rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
    padding: 0 1.5rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 2rem;
    padding: 0 1rem;
  }

  @media (max-width: 360px) {
    margin-bottom: 1.5rem;
    padding: 0 0.75rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.accent};
  margin-bottom: 1.5rem;
  border-bottom: 2px solid ${theme.colors.highlight};
  padding-bottom: 0.5rem;

  @media (max-width: 900px) {
    font-size: 2.2rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 360px) {
    font-size: 1.6rem;
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

  @media (max-width: 900px) {
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 360px) {
    font-size: 0.85rem;
  }
`;

const Card = styled.div<{ $isOpen: boolean }>`
  background: ${theme.colors.cardBackground};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid ${theme.colors.accent};
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 900px) {
    padding: 1.3rem;
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 360px) {
    padding: 0.8rem;
  }

   &:hover {
    background: transparent;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background 0.25s ease;

  &:hover {
    background: transparent; /* Background disappears on hover */
  }
`;

const CardTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${theme.colors.accent};
  margin: 0;

  @media (max-width: 900px) {
    font-size: 1.4rem;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }

  @media (max-width: 360px) {
    font-size: 1.1rem;
  }
`;

const ToggleIcon = styled.span`
  font-size: 1.2rem;
  color: ${theme.colors.textSecondary};

  @media (max-width: 900px) {
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const CardPreview = styled.div`
  font-size: 1rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  margin-top: 0.5rem;

  @media (max-width: 900px) {
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }

  @media (max-width: 360px) {
    font-size: 0.8rem;
  }
`;

const CardDescription = styled.div<{ $isOpen: boolean }>`
  font-size: 1rem;
  color: ${theme.colors.textPrimary};
  line-height: 1.6;
  margin-top: ${({ $isOpen }) => ($isOpen ? "1rem" : "0")};
  max-height: ${({ $isOpen }) => ($isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;

  & > p {
    margin: 0;
  }

  @media (max-width: 900px) {
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }

  @media (max-width: 360px) {
    font-size: 0.8rem;
  }
`;


const HeroImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.85;
`;

const DiveDeeperLink = styled(Link)`
  display: inline-block;
  background: none;
  border: 1px solid ${theme.colors.accent};
  color: ${theme.colors.accent};
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.25s ease, color 0.25s ease;
  margin-top: 1rem;

  &:hover {
    background: ${theme.colors.accent};
    color: ${theme.colors.background};
  }

  @media (max-width: 900px) {
    font-size: 0.85rem;
    padding: 0.45rem 0.9rem;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.35rem 0.7rem;
  }

  @media (max-width: 360px) {
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
  }
`;

const TopicCard: React.FC<{
  title: string;
  preview: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
  subPagePath: string;
}> = ({ title, preview, description, isOpen, onToggle, subPagePath }) => {
  return (
    <Card $isOpen={isOpen}>
      <CardHeader onClick={onToggle}>
        <CardTitle>{title}</CardTitle>
        <ToggleIcon>{isOpen ? "−" : "+"}</ToggleIcon>
      </CardHeader>
      <CardPreview>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{preview}</ReactMarkdown>
      </CardPreview>
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
        <DiveDeeperLink href={subPagePath}>Dive Deeper</DiveDeeperLink>
      </CardDescription>
    </Card>
  );
};

// === Main Component ===
export default function Basics() {
  const [openTopics, setOpenTopics] = useState<{ [key: number]: boolean }>({});

  const toggleTopic = (index: number) => {
    setOpenTopics((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const sections = [
    {
      title: "Welcome to Design and Figma",
      largeText:
        "Graphic design is the craft of creating visuals that communicate ideas effectively. It’s about blending creativity with purpose—whether you’re designing a logo, a poster, or a website. This page introduces the essentials of graphic design and how to start with Figma, a free, cloud-based tool that makes design accessible to everyone.\n\nNo prior experience? No problem. We’ll cover the foundations and guide you through your first steps in Figma.",
    },
    {
      title: "Graphic Design Fundamentals",
      largeText:
        "Great design starts with understanding a few core concepts. These principles apply whether you’re sketching on paper or designing in Figma:\n\n- **Balance**: Distribute elements evenly for stability.\n- **Contrast**: Use differences to highlight key areas.\n- **Alignment**: Line up elements for a clean look.\n- **Proximity**: Group related items to show connections.\n\nMastering these will give your designs clarity and impact.",
      topics: [
        {
          title: "What is Graphic Design?",
          preview: "It’s the art of visual storytelling, using images, text, and colors to share ideas.",
          description:
            "Graphic design combines creativity and strategy to communicate messages visually. From advertisements to app interfaces, it shapes how we interact with the world.\n\n**Try it in Figma:**\n1. Create a new frame (F, 800x600px).\n2. Add a rectangle (R) and fill it with `#FF6F61`.\n3. Add a text layer (T) with ‘Welcome!’ in `#FDF6E3`.\n4. Move them around to see how placement affects the vibe.\n\n**Why it Matters:** Even simple shapes and text can convey mood or purpose when arranged thoughtfully.",
          subPagePath: "/basics/what-is-graphic-design",
        },
        {
          title: "Exploring Color Theory",
          preview: "Colors influence emotions and guide attention in your designs.",
          description:
            "Colors aren’t just pretty—they carry meaning. Warm colors like red excite, while cool colors like blue calm. In design, a palette ties your work together.\n\n**In Figma:**\n1. Create a circle (O, 100x100px).\n2. Fill it with `#FF6F61` (coral).\n3. Duplicate it (Ctrl+D or Cmd+D) and try `#2E2E2E` (dark gray).\n4. Place them side by side to compare their impact.\n\n**Quick Palette Idea:**\n- Primary: `#FF6F61` (coral)\n- Background: `#FDF6E3` (cream)\n- Accent: `#4A4A4A` (soft black)\n\n**Tip:** Use Figma’s color picker to sample colors from inspiration images.",
          subPagePath: "/basics/exploring-color-theory",
        },
        {
          title: "Typography Basics",
          preview: "Typography shapes how text looks and feels, affecting readability and mood.",
          description:
            "Typography is more than choosing a font—it’s about clarity and personality. A bold headline grabs attention, while body text needs to be easy to read.\n\n**In Figma:**\n1. Add a text layer (T).\n2. Choose ‘Montserrat’ from the Text panel.\n3. Set size to 24px and color to `#4A4A4A`.\n4. Duplicate it, make it 16px, and set to `#7A7A7A` for body text.\n\n**Example:** Pair a bold ‘Montserrat’ headline with a lighter ‘Open Sans’ body for hierarchy.\n\n**Pro Tip:** Keep line spacing at 1.5x the font size for readability.",
          subPagePath: "/basics/typography-basics",
        },
      ],
    },
    {
      title: "Getting Started with Figma",
      largeText:
        "Figma is a free, cloud-based design tool perfect for beginners. It runs in your browser, autosaves your work, and lets you collaborate in real-time. Think of it as a digital sketchpad with endless possibilities.\n\nTo start, go to [figma.com](https://www.figma.com), sign up, and create a new file. You’ll see a canvas with a toolbar on the left and properties on the right—don’t worry, it’s intuitive!",
      topics: [
        {
          title: "Your First Figma Design",
          preview: "Create a simple card to get comfortable with Figma’s tools.",
          description:
            "Let’s make a basic card to learn Figma’s interface:\n\n1. Draw a rectangle (R, 300x200px).\n2. Fill it with `#ECE5CE` (beige).\n3. Add a text layer (T) with ‘Hello, Figma!’ in `#2E2E2E`.\n4. Group them (Ctrl+G or Cmd+G) for organization.\n5. Use the Move tool (V) to reposition.\n\n**Why it Helps:** This introduces shapes, text, and grouping—core skills for any project.",
          subPagePath: "/basics/your-first-figma-design",
        },
        {
          title: "Frames vs. Artboards",
          preview: "Frames are Figma’s flexible canvas for organizing designs.",
          description:
            "Frames act like artboards but with more power, supporting layouts and constraints.\n\n**Try it:**\n1. Press F to create a frame (e.g., 1440x900px for a desktop layout).\n2. Add a rectangle (R) inside.\n3. Rename the frame in the Layers panel (left sidebar).\n4. Nest another frame inside for a section.\n\n**Use Case:** Frames are great for mocking up a webpage with a header, body, and footer.",
          subPagePath: "/basics/frames-vs-artboards",
        },
        {
          title: "Must-Know Shortcuts",
          preview: "Shortcuts make Figma faster and more fun to use.",
          description:
            "Figma’s shortcuts save time and keep you in the flow:\n\n- **R**: Rectangle\n- **T**: Text\n- **V**: Move tool\n- **Ctrl+D (Cmd+D)**: Duplicate\n- **Ctrl+G (Cmd+G)**: Group\n\n**Practice:**\n1. Create a circle (O).\n2. Duplicate it 3 times (Ctrl+D).\n3. Align them evenly using the top toolbar.\n\n**Bonus:** Press Ctrl + scroll (Cmd + scroll) to zoom in/out smoothly.",
          subPagePath: "/basics/must-know-shortcuts",
        },
      ],
    },
    {
      title: "Core Design Principles",
      largeText:
        "Design isn’t random—it follows principles that make visuals effective. These ideas work in Figma or any tool, helping you create designs that feel intentional and polished.",
      topics: [
        {
          title: "Layout and Composition",
          preview: "Good layouts guide the viewer’s eye smoothly across your design.",
          description:
            "Layouts organize content to tell a story. A strong layout feels natural, not cluttered.\n\n**In Figma:**\n1. Enable Layout Grid (Shift+Ctrl+4 or Shift+Cmd+4).\n2. Draw two rectangles (R) side by side.\n3. Use Align tools (top bar) to space them 16px apart.\n4. Add text (T) above one as a label.\n\n**Why it Works:** This mimics a two-column layout, common in blogs or portfolios.",
          subPagePath: "/basics/layout-and-composition",
        },
        {
          title: "Contrast for Impact",
          preview: "Contrast highlights what’s important in your design.",
          description:
            "Contrast uses differences—color, size, or shape—to draw attention.\n\n**In Figma:**\n1. Add a circle (O, `#FF6F61`).\n2. Place text (T, `#FDF6E3`, 20px) over it.\n3. Adjust the circle’s opacity to 80% for balance.\n4. Try a larger circle to see how size shifts focus.\n\n**Application:** Use contrast for buttons or headlines to make them pop.",
          subPagePath: "/basics/contrast-for-impact",
        },
        {
          title: "Proximity and Grouping",
          preview: "Grouping related items shows they belong together.",
          description:
            "Proximity ties elements visually, implying relationships.\n\n**In Figma:**\n1. Create a frame (F, 400x300px).\n2. Add two text layers (T): a title and subtitle close together.\n3. Place an image placeholder (R) farther away.\n4. Group the text layers (Ctrl+G).\n\n**Why it Helps:** Keeps designs organized and intuitive, like a form’s label and input field.",
          subPagePath: "/basics/proximity-and-grouping",
        },
      ],
    },
  ];

  return (
    <PageContainer>
      <Toolbar />
      <HeroContainer>
      <HeroImage
          src="/basics-hero.png" // Replace with a Figma-themed image
          alt="basics Hero"
          layout="fill"
          priority
        />
        <HeroText>
          <HeroTitle>Basics</HeroTitle>
          <HeroSubtitle>Start Your Design Journey with Confidence</HeroSubtitle>
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
                    preview={topic.preview}
                    description={topic.description}
                    isOpen={!!openTopics[globalIndex]}
                    onToggle={() => toggleTopic(globalIndex)}
                    subPagePath={topic.subPagePath}
                  />
                );
              })}
          </Section>
        ))}
      </ContentContainer>
    </PageContainer>
  );
}