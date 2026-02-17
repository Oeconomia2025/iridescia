import { useState } from "react";
import {
  Fuel,
  Clock,
  DollarSign,
  TrendingUp,
  ChevronDown,
} from "lucide-react";

interface GasTier {
  label: string;
  emoji: string;
  gwei: number;
  wait: string;
  recommended?: boolean;
}

interface Operation {
  label: string;
  gasUnits: number;
}

const GAS_TIERS: GasTier[] = [
  { label: "Slow", emoji: "\uD83D\uDC22", gwei: 15, wait: "~5 min" },
  {
    label: "Standard",
    emoji: "\u26A1",
    gwei: 22,
    wait: "~45 sec",
    recommended: true,
  },
  { label: "Fast", emoji: "\uD83D\uDE80", gwei: 35, wait: "~12 sec" },
];

const OPERATIONS: Operation[] = [
  { label: "ETH Transfer", gasUnits: 21000 },
  { label: "ERC-20 Transfer", gasUnits: 65000 },
  { label: "ERC-20 Approve", gasUnits: 46000 },
  { label: "Uniswap Swap", gasUnits: 184000 },
  { label: "NFT Mint", gasUnits: 150000 },
  { label: "Contract Deploy", gasUnits: 1200000 },
];

const MOCK_ETH_PRICE = 2650;

// Mock 24h gas data (hours ago -> gwei)
const MOCK_HISTORY = [
  28, 32, 25, 19, 15, 14, 16, 22, 35, 42, 38, 30, 26, 24, 20, 18, 21, 27, 33,
  29, 24, 22, 25, 22,
];

