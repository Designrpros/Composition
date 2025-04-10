// app/resources/page.tsx
"use client";

import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import Toolbar from "../components/Toolbar";
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

  @media (min-width: 1920px) {
    padding: 3rem 3rem 3rem 80px; /* Larger padding for ultra-wide screens */
  }

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

  @media (min-width: 1920px) {
    height: 90vh; /* Taller hero for larger screens */
  }

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

  @media (min-width: 1920px) {
    padding: 3rem;
    max-width: 1000px; /* Wider for larger screens */
  }

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

  @media (min-width: 1920px) {
    font-size: 5rem; /* Larger title for ultra-wide */
  }

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

  @media (min-width: 1920px) {
    font-size: 1.8rem; /* Slightly larger for ultra-wide */
  }

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

  @media (min-width: 1920px) {
    max-width: 1400px; /* Wider content for larger screens */
    padding: 4rem 0;
  }

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

  @media (min-width: 1920px) {
    margin-bottom: 4rem;
    padding: 0 3rem; /* More padding for ultra-wide */
  }

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

  @media (min-width: 1920px) {
    font-size: 3rem; /* Larger for ultra-wide */
  }

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

  @media (min-width: 1920px) {
    font-size: 1.4rem; /* Larger for ultra-wide */
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

  @media (min-width: 1920px) {
    padding: 2rem; /* More padding for ultra-wide */
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

  @media (min-width: 1920px) {
    font-size: 1.8rem; /* Larger for ultra-wide */
  }

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

  @media (min-width: 1920px) {
    font-size: 1.4rem; /* Larger for ultra-wide */
  }

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

  @media (min-width: 1920px) {
    font-size: 1.1rem; /* Larger for ultra-wide */
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

  @media (min-width: 1920px) {
    font-size: 1.1rem; /* Larger for ultra-wide */
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

const VisitWebsiteLink = styled(Link)`
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

  @media (min-width: 1920px) {
    font-size: 1rem; /* Larger for ultra-wide */
    padding: 0.6rem 1.2rem;
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
  websiteUrl: string;
}> = ({ title, preview, description, isOpen, onToggle, websiteUrl }) => {
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
        <VisitWebsiteLink href={websiteUrl} target="_blank" rel="noopener noreferrer">
          Visit Website
        </VisitWebsiteLink>
      </CardDescription>
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
          websiteUrl: "https://www.figma.com/community",
        },
        {
          title: "Awesome Figma (GitHub)",
          preview: "A curated list of Figma plugins and tools for developers and designers.",
          description:
            "The [Awesome Figma](https://github.com/react-figma/awesome-figma) repo on GitHub compiles top Figma resources.\n\n**Highlights:**\n- `create-figma-plugin`: Toolkit for building plugins.\n- `figma-plugin-react-template`: Boilerplate for React-based plugins.\n- `figma-latex-complete-plugin`: Add LaTeX to your designs.\n\n**Why It’s Great:** Open-source and community-driven, perfect for customizing Figma to your needs.",
          websiteUrl: "https://github.com/react-figma/awesome-figma",
        },
        {
          title: "Figma Plugins on GitHub",
          preview: "Open-source plugins to extend Figma’s functionality.",
          description:
            "Check out [Figma’s Plugin Resources](https://github.com/figma/plugin-resources) for open-source goodies.\n\n**Examples:**\n- `Polychrom`: Measure contrast between layers.\n- `figcd`: CLI for continuous plugin delivery.\n- `Include`: Accessibility annotations.\n\n**Get Started:** Fork these repos or install directly from Figma Community.",
          websiteUrl: "https://github.com/figma/plugin-resources",
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
          websiteUrl: "https://dribbble.com/",
        },
        {
          title: "Google Fonts",
          preview: "Free, open-source fonts for any project.",
          description:
            "[Google Fonts](https://fonts.google.com/) offers a vast library of typefaces.\n\n**Why Use It:**\n- Pair fonts like ‘Montserrat’ and ‘Roboto’ in Figma.\n- Download or link directly in your projects.\n- Explore font pairings with the ‘Pairings’ tool.\n\n**Fun Fact:** All fonts are free for commercial use!",
          websiteUrl: "https://fonts.google.com/",
        },
        {
          title: "Awwwards",
          preview: "Award-winning web designs to spark your creativity.",
          description:
            "[Awwwards](https://www.awwwards.com/) showcases cutting-edge web design.\n\n**What You’ll Get:**\n- Daily inspiration from top sites.\n- Trends like neumorphism or glassmorphism.\n- Free resources in their ‘Collect’ section.\n\n**How to Use:** Recreate layouts in Figma to practice advanced techniques.",
          websiteUrl: "https://www.awwwards.com/",
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
          websiteUrl: "https://github.com/gztchan/awesome-design",
        },
        {
          title: "UI8 Freebies",
          preview: "High-quality free UI kits and templates.",
          description:
            "[UI8 Freebies](https://ui8.net/freebies) offers pro-level design assets.\n\n**What’s Available:**\n- Mobile app UI kits.\n- Landing page templates.\n- Figma-compatible files.\n\n**How to Use:** Duplicate to Figma, tweak, and integrate into your projects.",
          websiteUrl: "https://ui8.net/freebies",
        },
        {
          title: "Untitledui",
          preview: "A modern Figma UI kit with thousands of components.",
          description:
            "[Untitled UI](https://www.untitledui.com/) provides a free tier of its massive UI kit.\n\n**Features:**\n- 8,000+ customizable components.\n- Auto Layout and variants ready.\n- Light/dark mode support.\n\n**Perfect For:** Building sleek interfaces fast—grab it from Figma Community.",
          websiteUrl: "https://www.untitledui.com/",
        },
      ],
    },
  ];

  return (
    <PageContainer>
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
                    websiteUrl={topic.websiteUrl}
                  />
                );
              })}
          </Section>
        ))}
      </ContentContainer>
    </PageContainer>
  );
}