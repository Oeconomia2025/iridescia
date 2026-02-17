import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Rocket,
  FileCode2,
  Shield,
  Braces,
  Fuel,
  CheckCircle,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Globe,
} from "lucide-react";
import {
  SiX,
  SiMedium,
  SiYoutube,
  SiDiscord,
  SiGithub,
  SiTelegram,
} from "react-icons/si";

import { EcosystemSidebar } from "@/components/EcosystemSidebar";
import { WalletConnect } from "@/components/wallet-connect";
import Dashboard from "@/pages/Dashboard";
import Deploy from "@/pages/Deploy";
import Templates from "@/pages/Templates";
import Security from "@/pages/Security";
import AbiTools from "@/pages/AbiTools";
import GasStation from "@/pages/GasStation";
import Verify from "@/pages/Verify";
import MyContracts from "@/pages/MyContracts";

const NAV_ITEMS = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/deploy", label: "Deploy", icon: Rocket },
  { path: "/templates", label: "Templates", icon: FileCode2 },
  { path: "/my-contracts", label: "My Contracts", icon: FolderOpen },
  { path: "/security", label: "Security", icon: Shield },
  { path: "/abi-tools", label: "ABI Tools", icon: Braces },
  { path: "/gas-station", label: "Gas Station", icon: Fuel },
  { path: "/verify", label: "Verify", icon: CheckCircle },
];

