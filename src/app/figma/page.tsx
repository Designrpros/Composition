// app/figma/page.tsx
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
  box-sizing: border-box;
  overflow-x: hidden;

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
  background: rgba(255, 111, 97, 0.9);
  width: 90%;
  max-width: 800px;
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
  padding: 3rem 0;
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
  padding: 0 2rem;
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
  transition: background 0.25s ease;

  &:hover {
    background: transparent; /* Remove background on hover */
  }

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
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
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
  description: string;
  isOpen: boolean;
  onToggle: () => void;
  subPagePath: string;
}> = ({ title, description, isOpen, onToggle, subPagePath }) => {
  return (
    <Card $isOpen={isOpen}>
      <CardHeader onClick={onToggle}>
        <CardTitle>{title}</CardTitle>
        <ToggleIcon>{isOpen ? "−" : "+"}</ToggleIcon>
      </CardHeader>
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
export default function Figma() {
  const [openTopics, setOpenTopics] = useState<{ [key: number]: boolean }>({});

  const toggleTopic = (index: number) => {
    setOpenTopics((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const sections = [
    {
      title: "Getting Started with Figma",
      largeText:
        "Figma is a cloud-based design tool that combines powerful vector editing with real-time collaboration. Unlike traditional software like Photoshop, Figma runs in your browser, making it accessible anywhere. It’s perfect for graphic design, UI/UX, and prototyping—all in one place.\n\nTo begin, sign up at [figma.com](https://www.figma.com) and create a new file. You’ll see a blank canvas with a toolbar on the left and panels on the right. Don’t worry—it’s intuitive once you start exploring.",
    },
    {
      title: "Essential Tools and Shortcuts",
      largeText:
        "Figma’s interface is streamlined for efficiency. Here’s a quick rundown of the basics:\n\n- **Move Tool (V)**: Select and drag objects.\n- **Frame Tool (F)**: Create artboards or containers.\n- **Rectangle (R)**, **Ellipse (O)**, **Text (T)**: Basic shapes and text.\n- **Zoom**: Ctrl + scroll (Cmd + scroll on Mac).\n\nThese tools cover 80% of your workflow. The rest comes with practice and shortcuts, which we’ll explore further.",
      topics: [
        {
          title: "Mastering Frames",
          description:
            "Frames are Figma’s version of artboards, but smarter.\n\n**How to Use:**\n1. Press F and draw a frame (e.g., 1440x900px for desktop).\n2. Add shapes (R) or text (T) inside.\n3. Rename it in the Layers panel (left sidebar).\n4. Nest frames for complex layouts.\n\n**Why it’s Useful:** Frames support constraints and layouts, making responsive design a breeze.",
          subPagePath: "/figma/mastering-frames",
        },
        {
          title: "Key Shortcuts",
          description:
            "Speed up your work with these:\n\n- **Ctrl+D (Cmd+D)**: Duplicate.\n- **Shift+A**: Auto Layout.\n- **Alt (Option)**: Measure distances.\n- **Ctrl+G (Cmd+G)**: Group.\n\n**Practice:** Create a rectangle, duplicate it 5 times, and align them using the top toolbar.",
          subPagePath: "/figma/key-shortcuts",
        },
      ],
    },
    {
      title: "Components and Variants",
      largeText:
        "Components are reusable building blocks in Figma, like buttons or icons. Variants take it further by letting you manage states (e.g., default, hover) in one place. This is a game-changer for design systems and consistency across projects.",
      topics: [
        {
          title: "Creating Components",
          description:
            "Turn any element into a component:\n\n1. Design a button (R + T, e.g., 120x40px, `#FF6F61`).\n2. Right-click > Create Component (Ctrl+Alt+K).\n3. Duplicate (Ctrl+D) and edit instances.\n\n**Pro Tip:** Changes to the main component update all instances instantly.",
          subPagePath: "/figma/creating-components",
        },
        {
          title: "Using Variants",
          description:
            "Manage multiple states:\n\n1. Select your component.\n2. Open the Variants panel (right sidebar).\n3. Add a variant (e.g., hover: `#FF8A75`).\n4. Switch between them in the instance.\n\n**Use Case:** Perfect for buttons, toggles, or navigation items.",
          subPagePath: "/figma/using-variants",
        },
      ],
    },
    {
      title: "Prototyping in Figma",
      largeText:
        "Figma’s prototyping tools let you create interactive mockups without extra software. Link frames, add transitions, and test flows—all within the same file. It’s ideal for pitching ideas or testing usability.",
      topics: [
        {
          title: "Basic Prototyping",
          description:
            "Link two screens:\n\n1. Create two frames (F).\n2. Add a button (R + T) to the first.\n3. Switch to Prototype mode (top-right tab).\n4. Drag a connector from the button to the second frame.\n5. Set interaction to ‘On Click’ with a ‘Smart Animate’ transition.\n\n**Test It:** Click the Play button to preview.",
          subPagePath: "/figma/basic-prototyping",
        },
        {
          title: "Advanced Interactions",
          description:
            "Add polish with triggers:\n\n1. Create a dropdown menu (multiple rectangles).\n2. In Prototype mode, set ‘On Hover’ to reveal options.\n3. Use ‘Open Overlay’ for pop-ups.\n\n**Why It Matters:** Mimics real app behavior for stakeholder demos.",
          subPagePath: "/figma/advanced-interactions",
        },
      ],
    },
    {
      title: "Collaboration and Sharing",
      largeText:
        "Figma shines in team settings. Multiple designers can work on the same file simultaneously, like Google Docs for design. Share links, gather feedback, and even embed prototypes—all without exporting.",
      topics: [
        {
          title: "Real-Time Collaboration",
          description:
            "Work together live:\n\n1. Click Share (top-right).\n2. Invite teammates via email or link.\n3. Watch cursors move in real-time.\n\n**Tip:** Use avatars to see who’s editing what.",
          subPagePath: "/figma/real-time-collaboration",
        },
        {
          title: "Comments and Feedback",
          description:
            "Streamline reviews:\n\n1. Press C to add a comment.\n2. Pin it to a specific element.\n3. Tag teammates with @mentions.\n\n**Benefit:** Keeps feedback contextual and actionable.",
          subPagePath: "/figma/comments-and-feedback",
        },
      ],
    },
    {
      title: "Plugins and Community",
      largeText:
        "Figma’s ecosystem extends its power. Plugins automate tasks, and the Community offers free resources like templates and icons. Explore them via the top menu (Community > Plugins).",
      topics: [
        {
          title: "Top Plugins",
          description:
            "Enhance your workflow:\n\n- **Unsplash**: Insert free images.\n- **Content Reel**: Add dummy text/icons.\n- **Auto Layout**: Dynamic resizing.\n\n**Install:** Search in Plugins, click ‘Install’, and access via the right-click menu.",
          subPagePath: "/figma/top-plugins",
        },
      ],
    },
  ];

  return (
    <PageContainer>
      <Toolbar />
      <HeroContainer>
        <HeroImage
          src="/figma-logo.svg" // Replace with a Figma-themed image
          alt="Figma Hero"
          layout="fill"
          priority
        />
        <HeroText>
          <HeroTitle>Figma</HeroTitle>
          <HeroSubtitle>Your All-in-One Design Powerhouse</HeroSubtitle>
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
                    subPagePath={topic.subPagePath || "/figma"} // Fallback if no sub-page
                  />
                );
              })}
          </Section>
        ))}
      </ContentContainer>
    </PageContainer>
  );
}