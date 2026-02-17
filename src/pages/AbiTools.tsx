import { useState } from "react";
import {
  Braces,
  ArrowRightLeft,
  Code2,
  Copy,
  Check,
  Plus,
  Trash2,
} from "lucide-react";

const EXAMPLE_CALLDATA =
  "0xa9059cbb000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa960450000000000000000000000000000000000000000000000000de0b6b3a7640000";

const EXAMPLE_ABI = `[
  {
    "name": "transfer",
    "type": "function",
    "inputs": [
      { "name": "to", "type": "address" },
      { "name": "amount", "type": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "bool" }]
  }
]`;

const DECODED_RESULT = {
  functionName: "transfer",
  selector: "0xa9059cbb",
  parameters: [
    {
      name: "to",
      type: "address",
      value: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    },
    {
      name: "amount",
      type: "uint256",
      value: "1000000000000000000",
    },
  ],
};

interface EncodeParam {
  id: number;
  value: string;
}

export default function AbiTools() {
  const [activeTab, setActiveTab] = useState<"decode" | "encode">("decode");

  // Decode state
  const [calldata, setCalldata] = useState(EXAMPLE_CALLDATA);
  const [abi, setAbi] = useState(EXAMPLE_ABI);
  const [showDecodeResult, setShowDecodeResult] = useState(true);

  // Encode state
  const [funcSignature, setFuncSignature] = useState(
    "transfer(address,uint256)"
  );
  const [encodeParams, setEncodeParams] = useState<EncodeParam[]>([
    { id: 1, value: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" },
    { id: 2, value: "1000000000000000000" },
  ]);
  const [showEncodeResult, setShowEncodeResult] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleDecode = () => {
    setShowDecodeResult(true);
  };

  const handleEncode = () => {
    setShowEncodeResult(true);
  };

  const addParam = () => {
    const maxId = encodeParams.reduce((max, p) => Math.max(max, p.id), 0);
    setEncodeParams([...encodeParams, { id: maxId + 1, value: "" }]);
  };

  const removeParam = (id: number) => {
    setEncodeParams(encodeParams.filter((p) => p.id !== id));
  };

  const updateParam = (id: number, value: string) => {
    setEncodeParams(
      encodeParams.map((p) => (p.id === id ? { ...p, value } : p))
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: "decode" as const, label: "Decode Calldata", icon: ArrowRightLeft },
    { id: "encode" as const, label: "Encode Function", icon: Code2 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Braces className="w-7 h-7 text-irid-purple" />
          <h1 className="text-3xl font-bold irid-gradient-text">ABI Tools</h1>
        </div>
        <p className="text-text-secondary text-sm">
          Decode calldata and encode function calls
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-1 bg-navy-800 rounded-lg p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "irid-gradient text-navy-950 shadow-md"
                : "text-text-secondary hover:text-text-primary hover:bg-navy-700"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Decode Tab */}
      {activeTab === "decode" && (
        <div className="space-y-4">
          {/* Calldata Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">
              Hex Calldata
            </label>
            <textarea
              value={calldata}
              onChange={(e) => setCalldata(e.target.value)}
              placeholder="0x..."
              className="w-full h-28 bg-navy-800 border border-navy-600 rounded-lg p-4 text-text-primary font-mono text-sm resize-y focus:outline-none focus:border-irid-blue/50 transition-colors placeholder:text-text-muted/50"
            />
          </div>

          {/* ABI Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">
              ABI (JSON)
            </label>
            <textarea
              value={abi}
              onChange={(e) => setAbi(e.target.value)}
              placeholder="Paste ABI JSON array..."
              className="w-full h-40 bg-navy-800 border border-navy-600 rounded-lg p-4 text-text-primary font-mono text-sm resize-y focus:outline-none focus:border-irid-blue/50 transition-colors placeholder:text-text-muted/50"
            />
          </div>

          {/* Decode Button */}
          <button
            onClick={handleDecode}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm irid-gradient text-navy-950 hover:brightness-110 transition-all shadow-lg cursor-pointer"
            style={{ boxShadow: "0 0 20px rgba(96, 165, 250, 0.2)" }}
          >
            <ArrowRightLeft className="w-4 h-4" />
            Decode
          </button>

          {/* Decode Results */}
          {showDecodeResult && (
            <div className="bg-navy-800 border border-navy-600 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-text-primary">
                  Decoded Result
                </h3>
                <button
                  onClick={() =>
                    copyToClipboard(JSON.stringify(DECODED_RESULT, null, 2))
                  }
                  className="flex items-center gap-1 text-xs text-text-muted hover:text-text-primary transition-colors"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              {/* Function Name */}
              <div className="space-y-1">
                <p className="text-xs text-text-muted">Function</p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-irid-cyan font-semibold">
                    {DECODED_RESULT.functionName}
                  </span>
                  <span className="text-xs text-text-muted font-mono">
                    ({DECODED_RESULT.selector})
                  </span>
                </div>
              </div>

              {/* Parameters */}
              <div className="space-y-2">
                <p className="text-xs text-text-muted">Parameters</p>
                <div className="space-y-2">
                  {DECODED_RESULT.parameters.map((param, idx) => (
                    <div
                      key={idx}
                      className="bg-navy-700/50 rounded-lg p-3 border border-navy-600"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-irid-purple">
                          {param.type}
                        </span>
                        <span className="text-xs text-text-secondary font-medium">
                          {param.name}
                        </span>
                      </div>
                      <p className="text-sm font-mono text-text-primary break-all">
                        {param.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Encode Tab */}
      {activeTab === "encode" && (
        <div className="space-y-4">
          {/* Function Signature */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">
              Function Signature
            </label>
            <input
              type="text"
              value={funcSignature}
              onChange={(e) => setFuncSignature(e.target.value)}
              placeholder="e.g., transfer(address,uint256)"
              className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-3 text-text-primary font-mono text-sm focus:outline-none focus:border-irid-blue/50 transition-colors placeholder:text-text-muted/50"
            />
          </div>

          {/* Dynamic Parameter Inputs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text-secondary">
                Parameters
              </label>
              <button
                onClick={addParam}
                className="flex items-center gap-1 text-xs text-irid-blue hover:text-irid-cyan transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Parameter
              </button>
            </div>
            <div className="space-y-2">
              {encodeParams.map((param, idx) => (
                <div key={param.id} className="flex items-center gap-2">
                  <span className="text-xs text-text-muted w-6 text-right font-mono">
                    {idx}:
                  </span>
                  <input
                    type="text"
                    value={param.value}
                    onChange={(e) => updateParam(param.id, e.target.value)}
                    placeholder={`Parameter ${idx} value`}
                    className="flex-1 bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-text-primary font-mono text-sm focus:outline-none focus:border-irid-blue/50 transition-colors placeholder:text-text-muted/50"
                  />
                  <button
                    onClick={() => removeParam(param.id)}
                    className="p-2 text-text-muted hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Encode Button */}
          <button
            onClick={handleEncode}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm irid-gradient text-navy-950 hover:brightness-110 transition-all shadow-lg cursor-pointer"
            style={{ boxShadow: "0 0 20px rgba(96, 165, 250, 0.2)" }}
          >
            <Code2 className="w-4 h-4" />
            Encode
          </button>

          {/* Encode Result */}
          {showEncodeResult && (
            <div className="bg-navy-800 border border-navy-600 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-text-primary">
                  Encoded Calldata
                </h3>
                <button
                  onClick={() => copyToClipboard(EXAMPLE_CALLDATA)}
                  className="flex items-center gap-1 text-xs text-text-muted hover:text-text-primary transition-colors"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <div className="bg-navy-700/50 rounded-lg p-3 border border-navy-600">
                <p className="font-mono text-sm text-text-primary break-all leading-relaxed">
                  {EXAMPLE_CALLDATA}
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs text-text-muted">
                <span>
                  Selector: <code className="text-irid-cyan">0xa9059cbb</code>
                </span>
                <span>Bytes: {EXAMPLE_CALLDATA.length / 2 - 1}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
