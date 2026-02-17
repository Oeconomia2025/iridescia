import { useState } from "react";
import {
  FolderOpen,
  Rocket,
  Eye,
  Pause,
  ArrowUpCircle,
  Play,
  Search,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

interface Contract {
  id: string;
  name: string;
  address: string;
  network: string;
  status: "active" | "paused";
  deployedDate: string;
  type: string;
}

const MOCK_CONTRACTS: Contract[] = [
  {
    id: "1",
    name: "OEC Token",
    address: "0x2b2fb8df4ac5d394f0d5674d7a54802e42a06aba",
    network: "Sepolia",
    status: "active",
    deployedDate: "2025-12-15",
    type: "ERC-20",
  },
  {
    id: "2",
    name: "OEC Staking Pool",
    address: "0x7a3f9c1d8e4b2a6f5c0d3e7b9a1f2c4d6e8a0b3c",
    network: "Sepolia",
    status: "active",
    deployedDate: "2026-01-08",
    type: "Staking",
  },
  {
    id: "3",
    name: "Governance v1",
    address: "0x4e2d1c9a8b7f6e5d3c2a1b0f9e8d7c6b5a4f3e2d",
    network: "Sepolia",
    status: "paused",
    deployedDate: "2026-01-22",
    type: "Governance",
  },
  {
    id: "4",
    name: "NFT Collection",
    address: "0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e",
    network: "Sepolia",
    status: "active",
    deployedDate: "2026-02-10",
    type: "ERC-721",
  },
];

const truncateAddress = (addr: string) =>
  `${addr.slice(0, 6)}...${addr.slice(-4)}`;

export default function MyContracts() {
  const [contracts] = useState<Contract[]>(MOCK_CONTRACTS);
  const [showEmpty] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredContracts = contracts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyAddress = (id: string, address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Empty State
  if (showEmpty || contracts.length === 0) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <FolderOpen className="w-7 h-7" stroke="url(#irid-img-fill)" />
            <h1 className="text-3xl font-bold irid-gradient-text">
              My Contracts
            </h1>
          </div>
          <p className="text-text-secondary text-sm">
            Manage your deployed smart contracts
          </p>
        </div>

        {/* Empty State Card */}
        <div className="flex flex-col items-center justify-center py-20 bg-navy-800 border border-navy-600 rounded-xl">
          <div className="w-16 h-16 rounded-full bg-navy-700 flex items-center justify-center mb-4">
            <Rocket className="w-8 h-8 text-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            No contracts deployed yet
          </h3>
          <p className="text-sm text-text-muted mb-6 text-center max-w-sm">
            Deploy your first smart contract to see it here. Choose from
            templates or write custom Solidity.
          </p>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm irid-gradient text-navy-950 hover:brightness-110 transition-all shadow-lg cursor-pointer">
            <Rocket className="w-4 h-4" />
            Deploy Your First Contract
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <FolderOpen className="w-7 h-7" stroke="url(#irid-img-fill)" />
          <h1 className="text-3xl font-bold irid-gradient-text">
            My Contracts
          </h1>
        </div>
        <p className="text-text-secondary text-sm">
          Manage your deployed smart contracts
        </p>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contracts..."
            className="w-full bg-navy-800 border border-navy-600 rounded-lg pl-9 pr-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-irid-blue/50 transition-colors placeholder:text-text-muted/50"
          />
        </div>
        <div className="flex items-center gap-4 text-xs text-text-muted">
          <span>
            Total:{" "}
            <span className="text-text-secondary font-medium">
              {contracts.length}
            </span>
          </span>
          <span>
            Active:{" "}
            <span className="text-emerald-400 font-medium">
              {contracts.filter((c) => c.status === "active").length}
            </span>
          </span>
          <span>
            Paused:{" "}
            <span className="text-yellow-400 font-medium">
              {contracts.filter((c) => c.status === "paused").length}
            </span>
          </span>
        </div>
      </div>

      {/* Contracts Table */}
      <div className="bg-navy-800 border border-navy-600 rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 bg-navy-900 border-b border-navy-600 text-xs text-text-muted font-medium uppercase tracking-wider">
          <div className="col-span-3">Contract</div>
          <div className="col-span-3">Address</div>
          <div className="col-span-1">Network</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2">Deployed</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Table Rows */}
        {filteredContracts.map((contract) => (
          <div
            key={contract.id}
            className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-5 py-4 border-b border-navy-700 last:border-0 hover:bg-navy-700/30 transition-colors items-center"
          >
            {/* Contract Name & Type */}
            <div className="col-span-3">
              <p className="text-sm font-medium text-text-primary">
                {contract.name}
              </p>
              <p className="text-xs text-text-muted">{contract.type}</p>
            </div>

            {/* Address */}
            <div className="col-span-3 flex items-center gap-2">
              <span className="text-sm font-mono text-text-secondary">
                {truncateAddress(contract.address)}
              </span>
              <button
                onClick={() => copyAddress(contract.id, contract.address)}
                className="text-text-muted hover:text-text-primary transition-colors"
                title="Copy address"
              >
                {copiedId === contract.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
              <a
                href={`https://sepolia.etherscan.io/address/${contract.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-irid-blue transition-colors"
                title="View on Etherscan"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Network */}
            <div className="col-span-1">
              <span className="text-xs text-text-secondary">
                {contract.network}
              </span>
            </div>

            {/* Status */}
            <div className="col-span-1">
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                  contract.status === "active"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-yellow-500/10 text-yellow-400"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    contract.status === "active"
                      ? "bg-emerald-400"
                      : "bg-yellow-400"
                  }`}
                />
                {contract.status === "active" ? "Active" : "Paused"}
              </span>
            </div>

            {/* Deployed Date */}
            <div className="col-span-2">
              <span className="text-sm text-text-secondary">
                {new Date(contract.deployedDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Actions */}
            <div className="col-span-2 flex items-center justify-end gap-2">
              <button
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-navy-700 text-text-secondary hover:text-text-primary hover:bg-navy-600 transition-colors border border-navy-600"
                title="View contract"
              >
                <Eye className="w-3.5 h-3.5" />
                View
              </button>
              <button
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  contract.status === "active"
                    ? "bg-navy-700 text-yellow-400 hover:bg-yellow-500/10 border-navy-600"
                    : "bg-navy-700 text-emerald-400 hover:bg-emerald-500/10 border-navy-600"
                }`}
                title={
                  contract.status === "active"
                    ? "Pause contract"
                    : "Resume contract"
                }
              >
                {contract.status === "active" ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
                {contract.status === "active" ? "Pause" : "Resume"}
              </button>
              <button
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-navy-700 text-irid-blue hover:bg-irid-blue/10 border border-navy-600 transition-colors"
                title="Upgrade contract"
              >
                <ArrowUpCircle className="w-3.5 h-3.5" />
                Upgrade
              </button>
            </div>
          </div>
        ))}

        {/* Empty search results */}
        {filteredContracts.length === 0 && (
          <div className="flex flex-col items-center py-12 text-text-muted">
            <Search className="w-8 h-8 mb-3 opacity-50" />
            <p className="text-sm">
              No contracts match "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
