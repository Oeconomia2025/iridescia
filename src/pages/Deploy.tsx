import { useState } from "react";
import {
  Rocket,
  Coins,
  Image,
  Landmark,
  Vote,
  Droplets,
  Timer,
  ShieldCheck,
  Code2,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface Template {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
}

const TEMPLATES: Template[] = [
  {
    id: "erc20",
    label: "ERC-20 Token",
    description: "Fungible token with mint, burn, and transfer capabilities",
    icon: Coins,
  },
  {
    id: "erc721",
    label: "ERC-721 NFT",
    description: "Non-fungible token with metadata and enumerable extensions",
    icon: Image,
  },
  {
    id: "staking",
    label: "Staking Contract",
    description: "Stake tokens and earn rewards over configurable periods",
    icon: Landmark,
  },
  {
    id: "governance",
    label: "Governance",
    description: "On-chain voting and proposal execution for DAOs",
    icon: Vote,
  },
  {
    id: "dex-pool",
    label: "DEX Pool",
    description: "Automated market maker liquidity pool with swap routing",
    icon: Droplets,
  },
  {
    id: "vesting",
    label: "Vesting Contract",
    description: "Time-locked token distribution with cliff and linear release",
    icon: Timer,
  },
  {
    id: "multisig",
    label: "Multisig Wallet",
    description: "Multi-signature wallet requiring N-of-M approvals",
    icon: ShieldCheck,
  },
  {
    id: "custom",
    label: "Custom",
    description: "Start from scratch with a blank Solidity contract",
    icon: Code2,
  },
];

const STEPS = [
  { number: 1, label: "Select Template" },
  { number: 2, label: "Configure" },
  { number: 3, label: "Deploy" },
];

export default function Deploy() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const activeStep = 1;

  const handleNext = () => {
    if (!selectedTemplate) return;
    console.log(`[Deploy] Next step with template: ${selectedTemplate}`);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold irid-gradient-text">Deploy Contract</h1>
        <p className="text-text-secondary text-sm">
          Deploy smart contracts to Sepolia testnet
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-3">
        {STEPS.map((step, idx) => (
          <div key={step.number} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step.number === activeStep
                    ? "irid-gradient text-navy-950 shadow-lg"
                    : step.number < activeStep
                    ? "bg-irid-cyan/20 text-irid-cyan"
                    : "bg-navy-800 text-text-muted border border-navy-600"
                }`}
                style={
                  step.number === activeStep
                    ? { boxShadow: "0 0 16px rgba(96, 165, 250, 0.25)" }
                    : undefined
                }
              >
                {step.number}
              </div>
              <span
                className={`text-sm font-medium ${
                  step.number === activeStep
                    ? "text-text-primary"
                    : "text-text-muted"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className="w-12 h-px bg-navy-600" />
            )}
          </div>
        ))}
      </div>

      {/* Template Grid */}
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-irid-purple" />
          Choose a template
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEMPLATES.map((tmpl) => {
            const isSelected = selectedTemplate === tmpl.id;
            return (
              <button
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl.id)}
                className={`group relative text-left p-5 rounded-xl transition-all duration-200 ${
                  isSelected
                    ? "irid-border bg-navy-800 shadow-lg"
                    : "bg-navy-800 hover:bg-navy-700 border border-navy-600"
                }`}
                style={
                  isSelected
                    ? { boxShadow: "0 0 24px rgba(167, 139, 250, 0.12), 0 0 12px rgba(96, 165, 250, 0.08)" }
                    : undefined
                }
              >
                {/* Selected indicator dot */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full irid-gradient" />
                )}

                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                    isSelected
                      ? "bg-irid-purple/15 text-irid-purple"
                      : "bg-navy-700 text-text-muted group-hover:text-irid-blue group-hover:bg-navy-600"
                  }`}
                >
                  <tmpl.icon className="w-5 h-5" />
                </div>
                <h3
                  className={`text-sm font-semibold mb-1 ${
                    isSelected ? "text-white" : "text-text-primary"
                  }`}
                >
                  {tmpl.label}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  {tmpl.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Next Step Button */}
      <div className="flex items-center justify-between pt-4 border-t border-navy-700">
        <p className="text-xs text-text-muted">
          {selectedTemplate
            ? `Selected: ${TEMPLATES.find((t) => t.id === selectedTemplate)?.label}`
            : "Select a template to continue"}
        </p>
        <button
          onClick={handleNext}
          disabled={!selectedTemplate}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
            selectedTemplate
              ? "irid-gradient text-navy-950 hover:brightness-110 shadow-lg cursor-pointer"
              : "bg-navy-800 text-text-muted border border-navy-600 cursor-not-allowed"
          }`}
          style={
            selectedTemplate
              ? { boxShadow: "0 0 20px rgba(96, 165, 250, 0.2)" }
              : undefined
          }
          title={selectedTemplate ? "Proceed to configuration" : "Coming Soon"}
        >
          Next Step
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
