import { useState } from "react";
import {
  CheckCircle,
  Upload,
  Loader2,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

const COMPILER_VERSIONS = [
  "v0.8.20+commit.a1b79de6",
  "v0.8.19+commit.7dd6d404",
  "v0.8.18+commit.87f61d96",
  "v0.8.17+commit.8df45f5f",
  "v0.8.16+commit.07a7930e",
  "v0.8.15+commit.e14f2714",
];

const LICENSE_TYPES = [
  "MIT",
  "GPL-3.0",
  "Apache-2.0",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "UNLICENSED",
];

type VerificationStatus = "idle" | "verifying" | "success" | "error";

const EXAMPLE_SOURCE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}`;

export default function Verify() {
  const [contractAddress, setContractAddress] = useState("");
  const [compilerVersion, setCompilerVersion] = useState(COMPILER_VERSIONS[0]);
  const [optimization, setOptimization] = useState(true);
  const [optimizationRuns, setOptimizationRuns] = useState("200");
  const [sourceCode, setSourceCode] = useState(EXAMPLE_SOURCE);
  const [licenseType, setLicenseType] = useState("MIT");
  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [compilerDropdownOpen, setCompilerDropdownOpen] = useState(false);
  const [licenseDropdownOpen, setLicenseDropdownOpen] = useState(false);

  const handleVerify = () => {
    setStatus("verifying");
    // Simulate verification
    setTimeout(() => {
      setStatus("success");
    }, 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle className="w-7 h-7" stroke="url(#irid-img-fill)" />
          <h1 className="text-3xl font-bold irid-gradient-text">
            Verify Contract
          </h1>
        </div>
        <p className="text-text-secondary text-sm">
          Verify and publish your contract source code
        </p>
      </div>

      {/* Form */}
      <div className="space-y-5">
        {/* Contract Address */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">
            Contract Address
          </label>
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="0x..."
            className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-3 text-text-primary font-mono text-sm focus:outline-none focus:border-irid-blue/50 transition-colors placeholder:text-text-muted/50"
          />
        </div>

        {/* Compiler Version & License Type (side by side) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Compiler Version Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">
              Compiler Version
            </label>
            <div className="relative">
              <button
                onClick={() => {
                  setCompilerDropdownOpen(!compilerDropdownOpen);
                  setLicenseDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between bg-navy-800 border border-navy-600 rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-irid-blue/50 transition-colors"
              >
                <span className="font-mono text-sm">{compilerVersion}</span>
                <ChevronDown
                  className={`w-4 h-4 text-text-muted transition-transform ${
                    compilerDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {compilerDropdownOpen && (
                <div className="absolute z-20 top-full mt-1 w-full bg-navy-800 border border-navy-600 rounded-lg overflow-hidden shadow-xl max-h-48 overflow-y-auto">
                  {COMPILER_VERSIONS.map((v) => (
                    <button
                      key={v}
                      onClick={() => {
                        setCompilerVersion(v);
                        setCompilerDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-mono transition-colors ${
                        v === compilerVersion
                          ? "bg-navy-700 text-irid-cyan"
                          : "text-text-secondary hover:bg-navy-700 hover:text-text-primary"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* License Type Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">
              License Type
            </label>
            <div className="relative">
              <button
                onClick={() => {
                  setLicenseDropdownOpen(!licenseDropdownOpen);
                  setCompilerDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between bg-navy-800 border border-navy-600 rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-irid-blue/50 transition-colors"
              >
                {licenseType}
                <ChevronDown
                  className={`w-4 h-4 text-text-muted transition-transform ${
                    licenseDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {licenseDropdownOpen && (
                <div className="absolute z-20 top-full mt-1 w-full bg-navy-800 border border-navy-600 rounded-lg overflow-hidden shadow-xl">
                  {LICENSE_TYPES.map((lic) => (
                    <button
                      key={lic}
                      onClick={() => {
                        setLicenseType(lic);
                        setLicenseDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        lic === licenseType
                          ? "bg-navy-700 text-irid-cyan"
                          : "text-text-secondary hover:bg-navy-700 hover:text-text-primary"
                      }`}
                    >
                      {lic}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Optimization Toggle */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">
            Optimization
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOptimization(!optimization)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                optimization ? "bg-irid-cyan" : "bg-navy-600"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  optimization ? "left-[22px]" : "left-0.5"
                }`}
              />
            </button>
            <span className="text-sm text-text-secondary">
              {optimization ? "Enabled" : "Disabled"}
            </span>
            {optimization && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted">Runs:</span>
                <input
                  type="text"
                  value={optimizationRuns}
                  onChange={(e) => setOptimizationRuns(e.target.value)}
                  className="w-20 bg-navy-800 border border-navy-600 rounded-lg px-3 py-1.5 text-sm text-text-primary font-mono text-center focus:outline-none focus:border-irid-blue/50 transition-colors"
                />
              </div>
            )}
          </div>
        </div>

        {/* Source Code */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">
            Source Code
          </label>
          <textarea
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            placeholder="Paste your Solidity source code here..."
            className="w-full h-72 bg-navy-800 border border-navy-600 rounded-lg p-4 text-text-primary font-mono text-sm resize-y focus:outline-none focus:border-irid-blue/50 transition-colors placeholder:text-text-muted/50 leading-relaxed"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleVerify}
          disabled={status === "verifying"}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg cursor-pointer ${
            status === "verifying"
              ? "bg-navy-700 text-text-muted cursor-wait"
              : "irid-gradient text-navy-950 hover:brightness-110"
          }`}
          style={
            status !== "verifying"
              ? { boxShadow: "0 0 20px rgba(96, 165, 250, 0.2)" }
              : undefined
          }
        >
          {status === "verifying" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          {status === "verifying" ? "Verifying..." : "Verify & Publish"}
        </button>
      </div>

      {/* Verification Status */}
      <div className="bg-navy-800 border border-navy-600 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-text-primary">
          Verification Status
        </h2>

        {status === "idle" && (
          <div className="flex items-center gap-3 text-text-muted">
            <div className="w-3 h-3 rounded-full bg-navy-600" />
            <span className="text-sm">
              Submit a contract for verification to see status here.
            </span>
          </div>
        )}

        {status === "verifying" && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-irid-blue">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm font-medium">
                Compiling and verifying contract...
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-navy-700 overflow-hidden">
              <div className="h-full rounded-full bg-irid-blue animate-pulse w-2/3" />
            </div>
            <div className="space-y-1.5">
              {[
                { text: "Fetching bytecode from chain...", done: true },
                { text: "Compiling source with solc...", done: true },
                { text: "Matching bytecode...", done: false },
              ].map((step) => (
                <div
                  key={step.text}
                  className="flex items-center gap-2 text-xs"
                >
                  {step.done ? (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Loader2 className="w-3.5 h-3.5 text-irid-blue animate-spin" />
                  )}
                  <span
                    className={
                      step.done ? "text-text-secondary" : "text-text-primary"
                    }
                  >
                    {step.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-emerald-400">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-semibold">
                Contract verified successfully!
              </span>
            </div>
            <div className="bg-navy-700/50 rounded-lg p-4 border border-navy-600 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">Compiler</span>
                <span className="text-text-primary font-mono text-xs">
                  {compilerVersion}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">Optimization</span>
                <span className="text-text-primary">
                  {optimization
                    ? `Enabled (${optimizationRuns} runs)`
                    : "Disabled"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">License</span>
                <span className="text-text-primary">{licenseType}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">Verified At</span>
                <span className="text-text-primary">
                  {new Date().toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-3 text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm font-medium">
              Verification failed. Bytecode mismatch — check compiler settings
              and source code.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