const LINKS = [
  { label: "Twitter / X", url: "https://x.com/Oeconomia2025", icon: SiX },
  { label: "Medium", url: "https://medium.com/@oeconomia2025", icon: SiMedium },
  { label: "YouTube", url: "https://www.youtube.com/@Oeconomia2025", icon: SiYoutube },
  { label: "Discord", url: "https://discord.com/invite/XSgZgeVD", icon: SiDiscord },
  { label: "GitHub", url: "https://github.com/Oeconomia2025", icon: SiGithub },
  { label: "Telegram", url: "https://t.me/OeconomiaDAO", icon: SiTelegram },
];

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("irid-sidebar-collapsed");
      return saved === "true";
    }
    return false;
  });
  const [socialOpen, setSocialOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("irid-sidebar-collapsed", sidebarCollapsed.toString());
  }, [sidebarCollapsed]);

  const toggleCollapsed = () => setSidebarCollapsed((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-navy-950">
      {/* SVG pattern for iridescent icon fills */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <pattern id="irid-img-fill" patternUnits="userSpaceOnUse" width="24" height="24">
            <image href="/iridescia-live.jpg" x="0" y="0" width="24" height="24" preserveAspectRatio="xMidYMid slice" />
          </pattern>
        </defs>
      </svg>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile hamburger */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-navy-800 border border-navy-600 text-text-secondary"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Collapse/Expand button — fixed, outside containers */}
      <button
        onClick={toggleCollapsed}
        className={`hidden lg:flex fixed top-[29px] z-[60] w-6 h-6 bg-navy-800 border border-navy-600 rounded-full items-center justify-center hover:bg-navy-700 transition-all duration-300 ${
          sidebarCollapsed ? "left-[52px]" : "left-[180px]"
        }`}
        title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {sidebarCollapsed ? (
          <ChevronRight className="w-3 h-3 text-text-secondary" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-text-secondary" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 ${
          sidebarCollapsed ? "w-16" : "w-48"
        } bg-navy-900 border-r border-navy-600 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-in-out lg:translate-x-0 flex flex-col shadow-xl shadow-black/70`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-navy-900 flex items-center justify-between h-20 px-4">
          <div
            className={`flex items-center ${sidebarCollapsed ? "justify-center w-full" : "space-x-3"} cursor-pointer hover:opacity-80 transition-opacity`}
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <img src="/irid-logo.png" alt="Iridescia" className="w-full h-full object-cover" />
            </div>
            {!sidebarCollapsed && (
              <h2
                className="text-lg font-bold whitespace-nowrap bg-clip-text text-transparent"
                style={{
                  backgroundImage: "url(/iridescia-live.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >Iridescia</h2>
            )}
          </div>
          {/* Mobile close */}
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-text-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-2 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center ${
                      sidebarCollapsed ? "justify-center px-2" : "space-x-3 px-3"
                    } py-2 rounded-lg text-left transition-colors group relative overflow-hidden ${
                      active
                        ? "text-navy-900 font-semibold shadow-lg"
                        : "text-text-secondary hover:text-text-primary hover:bg-navy-800"
                    }`}
                    style={
                      active
                        ? {
                            backgroundImage: "url(/iridescia-live.jpg)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : undefined
                    }
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!sidebarCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                    {sidebarCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-navy-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-navy-600">
                        {item.label}
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="sticky bottom-0 bg-navy-900 p-2 flex flex-col space-y-2 border-t border-navy-700">
          {/* Links dropdown (opens upward) */}
          <div className="relative">
            {socialOpen && (
              <div className="absolute bottom-full mb-1 left-0 right-0 bg-navy-800 border border-navy-600 rounded-lg overflow-hidden shadow-lg">
                {LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-navy-700 transition-colors"
                    onClick={() => setSocialOpen(false)}
                  >
                    <link.icon className="w-3.5 h-3.5" />
                    {link.label}
                  </a>
                ))}
              </div>
            )}
            <button
              onClick={() => setSocialOpen(!socialOpen)}
              className={`w-full flex items-center ${
                sidebarCollapsed ? "justify-center px-2" : "space-x-3 px-3"
              } py-2 rounded-lg text-left transition-colors group relative ${
                socialOpen
                  ? "text-navy-900 font-semibold shadow-lg"
                  : "bg-navy-700/50 text-text-secondary hover:text-text-primary hover:bg-navy-700"
              }`}
              style={
                socialOpen
                  ? {
                      backgroundImage: "url(/iridescia-live.jpg)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : undefined
              }
              title={sidebarCollapsed ? "Links" : undefined}
            >
              <Globe className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm">Links</span>}
              {sidebarCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-navy-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-navy-600">
                  Links
                </div>
              )}
            </button>
          </div>

          {/* Oeconomia button */}
          <button
            onClick={() => window.open("https://oeconomia.io/", "_blank")}
            className={`w-full flex items-center ${
              sidebarCollapsed ? "justify-center px-2" : "space-x-3 px-3"
            } py-2 rounded-lg text-left transition-colors group relative text-white hover:brightness-110`}
            style={{
              background:
                "linear-gradient(#0a1020, #0a1020) padding-box, url(/iridescia-live.jpg) border-box",
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "2px solid transparent",
            }}
            title={sidebarCollapsed ? "Oeconomia" : undefined}
          >
            <img src="/oec-logo.png" alt="OEC" className="w-5 h-auto flex-shrink-0 object-contain" />
            {!sidebarCollapsed && <span className="text-sm">Oeconomia</span>}
            {sidebarCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-navy-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-navy-600">
                Oeconomia
              </div>
            )}
          </button>

          {/* OECsplorer link — iridescent image background */}
          <a
            href="https://oecsplorer.oeconomia.io/"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full flex items-center ${
              sidebarCollapsed ? "justify-center px-2" : "space-x-3 px-3"
            } py-2 rounded-lg text-left transition-colors group relative text-white hover:brightness-110 overflow-hidden`}
            style={{
              backgroundImage: "url(/iridescia-live.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            title={sidebarCollapsed ? "OECsplorer" : undefined}
          >
            <img
              src="https://pub-37d61a7eb7ae45898b46702664710cb2.r2.dev/images/Globe%20Black.png"
              alt="OECsplorer"
              className="w-5 h-5 flex-shrink-0 object-contain"
            />
            {!sidebarCollapsed && (
              <span className="text-sm font-semibold text-navy-900 drop-shadow-sm">OECsplorer</span>
            )}
            {sidebarCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-navy-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-navy-600">
                OECsplorer
              </div>
            )}
          </a>

          {/* Connect Wallet */}
          <WalletConnect collapsed={sidebarCollapsed} />

          {/* Network indicator */}
          <div
            className={`flex items-center ${
              sidebarCollapsed ? "justify-center" : "space-x-2 px-3"
            } py-1.5 text-xs text-text-muted`}
          >
            <span
              className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"
              style={{ boxShadow: "0 0 6px #22C55E44" }}
            />
            {!sidebarCollapsed && <span className="whitespace-nowrap">Sepolia Testnet</span>}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={`flex-1 overflow-auto mr-9 ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-48"} transition-all duration-300`}>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/deploy" element={<Deploy />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/my-contracts" element={<MyContracts />} />
            <Route path="/security" element={<Security />} />
            <Route path="/abi-tools" element={<AbiTools />} />
            <Route path="/gas-station" element={<GasStation />} />
            <Route path="/verify" element={<Verify />} />
          </Routes>
        </div>
      </main>

      {/* Ecosystem Sidebar (right) */}
      <EcosystemSidebar />
    </div>
  );
}
