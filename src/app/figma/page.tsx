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
  background: rgba(255, 111, 97, 0.9); // Semi-transparent coral
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
        },
        {
          title: "Key Shortcuts",
          description:
            "Speed up your work with these:\n\n- **Ctrl+D (Cmd+D)**: Duplicate.\n- **Shift+A**: Auto Layout.\n- **Alt (Option)**: Measure distances.\n- **Ctrl+G (Cmd+G)**: Group.\n\n**Practice:** Create a rectangle, duplicate it 5 times, and align them using the top toolbar.",
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
        },
        {
          title: "Using Variants",
          description:
            "Manage multiple states:\n\n1. Select your component.\n2. Open the Variants panel (right sidebar).\n3. Add a variant (e.g., hover: `#FF8A75`).\n4. Switch between them in the instance.\n\n**Use Case:** Perfect for buttons, toggles, or navigation items.",
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
        },
        {
          title: "Advanced Interactions",
          description:
            "Add polish with triggers:\n\n1. Create a dropdown menu (multiple rectangles).\n2. In Prototype mode, set ‘On Hover’ to reveal options.\n3. Use ‘Open Overlay’ for pop-ups.\n\n**Why It Matters:** Mimics real app behavior for stakeholder demos.",
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
        },
        {
          title: "Comments and Feedback",
          description:
            "Streamline reviews:\n\n1. Press C to add a comment.\n2. Pin it to a specific element.\n3. Tag teammates with @mentions.\n\n**Benefit:** Keeps feedback contextual and actionable.",
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
                  />
                );
              })}
          </Section>
        ))}
      </ContentContainer>
    </PageContainer>
  );
}