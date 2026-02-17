import { useState } from "react";
import {
  Shield,
  Search,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Finding {
  id: number;
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  line?: number;
}

const MOCK_FINDINGS: Finding[] = [
  {
    id: 1,
    severity: "high",
    title: "Reentrancy guard missing on withdraw()",
    description:
      "The withdraw() function sends ETH before updating the internal balance state. An attacker could re-enter the function before the state change completes, draining the contract. Add a reentrancy guard or follow the checks-effects-interactions pattern.",
    line: 84,
  },
  {
    id: 2,
    severity: "medium",
    title: "Unchecked return value in transfer()",
    description:
      "The ERC-20 transfer() call on line 112 does not check the boolean return value. Some tokens return false on failure instead of reverting. Use SafeERC20 or require the return value.",
    line: 112,
  },
  {
    id: 3,
    severity: "medium",
    title: "Floating pragma detected",
    description:
      'The contract uses "pragma solidity ^0.8.0" which allows compilation with any 0.8.x compiler. Pin to a specific version (e.g., 0.8.20) for deterministic builds and to avoid unexpected behavior from newer compiler versions.',
    line: 1,
  },
  {
    id: 4,
    severity: "medium",
    title: "Missing event emission on state change",
    description:
      "The setFeeRecipient() function modifies critical contract state without emitting an event. Off-chain monitoring tools and indexers rely on events to track administrative changes.",
    line: 156,
  },
  {
    id: 5,
    severity: "low",
    title: "Gas optimization: use calldata instead of memory",
    description:
      'Function parameters of type "bytes" and "string" marked as "memory" could use "calldata" instead for external functions, saving gas on each invocation.',
    line: 67,
  },
  {
    id: 6,
    severity: "low",
    title: "Use custom errors instead of revert strings",
    description:
      "Multiple require() statements use string error messages. Custom errors (introduced in Solidity 0.8.4) are more gas-efficient and produce smaller bytecode.",
    line: 42,
  },
  {
    id: 7,
    severity: "low",
    title: "Unused import: SafeMath",
    description:
      "The SafeMath library is imported but never used. Solidity 0.8+ has built-in overflow checks, making SafeMath unnecessary. Remove the import to reduce bytecode size.",
    line: 4,
  },
  {
    id: 8,
    severity: "low",
    title: "State variable visibility not explicitly set",
    description:
      'The variable "totalFees" does not have an explicit visibility modifier. While it defaults to "internal", explicitly setting visibility improves readability and prevents mistakes.',
    line: 23,
  },
  {
    id: 9,
    severity: "low",
    title: "Missing zero-address validation",
    description:
      "The constructor accepts an address parameter without checking for address(0). Deploying with a zero address for the owner or fee recipient could lock the contract permanently.",
    line: 30,
  },
];

const SEVERITY_CONFIG = {
  critical: {
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    badge: "bg-red-500/20 text-red-400",
    icon: AlertCircle,
    label: "Critical",
  },
  high: {
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    badge: "bg-yellow-500/20 text-yellow-400",
    icon: AlertTriangle,
    label: "High",
  },
  medium: {
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    badge: "bg-orange-500/20 text-orange-400",
    icon: AlertTriangle,
    label: "Medium",
  },
  low: {
    color: "text-text-muted",
    bg: "bg-navy-700/50",
    border: "border-navy-600",
    badge: "bg-navy-700 text-text-muted",
    icon: Info,
    label: "Low",
  },
};

export default function Security() {
  const [contractInput, setContractInput] = useState("");
  const [showResults, setShowResults] = useState(true);
  const [expandedFinding, setExpandedFinding] = useState<number | null>(null);

  const issueCounts = {
    critical: MOCK_FINDINGS.filter((f) => f.severity === "critical").length,
    high: MOCK_FINDINGS.filter((f) => f.severity === "high").length,
    medium: MOCK_FINDINGS.filter((f) => f.severity === "medium").length,
    low: MOCK_FINDINGS.filter((f) => f.severity === "low").length,
  };

  const handleScan = () => {
    setShowResults(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-7 h-7" stroke="url(#irid-img-fill)" />
          <h1 className="text-3xl font-bold irid-gradient-text">Security Scanner</h1>
        </div>
        <p className="text-text-secondary text-sm">
          Analyze smart contracts for vulnerabilities
        </p>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <textarea
          value={contractInput}
          onChange={(e) => setContractInput(e.target.value)}
          placeholder={`Paste contract source code or enter a contract address (0x...)...\n\n// SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\n\ncontract MyToken {\n    ...\n}`}
          className="w-full h-48 bg-navy-800 border border-navy-600 rounded-lg p-4 text-text-primary font-mono text-sm resize-y focus:outline-none focus:border-irid-blue/50 transition-colors placeholder:text-text-muted/50"
        />
        <button
          onClick={handleScan}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm irid-gradient text-navy-950 hover:brightness-110 transition-all shadow-lg cursor-pointer"
          style={{ boxShadow: "0 0 20px rgba(96, 165, 250, 0.2)" }}
        >
          <Search className="w-4 h-4" />
          Scan Contract
        </button>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="space-y-6">
          {/* Score and Summary */}
          <div className="bg-navy-800 border border-navy-600 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Overall Score */}
              <div className="text-center">
                <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
                  Security Score
                </p>
                <p className="text-5xl font-bold irid-gradient-text">87/100</p>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-16 bg-navy-600" />

              {/* Issue Breakdown */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-sm text-text-secondary">Critical</span>
                  <span className="text-sm font-bold text-emerald-400">
                    {issueCounts.critical}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="text-sm text-text-secondary">High</span>
                  <span className="text-sm font-bold text-yellow-400">
                    {issueCounts.high}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-sm text-text-secondary">Medium</span>
                  <span className="text-sm font-bold text-orange-400">
                    {issueCounts.medium}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-text-muted" />
                  <span className="text-sm text-text-secondary">Low</span>
                  <span className="text-sm font-bold text-text-muted">
                    {issueCounts.low}
                  </span>
                </div>
              </div>
            </div>

            {/* Score Bar */}
            <div className="mt-5">
              <div className="w-full h-2 rounded-full bg-navy-700 overflow-hidden">
                <div
                  className="h-full rounded-full irid-gradient transition-all duration-700"
                  style={{ width: "87%" }}
                />
              </div>
            </div>
          </div>

          {/* Findings List */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-irid-purple" />
              Findings ({MOCK_FINDINGS.length})
            </h2>

            {MOCK_FINDINGS.map((finding) => {
              const config = SEVERITY_CONFIG[finding.severity];
              const SeverityIcon = config.icon;
              const isExpanded = expandedFinding === finding.id;

              return (
                <button
                  key={finding.id}
                  onClick={() =>
                    setExpandedFinding(isExpanded ? null : finding.id)
                  }
                  className={`w-full text-left bg-navy-800 border ${config.border} rounded-xl p-4 transition-all hover:bg-navy-700/50`}
                >
                  <div className="flex items-start gap-3">
                    <SeverityIcon
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.color}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-semibold ${config.badge}`}
                        >
                          {config.label}
                        </span>
                        <span className="text-sm font-medium text-text-primary">
                          {finding.title}
                        </span>
                        {finding.line && (
                          <span className="text-xs text-text-muted font-mono">
                            Line {finding.line}
                          </span>
                        )}
                      </div>
                      {isExpanded && (
                        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                          {finding.description}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0 text-text-muted">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Summary Footer */}
          <div className="flex items-center gap-2 text-xs text-text-muted border-t border-navy-700 pt-4">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>
              Scan complete. {MOCK_FINDINGS.length} issues found across{" "}
              {Object.values(issueCounts).filter((c) => c > 0).length} severity
              categories.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
