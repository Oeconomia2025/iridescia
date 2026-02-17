import { useState } from "react";
import { createPortal } from "react-dom";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { Wallet, X } from "lucide-react";
import { WalletIcon } from "./wallet-icons";

interface WalletConnectProps {
  collapsed?: boolean;
}

export function WalletConnect({ collapsed = false }: WalletConnectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAllWallets, setShowAllWallets] = useState(false);
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const { data: balance } = useBalance({ address });

  const formatAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const preferredWallets = [
    "MetaMask",
    "WalletConnect",
    "Coinbase Wallet",
    "Trust Wallet",
  ];

  const getUniqueValidConnectors = () => {
    const valid = connectors.filter(
      (c) => c.name && c.name.trim() !== "" && c.name !== "undefined"
    );
    return valid.filter(
      (connector, index, arr) =>
        arr.findIndex((c) => c.name === connector.name) === index
    );
  };

  const getDisplayedConnectors = () => {
    const unique = getUniqueValidConnectors();
    if (showAllWallets) return unique;
    const preferred = unique.filter((c) =>
      preferredWallets.includes(c.name)
    );
    const others = unique.filter(
      (c) => !preferredWallets.includes(c.name)
    );
    return [...preferred, ...others].slice(0, 6);
  };

  const allUniqueConnectors = getUniqueValidConnectors();
  const displayedConnectors = getDisplayedConnectors();
  const hasMoreWallets =
    displayedConnectors.length < allUniqueConnectors.length;

  // Connected state — show address, click to disconnect
  if (isConnected && address) {
    return (
      <button
        onClick={() => {
          if (typeof window !== "undefined") {
            localStorage.removeItem("wagmi.store");
            localStorage.removeItem("wagmi.wallet");
            localStorage.removeItem("wagmi.connected");
            localStorage.removeItem("wagmi.recentConnectorId");
          }
          disconnect();
          setTimeout(() => window.location.reload(), 500);
        }}
        className={`w-full flex items-center ${
          collapsed ? "justify-center px-2" : "space-x-3 px-3"
        } py-2 rounded-lg text-left transition-colors group relative text-navy-900 font-medium shadow-lg hover:brightness-110 overflow-hidden`}
        style={{
          backgroundImage: "url(/iridescia-live.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        title={collapsed ? formatAddress(address) : undefined}
      >
        <Wallet className="w-5 h-5 flex-shrink-0" />
        {!collapsed && (
          <span className="text-sm whitespace-nowrap">{formatAddress(address)}</span>
        )}
        {collapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-navy-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-navy-600">
            {formatAddress(address)}
          </div>
        )}
      </button>
    );
  }

  // Disconnected state — show Connect Wallet button + modal
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`w-full flex items-center ${
          collapsed ? "justify-center px-2" : "space-x-3 px-3"
        } py-2 rounded-lg text-left transition-colors group relative text-navy-900 font-medium shadow-lg hover:brightness-110 overflow-hidden`}
        style={{
          backgroundImage: "url(/iridescia-live.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        title={collapsed ? "Connect Wallet" : undefined}
      >
        <Wallet className="w-5 h-5 flex-shrink-0" />
        {!collapsed && (
          <span className="text-sm whitespace-nowrap">Connect Wallet</span>
        )}
        {collapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-navy-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-navy-600">
            Connect Wallet
          </div>
        )}
      </button>

      {/* Modal — portaled to body so sidebar transform doesn't trap it */}
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal */}
            <div
              className="relative w-full max-w-sm mx-4 rounded-xl border border-navy-600 shadow-2xl shadow-black/60 max-h-[90vh] overflow-y-auto"
              style={{
                backgroundColor: "rgba(10, 14, 26, 0.95)",
                backdropFilter: "blur(20px)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 pb-3">
                <div>
                  <h2
                    className="text-xl font-bold bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "url(/iridescia-live.jpg)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    Connect Your Wallet
                  </h2>
                  <p className="text-sm text-text-muted mt-1">
                    Choose a wallet to connect to Iridescia
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-text-muted hover:text-text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Wallet grid */}
              <div className="grid grid-cols-3 gap-2 px-5 pb-3">
                {displayedConnectors.map((connector) => (
                  <button
                    key={connector.uid}
                    onClick={() => {
                      try {
                        connect({ connector });
                        setIsOpen(false);
                      } catch (error: any) {
                        console.log(
                          "Wallet connection error:",
                          error?.message
                        );
                      }
                    }}
                    disabled={isPending}
                    className="flex flex-col items-center justify-center h-14 w-full rounded-lg border border-navy-600 bg-white/95 hover:bg-white hover:border-irid-purple/50 transition-all duration-200 p-1 group"
                  >
                    <WalletIcon
                      wallet={connector.name}
                      className="w-5 h-5"
                    />
                    <span className="text-xs font-medium text-gray-800 group-hover:text-gray-900 leading-tight text-center mt-0.5">
                      {connector.name === "WalletConnect"
                        ? "WalletConnect"
                        : connector.name
                            .replace(" Wallet", "")
                            .replace("Wallet", "")
                            .trim()}
                    </span>
                  </button>
                ))}

                {hasMoreWallets && !showAllWallets && (
                  <button
                    onClick={() => setShowAllWallets(true)}
                    className="col-span-3 w-full text-xs text-text-muted hover:text-text-secondary py-1.5 transition-colors"
                  >
                    Other Wallets (
                    {allUniqueConnectors.length - displayedConnectors.length})
                  </button>
                )}
              </div>

              {showAllWallets && (
                <div className="px-5 pb-2">
                  <button
                    onClick={() => setShowAllWallets(false)}
                    className="w-full text-xs text-text-muted hover:text-text-secondary py-1.5 transition-colors"
                  >
                    Show Less
                  </button>
                </div>
              )}

              {/* Footer note */}
              <div className="mx-5 mb-5 p-3 rounded-lg border border-navy-700 bg-navy-900/50">
                <p className="text-xs text-text-muted text-center leading-relaxed">
                  Secure connection to Sepolia network. Supports all major EVM
                  wallets including MetaMask, Trust, Rabby, and more.
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
