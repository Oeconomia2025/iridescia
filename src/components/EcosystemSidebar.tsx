import { useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Cookie helpers for cross-subdomain preference sharing
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; domain=.oeconomia.io; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
}

const ecosystemItems = [
  {
    name: "OEC Pantheon",
    image: "/ecosystem/oec.png",
    url: "https://oeconomia.io/",
    description: "The central dashboard for the Oeconomia ecosystem. Track portfolio metrics, monitor token prices, and access cross-protocol analytics all in one place.",
  },
  {
    name: "OEC Staking",
    image: "/ecosystem/stake.png",
    url: "https://staking.oeconomia.io/",
    description: "Stake OEC tokens to earn rewards and participate in protocol governance. Multiple staking pools available with competitive APY rates and flexible lock periods.",
  },
  {
    name: "Eloqura",
    image: "/ecosystem/eloqura.png",
    url: "https://eloqura.oeconomia.io/dashboard",
    description: "A decentralized exchange for swapping tokens, providing liquidity, and bridging assets across chains. Trade with low fees within the Oeconomia ecosystem.",
  },
  {
    name: "Alluria",
    image: "/ecosystem/alur.png",
    url: "https://alluria.oeconomia.io/",
    description: "A decentralized lending and borrowing protocol. Deposit collateral to mint ALUD stablecoins, earn yield in the Stability Pool, and stake ALUR for fee revenue.",
  },
  {
    name: "Artivya",
    image: "/ecosystem/art.png",
    url: "https://artivya.oeconomia.io/",
    description: "A decentralized marketplace for digital art and creative assets. Mint, trade, and showcase NFTs with built-in royalty support within the Oeconomia ecosystem.",
  },
  {
    name: "Iridescia",
    image: "/ecosystem/ill.png",
    url: "https://iridescia.oeconomia.io/",
    description: "Developer infrastructure for the Oeconomia ecosystem. Deploy contracts from templates, run security scans, verify source code, and manage your deployments.",
  },
  {
    name: "Governance",
    image: "/ecosystem/governance.png",
    url: "https://governance.oeconomia.io/",
    description: "Participate in DAO governance decisions for the Oeconomia ecosystem. Submit proposals, vote on protocol upgrades, and help shape the future of the platform.",
  },
];