export default function GasStation() {
  const [selectedTier, setSelectedTier] = useState(1);
  const [selectedOp, setSelectedOp] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentGwei = GAS_TIERS[selectedTier].gwei;
  const operation = OPERATIONS[selectedOp];
  const gasCostEth = (operation.gasUnits * currentGwei * 1e-9).toFixed(6);
  const gasCostUsd = (
    operation.gasUnits *
    currentGwei *
    1e-9 *
    MOCK_ETH_PRICE
  ).toFixed(2);

  const maxGwei = Math.max(...MOCK_HISTORY);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Fuel className="w-7 h-7 text-irid-green" />
          <h1 className="text-3xl font-bold irid-gradient-text">Gas Station</h1>
        </div>
        <p className="text-text-secondary text-sm">
          Real-time gas prices and transaction cost estimator
        </p>
      </div>

      {/* Gas Price Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {GAS_TIERS.map((tier, idx) => (
          <button
            key={tier.label}
            onClick={() => setSelectedTier(idx)}
            className={`relative text-left p-5 rounded-xl transition-all duration-200 ${
              selectedTier === idx
                ? "irid-border bg-navy-800 shadow-lg"
                : "bg-navy-800 hover:bg-navy-700 border border-navy-600"
            }`}
            style={
              selectedTier === idx
                ? {
                    boxShadow:
                      "0 0 24px rgba(167, 139, 250, 0.12), 0 0 12px rgba(96, 165, 250, 0.08)",
                  }
                : undefined
            }
          >
            {tier.recommended && (
              <span className="absolute top-3 right-3 text-[10px] font-semibold bg-irid-cyan/15 text-irid-cyan px-2 py-0.5 rounded-full">
                Recommended
              </span>
            )}

            <div className="text-2xl mb-2">{tier.emoji}</div>
            <p className="text-sm text-text-secondary font-medium mb-1">
              {tier.label}
            </p>
            <p className="text-3xl font-bold text-text-primary">
              {tier.gwei}{" "}
              <span className="text-sm font-normal text-text-muted">gwei</span>
            </p>
            <div className="flex items-center gap-1 mt-2 text-xs text-text-muted">
              <Clock className="w-3 h-3" />
              {tier.wait}
            </div>
          </button>
        ))}
      </div>

      {/* Cost Estimator */}
      <div className="bg-navy-800 border border-navy-600 rounded-xl p-6 space-y-5">
        <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-irid-blue" />
          Transaction Cost Estimator
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Operation Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">
              Operation
            </label>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between bg-navy-800 border border-navy-600 rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-irid-blue/50 transition-colors"
              >
                {operation.label}
                <ChevronDown
                  className={`w-4 h-4 text-text-muted transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {dropdownOpen && (
                <div className="absolute z-20 top-full mt-1 w-full bg-navy-800 border border-navy-600 rounded-lg overflow-hidden shadow-xl">
                  {OPERATIONS.map((op, idx) => (
                    <button
                      key={op.label}
                      onClick={() => {
                        setSelectedOp(idx);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        idx === selectedOp
                          ? "bg-navy-700 text-irid-cyan"
                          : "text-text-secondary hover:bg-navy-700 hover:text-text-primary"
                      }`}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Gas Speed */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">
              Gas Price
            </label>
            <div className="bg-navy-700/50 border border-navy-600 rounded-lg px-4 py-3 text-sm font-mono text-text-primary">
              {currentGwei} gwei ({GAS_TIERS[selectedTier].label})
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-navy-700/50 rounded-lg p-4 border border-navy-600">
            <p className="text-xs text-text-muted mb-1">Gas Units</p>
            <p className="text-lg font-bold text-text-primary font-mono">
              {operation.gasUnits.toLocaleString()}
            </p>
          </div>
          <div className="bg-navy-700/50 rounded-lg p-4 border border-navy-600">
            <p className="text-xs text-text-muted mb-1">Cost (ETH)</p>
            <p className="text-lg font-bold text-text-primary font-mono">
              {gasCostEth} ETH
            </p>
          </div>
          <div className="bg-navy-700/50 rounded-lg p-4 border border-navy-600">
            <p className="text-xs text-text-muted mb-1">Cost (USD)</p>
            <p className="text-lg font-bold irid-gradient-text font-mono">
              ${gasCostUsd}
            </p>
          </div>
        </div>

        <p className="text-xs text-text-muted">
          Based on ETH price: ${MOCK_ETH_PRICE.toLocaleString()}
        </p>
      </div>

      {/* Gas History Chart */}
      <div className="bg-navy-800 border border-navy-600 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-irid-pink" />
          Gas Price History (24h)
        </h2>

        {/* Mock bar chart */}
        <div className="flex items-end gap-1 h-40">
          {MOCK_HISTORY.map((gwei, idx) => {
            const heightPercent = (gwei / maxGwei) * 100;
            const isHighest = gwei === maxGwei;
            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-1 group relative"
              >
                {/* Tooltip */}
                <div className="absolute bottom-full mb-1 px-2 py-1 bg-navy-700 text-xs text-text-primary rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-navy-600">
                  {gwei} gwei
                  <br />
                  <span className="text-text-muted">{24 - idx}h ago</span>
                </div>
                {/* Bar */}
                <div
                  className={`w-full rounded-t transition-all duration-200 ${
                    isHighest
                      ? "irid-gradient"
                      : "bg-navy-500 group-hover:bg-irid-blue/60"
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* Axis labels */}
        <div className="flex justify-between text-[10px] text-text-muted px-1">
          <span>24h ago</span>
          <span>18h ago</span>
          <span>12h ago</span>
          <span>6h ago</span>
          <span>Now</span>
        </div>

        {/* Stats row */}
        <div className="flex gap-6 text-xs text-text-muted pt-2 border-t border-navy-700">
          <span>
            Avg:{" "}
            <span className="text-text-secondary font-mono">
              {Math.round(
                MOCK_HISTORY.reduce((a, b) => a + b, 0) / MOCK_HISTORY.length
              )}{" "}
              gwei
            </span>
          </span>
          <span>
            Low:{" "}
            <span className="text-emerald-400 font-mono">
              {Math.min(...MOCK_HISTORY)} gwei
            </span>
          </span>
          <span>
            High:{" "}
            <span className="text-red-400 font-mono">
              {Math.max(...MOCK_HISTORY)} gwei
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
