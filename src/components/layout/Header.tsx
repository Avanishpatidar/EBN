


import { useState, useEffect } from "react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { cn } from "../../utils/cn";
import { FiBook, FiVideo, FiInfo, FiMail, FiYoutube, FiMessageSquare } from 'react-icons/fi';

const NAVIGATION_ITEMS = [
  { label: "Blogs", href: "#Blogs", icon: FiBook },
  { label: "Tutorials", href: "#FeaturedVideos", icon: FiVideo },
  { label: "About", href: "#About", icon: FiInfo },
  { label: "Contact", href: "#Newsletter", icon: FiMail },
];



// YouTube and Discord Icons as components for better organization
const YouTubePlayIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <rect width="22" height="16" x="1" y="4" rx="4" fill="currentColor" />
    <path d="M9.5 15.5v-7l6 3.5-6 3.5z" fill="black" />
  </svg>
);

const DiscordIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const BottomNavigation = ({ handleNavClick, handleYoutubeSubscribe, discordInviteUrl }: { 
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void,
  handleYoutubeSubscribe: () => void,
  discordInviteUrl: string
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-900/90 backdrop-blur-lg border-t border-zinc-800 z-50">
      <div className="flex justify-around items-center h-16">
        {NAVIGATION_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className="flex flex-col items-center text-text-secondary hover:text-text-primary"
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs mt-1">{item.label}</span>
          </a>
        ))}
        <button
          onClick={handleYoutubeSubscribe}
          className="flex flex-col items-center text-red-500 hover:text-red-400"
        >
          <FiYoutube className="w-5 h-5" />
          <span className="text-xs mt-1">Subscribe</span>
        </button>
        <a
          href={discordInviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-[#5865F2] hover:text-[#4752C4]"
        >
          <FiMessageSquare className="w-5 h-5" />
          <span className="text-xs mt-1">Discord</span>
        </a>
      </div>
    </nav>
  );
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleYoutubeSubscribe = () => {
    const channelId = "UCKJxvfhbJVoXaIeuE9a1IYw";
    window.open(
      `https://www.youtube.com/channel/${channelId}?sub_confirmation=1`,
      "_blank"
    );
  };
  const DISCORD_INVITE_URL = "https://discord.gg/4DWyAg8cTM";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
        <Container className="relative px-4">
          <div className="py-4">
            <div className="relative">
              <div className="absolute -inset-[2px] rounded-xl overflow-hidden">
                <div
                  className="absolute h-[3px] w-[20%] top-0 left-0 bg-blue-400/80 blur-[3px] animate-border-line"
                  style={{
                    boxShadow:
                      "0 0 20px 3px rgba(56, 189, 248, 0.8), 0 0 40px 6px rgba(56, 189, 248, 0.4)",
                  }}
                />
              </div>

              <header
                className={cn(
                  "relative rounded-xl pointer-events-auto",
                  "bg-zinc-900/50 backdrop-blur-xl",
                  "transition-all duration-300",
                  isScrolled
                    ? "shadow-lg shadow-black/10"
                    : "shadow-md shadow-black/5"
                )}
              >
                <nav className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                  {/* Logo Section */}
                  <a href="/" className="group relative flex-shrink-0">
                    <div className="flex flex-col">
                      <span className="text-xl sm:text-2xl font-orbitron font-black tracking-wider relative">
                        <span className="animated-gradient-text">
                          ERROR BY NIGHT
                        </span>
                        <span
                          className="absolute inset-0 animated-gradient-text glow-effect"
                          aria-hidden="true"
                        >
                          ERROR BY NIGHT
                        </span>
                        <span
                          className="absolute inset-0 blur-[2px] opacity-30"
                          aria-hidden="true"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.2), transparent)",
                            filter:
                              "drop-shadow(0 0 15px rgba(56, 189, 248, 0.6))",
                          }}
                        >
                          ERROR BY NIGHT
                        </span>
                      </span>
                      <span className="text-[8px] sm:text-[10px] font-orbitron tracking-[0.3em] text-blue-400/70 group-hover:text-blue-400 transition-colors pl-1">
                        CODING • BLOGS • PROJECTS
                      </span>
                    </div>
                  </a>

                  {/* Navigation and Buttons for desktop */}
                  <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
                    {NAVIGATION_ITEMS.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={cn(
                          "text-sm font-medium transition-colors relative",
                          "after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0",
                          "after:bg-text-primary after:transition-all after:duration-300",
                          "hover:text-text-primary hover:after:w-full",
                          "text-text-secondary/90 hover:text-text-primary"
                        )}
                      >
                        {item.label}
                      </a>
                    ))}

                    {/* YouTube Subscribe Button */}
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleYoutubeSubscribe}
                      className={cn(
                        "bg-red-600 hover:bg-red-700 border-none",
                        "flex items-center space-x-2",
                        "shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/30"
                      )}
                    >
                      <YouTubePlayIcon />
                      <span className="hidden sm:inline">{"Subscribe"}</span>
                    </Button>

                    {/* Discord Button */}
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => window.open(DISCORD_INVITE_URL, "_blank")}
                      className={cn(
                        "bg-[#5865F2] hover:bg-[#4752C4] border-none",
                        "flex items-center space-x-2",
                        "shadow-lg shadow-[#5865F2]/20 hover:shadow-xl hover:shadow-[#5865F2]/30"
                      )}
                    >
                      <DiscordIcon />
                      <span className="hidden sm:inline">Discord</span>
                    </Button>
                  </div>
                </nav>
              </header>
            </div>
          </div>
        </Container>
      </div>
      
      {/* Bottom Navigation for mobile */}
      <BottomNavigation 
        handleNavClick={handleNavClick} 
        handleYoutubeSubscribe={handleYoutubeSubscribe}
        discordInviteUrl={DISCORD_INVITE_URL}
      />
    </>
  );
}