export function EcosystemSidebar() {
  const [expanded, setExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("ecosystem-sidebar-expanded") === "true";
    }
    return false;
  });

  const [openInNewTab, setOpenInNewTab] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = getCookie("ecosystem-open-new-tab");
      return saved !== "false";
    }
    return true;
  });

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isOverCardRef = useRef(false);
  const isOverLogoRef = useRef(false);

  const [toggleHovered, setToggleHovered] = useState(false);
  const toggleHideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isOverToggleCardRef = useRef(false);
  const isOverToggleRef = useRef(false);

  const clearHideTimeout = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const scheduleHide = useCallback(() => {
    clearHideTimeout();
    hideTimeoutRef.current = setTimeout(() => {
      if (!isOverCardRef.current && !isOverLogoRef.current) {
        setHoveredItem(null);
      }
    }, 300);
  }, []);

  const handleLogoEnter = (name: string) => {
    clearHideTimeout();
    isOverLogoRef.current = true;
    setHoveredItem(name);
  };

  const handleLogoLeave = () => {
    isOverLogoRef.current = false;
    scheduleHide();
  };

  const handleCardEnter = () => {
    clearHideTimeout();
    isOverCardRef.current = true;
  };

  const handleCardLeave = () => {
    isOverCardRef.current = false;
    scheduleHide();
  };

  const clearToggleHideTimeout = () => {
    if (toggleHideTimeoutRef.current) {
      clearTimeout(toggleHideTimeoutRef.current);
      toggleHideTimeoutRef.current = null;
    }
  };

  const scheduleToggleHide = useCallback(() => {
    clearToggleHideTimeout();
    toggleHideTimeoutRef.current = setTimeout(() => {
      if (!isOverToggleCardRef.current && !isOverToggleRef.current) {
        setToggleHovered(false);
      }
    }, 300);
  }, []);

  const handleToggleEnter = () => {
    clearToggleHideTimeout();
    isOverToggleRef.current = true;
    setToggleHovered(true);
  };

  const handleToggleLeave = () => {
    isOverToggleRef.current = false;
    scheduleToggleHide();
  };

  const handleToggleCardEnter = () => {
    clearToggleHideTimeout();
    isOverToggleCardRef.current = true;
  };

  const handleToggleCardLeave = () => {
    isOverToggleCardRef.current = false;
    scheduleToggleHide();
  };

  const toggleExpanded = () => {
    const next = !expanded;
    setExpanded(next);
    localStorage.setItem("ecosystem-sidebar-expanded", String(next));
  };

  const toggleNewTab = () => {
    const next = !openInNewTab;
    setOpenInNewTab(next);
    setCookie("ecosystem-open-new-tab", String(next));
  };

  const activeItem = ecosystemItems.find((item) => item.name === hoveredItem);

  return (
    <>
      {/* Info Card - fixed position, vertically centered */}
      <div
        className={`fixed z-50 transition-all duration-300 ease-in-out ${
          activeItem && expanded
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
        style={{
          top: "50%",
          right: "132px",
          transform: activeItem && expanded
            ? "translateY(-50%) translateX(0)"
            : "translateY(-50%) translateX(16px)",
          width: "340px",
        }}
        onMouseEnter={handleCardEnter}
        onMouseLeave={handleCardLeave}
      >
        <div
          className="rounded-xl p-6 border shadow-2xl shadow-black/50"
          style={{
            backgroundColor: "rgba(10, 14, 26, 0.85)",
            borderColor: "#1c2a4a",
            height: "250px",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {activeItem && (
            <>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-navy-600">
                <img
                  src={activeItem.image}
                  alt={activeItem.name}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <h3 className="text-lg font-bold text-white">{activeItem.name}</h3>
              </div>
              <p className="text-base text-navy-200 leading-relaxed">
                {activeItem.description}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Toggle Info Card - anchored near bottom */}
      <div
        className={`fixed z-50 transition-all duration-300 ease-in-out ${
          toggleHovered && expanded
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
        style={{
          bottom: "24px",
          right: "132px",
          transform: toggleHovered && expanded
            ? "translateX(0)"
            : "translateX(16px)",
          width: "340px",
        }}
        onMouseEnter={handleToggleCardEnter}
        onMouseLeave={handleToggleCardLeave}
      >
        <div
          className="rounded-xl p-6 border shadow-2xl shadow-black/50"
          style={{
            backgroundColor: "rgba(10, 14, 26, 0.85)",
            borderColor: "#1c2a4a",
            height: "250px",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-navy-600">
            <img
              src={openInNewTab ? "/ecosystem/tab-new.png" : "/ecosystem/tab-same.png"}
              alt={openInNewTab ? "New Tab Mode" : "Same Tab Mode"}
              className="w-12 h-12 rounded object-contain shrink-0"
            />
            <h3 className="text-lg font-bold text-white">
              {openInNewTab ? "New Tab Mode" : "Same Tab Mode"}
            </h3>
          </div>
          <p className="text-base text-navy-200 leading-relaxed">
            {openInNewTab
              ? "Ecosystem links will open in a new browser tab, keeping your current page intact. Click the toggle to switch to same tab mode."
              : "Ecosystem links will open in the current browser tab, replacing this page. Click the toggle to switch to new tab mode."}
          </p>
        </div>
      </div>

      <div
        className={`fixed right-0 top-0 h-full z-40 flex transition-all duration-300 ease-in-out ${
          expanded ? "w-[116px]" : "w-9"
        }`}
      >
        {/* Bar - always visible */}
        <div
          className={`w-9 h-full shrink-0 cursor-pointer relative border-l transition-colors duration-300 ${
            expanded
              ? "border-irid-purple/50"
              : "border-irid-purple/20 hover:border-irid-purple/40"
          }`}
          style={{
            backgroundImage: expanded
              ? "url(/iridescia-live.jpg)"
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: expanded ? undefined : "#0a0e1a",
          }}
          onClick={toggleExpanded}
        >
          {/* Slight overlay when expanded for text contrast */}
          {expanded && (
            <div className="absolute inset-0 bg-white/10" />
          )}
          <div className="absolute inset-0 flex flex-col items-center justify-between py-3">
            {expanded ? (
              <ChevronRight className="w-6 h-6 text-navy-900 shrink-0 relative z-10" />
            ) : (
              <ChevronLeft className="w-6 h-6 text-white shrink-0" />
            )}

            <div className="flex flex-col items-center relative z-10">
              {expanded ? (
                <ChevronRight className="w-5 h-5 text-navy-900 mb-1" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-white mb-1" />
              )}
              <div
                className={`text-lg font-bold tracking-tight leading-none whitespace-nowrap ${
                  expanded ? "text-navy-900" : "text-white"
                }`}
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                OECONOMIA DAO
              </div>
              {expanded ? (
                <ChevronRight className="w-5 h-5 text-navy-900 mt-1" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-white mt-1" />
              )}
            </div>

            {expanded ? (
              <ChevronRight className="w-6 h-6 text-navy-900 shrink-0 relative z-10" />
            ) : (
              <ChevronLeft className="w-6 h-6 text-white shrink-0" />
            )}
          </div>

          {/* Subtle gradient overlay when collapsed */}
          {!expanded && (
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: "url(/iridescia-live.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}
        </div>

        {/* Expanded images panel */}
        <div
          className={`h-full bg-navy-950/95 flex flex-col items-center justify-center gap-3 py-4 px-3 transition-all duration-300 ${
            expanded ? "w-[80px] opacity-100 overflow-visible" : "w-0 opacity-0 overflow-hidden"
          }`}
        >
          {ecosystemItems.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target={item.url !== "#" && openInNewTab ? "_blank" : undefined}
              rel={item.url !== "#" && openInNewTab ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                if (item.url === "#") {
                  e.preventDefault();
                  return;
                }
                if (!openInNewTab) {
                  e.preventDefault();
                  document.documentElement.classList.add("page-exit");
                  setTimeout(() => {
                    window.location.href = item.url;
                  }, 200);
                }
              }}
              className="group relative shrink-0"
              onMouseEnter={() => handleLogoEnter(item.name)}
              onMouseLeave={handleLogoLeave}
            >
              <img
                src={item.image}
                alt={item.name}
                className={`w-12 h-12 rounded-full object-cover transition-all duration-200 ${
                  hoveredItem === item.name ? "scale-110 ring-2 ring-irid-purple/60" : "hover:scale-110"
                }`}
              />
            </a>
          ))}

          {/* New tab / Same tab toggle */}
          <div className="shrink-0 mt-[72px]">
            <button
              onClick={toggleNewTab}
              className="group relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              title={openInNewTab ? "Opening in new tab" : "Opening in same tab"}
              onMouseEnter={handleToggleEnter}
              onMouseLeave={handleToggleLeave}
            >
              <img
                src={openInNewTab ? "/ecosystem/tab-new.png" : "/ecosystem/tab-same.png"}
                alt={openInNewTab ? "New tab" : "Same tab"}
                className="w-10 h-10 rounded object-contain"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
