// app/resources/page.tsx
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

const CardPreview = styled.div`
  font-size: 1rem;
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  margin-top: 0.5rem;
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
  preview: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ title, preview, description, isOpen, onToggle }) => {
  return (
    <Card $isOpen={isOpen}>
      <CardTitle>{title}</CardTitle>
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
      </CardDescription>
      <DiveDeeperButton onClick={onToggle}>
        {isOpen ? "Collapse" : "Dive Deeper"}
      </DiveDeeperButton>
    </Card>
  );
};

// === Main Component ===
export default function Resources() {
  const [openTopics, setOpenTopics] = useState<{ [key: number]: boolean }>({});

  const toggleTopic = (index: number) => {
    setOpenTopics((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const sections = [
    {
      title: "Your Design Resource Hub",
      largeText:
        "Finding the right tools and inspiration can transform your design process. This page curates the best resources for graphic design and Figma, from free templates to community-driven plugins. Whether you’re a beginner or a pro, these hand-picked links will save you time and spark creativity.\n\nWe’ve sourced from places like [Awesome Design](https://github.com/gztchan/awesome-design) and [Awesome Figma](https://github.com/react-figma/awesome-figma), plus other trusted communities.",
    },
    {
      title: "Figma Ecosystem",
      largeText:
        "Figma’s strength lies in its community and tools. Explore free resources and plugins to supercharge your workflow, all available directly within Figma or on GitHub.",
      topics: [
        {
          title: "Figma Community",
          preview: "Free templates, plugins, and UI kits from Figma’s vibrant community.",
          description:
            "The [Figma Community](https://www.figma.com/community) is a treasure trove of free resources. Browse thousands of templates, plugins, and widgets created by designers worldwide.\n\n**What You’ll Find:**\n- UI kits like the iOS 16 UI Kit by Joey Banks.\n- Plugins like Unsplash for free images.\n- Prototyping templates to kickstart projects.\n\n**How to Use:** Search by category or keyword, then duplicate files to your Figma account.",
        },
        {
          title: "Awesome Figma (GitHub)",
          preview: "A curated list of Figma plugins and tools for developers and designers.",
          description:
            "The [Awesome Figma](https://github.com/react-figma/awesome-figma) repo on GitHub compiles top Figma resources.\n\n**Highlights:**\n- `create-figma-plugin`: Toolkit for building plugins.\n- `figma-plugin-react-template`: Boilerplate for React-based plugins.\n- `figma-latex-complete-plugin`: Add LaTeX to your designs.\n\n**Why It’s Great:** Open-source and community-driven, perfect for customizing Figma to your needs.",
        },
        {
          title: "Figma Plugins on GitHub",
          preview: "Open-source plugins to extend Figma’s functionality.",
          description:
            "Check out [Figma’s Plugin Resources](https://github.com/figma/plugin-resources) for open-source goodies.\n\n**Examples:**\n- `Polychrom`: Measure contrast between layers.\n- `figcd`: CLI for continuous plugin delivery.\n- `Include`: Accessibility annotations.\n\n**Get Started:** Fork these repos or install directly from Figma Community.",
        },
      ],
    },
    {
      title: "Inspiration and Assets",
      largeText:
        "Need a creative boost or high-quality assets? These platforms offer everything from design showcases to free fonts and icons, curated from sources like [Awesome Design](https://github.com/gztchan/awesome-design).",
      topics: [
        {
          title: "Dribbble",
          preview: "Inspiration from top designers around the globe.",
          description:
            "[Dribbble](https://dribbble.com/) is where designers share their best work.\n\n**What’s Inside:**\n- UI/UX concepts.\n- Motion design ideas.\n- Freebies like icons or templates (search ‘free’).\n\n**Tip:** Follow designers you admire and screenshot ideas for your Figma mood board.",
        },
        {
          title: "Google Fonts",
          preview: "Free, open-source fonts for any project.",
          description:
            "[Google Fonts](https://fonts.google.com/) offers a vast library of typefaces.\n\n**Why Use It:**\n- Pair fonts like ‘Montserrat’ and ‘Roboto’ in Figma.\n- Download or link directly in your projects.\n- Explore font pairings with the ‘Pairings’ tool.\n\n**Fun Fact:** All fonts are free for commercial use!",
        },
        {
          title: "Awwwards",
          preview: "Award-winning web designs to spark your creativity.",
          description:
            "[Awwwards](https://www.awwwards.com/) showcases cutting-edge web design.\n\n**What You’ll Get:**\n- Daily inspiration from top sites.\n- Trends like neumorphism or glassmorphism.\n- Free resources in their ‘Collect’ section.\n\n**How to Use:** Recreate layouts in Figma to practice advanced techniques.",
        },
      ],
    },
    {
      title: "Learning and Tools",
      largeText:
        "Level up your skills with tutorials, UI kits, and design tools. These resources blend practical assets with education, pulling from communities like GitHub and beyond.",
      topics: [
        {
          title: "Awesome Design (GitHub)",
          preview: "A massive list of design tools, books, and resources.",
          description:
            "[Awesome Design](https://github.com/gztchan/awesome-design) is a goldmine for designers.\n\n**Standouts:**\n- Books: *The Design of Everyday Things* by Don Norman.\n- Tools: Canva, Sketch, and more.\n- UI Kits: Free resources like Bootstrap UI.\n\n**Why It’s Useful:** Covers everything from theory to practice in one place.",
        },
        {
          title: "UI8 Freebies",
          preview: "High-quality free UI kits and templates.",
          description:
            "[UI8 Freebies](https://ui8.net/freebies) offers pro-level design assets.\n\n**What’s Available:**\n- Mobile app UI kits.\n- Landing page templates.\n- Figma-compatible files.\n\n**How to Use:** Duplicate to Figma, tweak, and integrate into your projects.",
        },
        {
          title: "Untitledui",
          preview: "A modern Figma UI kit with thousands of components.",
          description:
            "[Untitled UI](https://www.untitledui.com/) provides a free tier of its massive UI kit.\n\n**Features:**\n- 8,000+ customizable components.\n- Auto Layout and variants ready.\n- Light/dark mode support.\n\n**Perfect For:** Building sleek interfaces fast—grab it from Figma Community.",
        },
      ],
    },
  ];

  return (
    <PageContainer>
      <Toolbar />
      <HeroContainer>
        <HeroImage
          src="/resources.png" // Replace with a resources-themed image
          alt="Resources Hero"
          layout="fill"
          priority
        />
        <HeroText>
          <HeroTitle>Resources</HeroTitle>
          <HeroSubtitle>Curated Tools for Design and Figma Mastery</HeroSubtitle>
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
                  />
                );
              })}
          </Section>
        ))}
      </ContentContainer>
    </PageContainer>
  );
}