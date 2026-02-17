import { useState } from "react";
import {
  Coins,
  Image,
  Landmark,
  Vote,
  Wrench,
  ShieldCheck,
  Rocket,
  Filter,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Template data                                                      */
/* ------------------------------------------------------------------ */

type Category = "Token" | "NFT" | "DeFi" | "Governance" | "Utility";

interface Template {
  id: string;
  name: string;
  category: Category;
  description: string;
  deployCount: number;
  audited: boolean;
}

const TEMPLATES: Template[] = [
  {
    id: "erc20-standard",
    name: "ERC-20 Standard",
    category: "Token",
    description:
      "Mintable, burnable, and pausable ERC-20 token with role-based access control and supply cap.",
    deployCount: 134,
    audited: true,
  },
  {
    id: "erc721-royalties",
    name: "ERC-721 with Royalties",
    category: "NFT",
    description:
      "Full ERC-721 NFT with EIP-2981 royalty support, lazy minting, and on-chain metadata.",
    deployCount: 89,
    audited: true,
  },
  {
    id: "multi-pool-staking",
    name: "Multi-Pool Staking",
    category: "DeFi",
    description:
      "Configurable staking vault supporting multiple reward tokens, lock periods, and boost multipliers.",
    deployCount: 47,
    audited: true,
  },
  {
    id: "governor-timelock",
    name: "Governor + Timelock",
    category: "Governance",
    description:
      "OpenZeppelin Governor with Timelock controller for on-chain proposal creation and execution.",
    deployCount: 62,
    audited: true,
  },
  {
    id: "uniswap-v2-pool",
    name: "Uniswap V2 Pool",
    category: "DeFi",
    description:
      "Automated market maker pool with constant-product formula, flash-swap support, and LP tokens.",
    deployCount: 73,
    audited: true,
  },
  {
    id: "linear-vesting",
    name: "Linear Vesting",
    category: "Utility",
    description:
      "Token vesting schedule with cliff period, linear unlock, and revocable grants for team allocation.",
    deployCount: 56,
    audited: true,
  },
  {
    id: "gnosis-safe-clone",
    name: "Gnosis Safe Clone",
    category: "Utility",
    description:
      "Multi-signature wallet with configurable threshold, delegate calls, and module support.",
    deployCount: 41,
    audited: true,
  },
  {
    id: "erc1155-multi-token",
    name: "ERC-1155 Multi-Token",
    category: "NFT",
    description:
      "Semi-fungible token standard supporting batch transfers, per-token URIs, and supply tracking.",
    deployCount: 67,
    audited: true,
  },
  {
    id: "upgradeable-proxy-uups",
    name: "Upgradeable Proxy (UUPS)",
    category: "Utility",
    description:
      "UUPS proxy pattern with initializer guard, storage gap slots, and upgrade authorization logic.",
    deployCount: 38,
    audited: true,
  },
  {
    id: "oracle-consumer",
    name: "Oracle Consumer",
    category: "DeFi",
    description:
      "Chainlink-compatible oracle consumer with price feed aggregation, staleness checks, and fallbacks.",
    deployCount: 29,
    audited: true,
  },
  {
    id: "cross-chain-bridge-adapter",
    name: "Cross-Chain Bridge Adapter",
    category: "Utility",
    description:
      "Adapter contract for cross-chain messaging via LayerZero / Hyperlane with replay protection.",
    deployCount: 22,
    audited: false,
  },
  {
    id: "token-launchpad",
    name: "Token Launchpad",
    category: "Token",
    description:
      "Fair-launch contract with whitelist phases, hard cap, refund mechanism, and automatic LP seeding.",
    deployCount: 51,
    audited: true,
  },
];

/* ------------------------------------------------------------------ */
/*  Category config                                                    */
/* ------------------------------------------------------------------ */

const CATEGORY_ICON: Record<Category, typeof Coins> = {
  Token: Coins,
  NFT: Image,
  DeFi: Landmark,
  Governance: Vote,
  Utility: Wrench,
};

const CATEGORY_COLOR: Record<Category, string> = {
  Token: "bg-irid-pink/15 text-irid-pink",
  NFT: "bg-irid-purple/15 text-irid-purple",
  DeFi: "bg-irid-cyan/15 text-irid-cyan",
  Governance: "bg-irid-blue/15 text-irid-blue",
  Utility: "bg-irid-gold/15 text-irid-gold",
};

const FILTER_OPTIONS: Array<"All" | Category> = [
  "All",
  "Token",
  "NFT",
  "DeFi",
  "Governance",
  "Utility",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Templates() {
  const [activeFilter, setActiveFilter] = useState<"All" | Category>("All");

  const filtered =
    activeFilter === "All"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === activeFilter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold irid-gradient-text">
          Contract Templates
        </h1>
        <p className="mt-2 text-text-secondary">
          Pre-audited, gas-optimized smart contract templates
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-text-muted mr-1" />
        {FILTER_OPTIONS.map((cat) => {
          const isActive = cat === activeFilter;
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-navy-600 text-text-primary"
                  : "bg-navy-800 text-text-muted hover:text-text-secondary hover:bg-navy-700"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((template) => {
          const CatIcon = CATEGORY_ICON[template.category];
          return (
            <div
              key={template.id}
              className="bg-navy-800 border border-navy-600 rounded-xl hover:border-navy-500 transition flex flex-col p-5"
            >
              {/* Top row: name + badge */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-text-primary leading-tight">
                  {template.name}
                </h3>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium whitespace-nowrap ${CATEGORY_COLOR[template.category]}`}
                >
                  <CatIcon className="w-3 h-3" />
                  {template.category}
                </span>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm text-text-secondary leading-relaxed flex-1">
                {template.description}
              </p>

              {/* Stats row */}
              <div className="mt-4 flex items-center gap-3 text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <Rocket className="w-3.5 h-3.5" />
                  Deployed {template.deployCount} times
                </span>
                {template.audited && (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Audited
                  </span>
                )}
              </div>

              {/* Use Template button */}
              <button className="mt-4 w-full py-2 rounded-lg text-sm font-medium transition-colors bg-navy-700 text-text-secondary hover:text-text-primary hover:bg-navy-600 border border-navy-600 hover:border-navy-500">
                Use Template
              </button>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16 text-text-muted">
          <p className="text-lg">No templates found for this category.</p>
        </div>
      )}
    </div>
  );
}
