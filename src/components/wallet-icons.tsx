interface WalletIconProps {
  wallet: string;
  className?: string;
  srcOverride?: string;
  alt?: string;
}

const BASE =
  "https://pub-37d61a7eb7ae45898b46702664710cb2.r2.dev/Wallet%20Logos";

const FILES: Record<string, string> = {
  metamask: "MetaMask.png",
  walletconnect: "WalletConnect.png",
  coinbase: "Coinbase.png",
  trustwallet: "Trust Wallet.png",
  rabby: "Rabby.png",
  okx: "OKX.png",
  binance: "Binance.png",
  phantom: "Fantom.png",
  safe: "Safe.png",
  gnosis: "Safe Wallet.png",
  ledger: "Ledger.png",
  trezor: "Trezor.png",
  rainbow: "Rainbow.png",
  zerion: "Zerion.png",
  brave: "Brave Wallet.png",
  uniswap: "Uniswap Wallet.png",
  kraken: "Kraken Wallet.png",
  argent: "Argent.png",
  frame: "Frame.png",
  blockwallet: "BlockWallet.png",
  keplr: "Keplr.png",
  stargazer: "Stargazer.png",
};

function normalizeKey(name: string): string {
  const key = (name || "")
    .toLowerCase()
    .replace(/\.(io|app|com)$/, "")
    .replace(/[\s_\-]+/g, "")
    .replace(/wallet$/g, "wallet");

  if (key.includes("metamask")) return "metamask";
  if (key.includes("walletconnect")) return "walletconnect";
  if (key.includes("coinbase")) return "coinbase";
  if (key.includes("trust")) return "trustwallet";
  if (key.includes("rabby")) return "rabby";
  if (key.includes("okx")) return "okx";
  if (key.includes("binance")) return "binance";
  if (key.includes("phantom")) return "phantom";
  if (key.includes("safe") || key.includes("gnosis")) return "safe";
  if (key.includes("ledger")) return "ledger";
  if (key.includes("trezor")) return "trezor";
  if (key.includes("rainbow")) return "rainbow";
  if (key.includes("zerion")) return "zerion";
  if (key.includes("brave")) return "brave";
  if (key.includes("uniswap")) return "uniswap";
  if (key.includes("kraken")) return "kraken";
  if (key.includes("argent")) return "argent";
  if (key.includes("frame")) return "frame";
  if (key.includes("blockwallet")) return "blockwallet";
  if (key.includes("keplr")) return "keplr";
  if (key.includes("stargazer")) return "stargazer";
  return key;
}

export function WalletIcon({
  wallet,
  className = "w-5 h-5 rounded",
  srcOverride,
  alt,
}: WalletIconProps) {
  const norm = normalizeKey(wallet);
  const fileName = FILES[norm];

  const src = srcOverride
    ? srcOverride
    : fileName
    ? `${BASE}/${encodeURIComponent(fileName)}`
    : `${BASE}/${encodeURIComponent("Generic.png")}`;

  return (
    <img
      src={src}
      alt={alt || `${wallet} logo`}
      className="!w-8 !h-8"
      style={{ backgroundColor: "transparent" }}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src =
          `${BASE}/${encodeURIComponent("Generic.png")}`;
      }}
    />
  );
}
