import {
  Rocket,
  FileCode2,
  Shield,
  Braces,
  Upload,
  LayoutTemplate,
  ScanSearch,
  Fuel,
} from "lucide-react";

const STATS = [
  { label: "Contracts Deployed", value: "147", icon: Upload },
  { label: "Templates Available", value: "24", icon: LayoutTemplate },
  { label: "Security Scans", value: "89", icon: ScanSearch },
  { label: "Gas Saved", value: "12.4 ETH", icon: Fuel },
];

const QUICK_ACTIONS = [
  {
    title: "Deploy Contract",
    description: "Deploy a smart contract to Sepolia with guided configuration and gas estimation.",
    icon: Rocket,
    action: () => console.log("Navigate to /deploy"),
  },
  {
    title: "Browse Templates",
    description: "Explore audited, production-ready contract templates for common use cases.",
    icon: FileCode2,
    action: () => console.log("Navigate to /templates"),
  },
  {
    title: "Security Scan",
    description: "Run automated vulnerability detection and best-practice analysis on your contracts.",
    icon: Shield,
    action: () => console.log("Navigate to /security"),
  },
  {
    title: "ABI Decoder",
    description: "Decode transaction calldata, event logs, and ABI-encoded parameters instantly.",
    icon: Braces,
    action: () => console.log("Navigate to /abi-tools"),
  },
];

const CONTRACT_TYPES = [
  "ERC-20",
  "ERC-721",
  "ERC-1155",
  "Staking",
  "Governance",
  "DEX Pool",
  "Vesting",
  "Multisig",
  "Proxy/Upgradeable",
  "Oracle",
  "Bridge",
  "Timelock",
];

export default function Dashboard() {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold irid-gradient-text">Iridescia</h1>
        <p className="text-lg text-text-secondary font-medium">
          Developer Infrastructure for Oeconomia
        </p>
        <p className="text-text-muted leading-relaxed max-w-2xl">
          Smart contract deployment, audited templates, automated security scanning, and
          developer tooling. Everything you need to build in the Oeconomia
          ecosystem. Ship faster, ship safer.
        </p>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="irid-border rounded-xl p-5 flex items-center gap-4"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-navy-700">
              <stat.icon className="w-5 h-5 text-irid-cyan" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-xs text-text-muted">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.title}
              onClick={action.action}
              className="bg-navy-800 hover:bg-navy-700 border border-navy-600 rounded-xl p-5 text-left transition-colors group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-navy-700 group-hover:bg-navy-600 transition-colors">
                  <action.icon className="w-5 h-5 text-irid-blue" />
                </div>
                <h3 className="text-base font-semibold text-text-primary">
                  {action.title}
                </h3>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                {action.description}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Supported Contract Types */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">
          Supported Contract Types
        </h2>
        <div className="flex flex-wrap gap-2">
          {CONTRACT_TYPES.map((type) => (
            <span
              key={type}
              className="px-3 py-1.5 text-sm rounded-full bg-navy-700 text-text-secondary"
            >
              {type}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
