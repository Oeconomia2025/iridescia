import { http, createConfig, createStorage } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { coinbaseWallet, metaMask, walletConnect, injected } from 'wagmi/connectors'

declare global {
  interface Window {
    trustWallet?: any
    rabby?: any
    okxwallet?: any
    safe?: any
    phantom?: {
      ethereum?: any
    }
  }
}

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'f0b928a2e4e4b0e9b5e8a2f5e3e4b0e9'

export const config = createConfig({
  chains: [sepolia],
  storage: createStorage({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  }),
  ssr: false,
  connectors: [
    metaMask(),
    walletConnect({
      projectId,
      metadata: {
        name: 'Iridescia',
        description: 'Developer infrastructure for the Oeconomia ecosystem',
        url: typeof window !== 'undefined' ? window.location.origin : 'https://iridescia.oeconomia.io',
        icons: ['https://pub-37d61a7eb7ae45898b46702664710cb2.r2.dev/images/Globe%20Black.png']
      },
      showQrModal: true,
      qrModalOptions: {
        themeMode: 'dark'
      },
      disableProviderPing: false
    }),
    coinbaseWallet({
      appName: 'Iridescia',
    }),
    injected({
      target: {
        id: 'trust',
        name: 'Trust Wallet',
        provider: (window) => (window as any)?.trustWallet,
      },
    }),
    injected({
      target: {
        id: 'rabby',
        name: 'Rabby Wallet',
        provider: (window) => (window as any)?.rabby,
      },
    }),
    injected({
      target: {
        id: 'okx',
        name: 'OKX Wallet',
        provider: (window) => (window as any)?.okxwallet,
      },
    }),
    injected({
      target: {
        id: 'phantom',
        name: 'Phantom Wallet',
        provider: (window) => window?.phantom?.ethereum,
      },
    }),
    injected({
      target: {
        id: 'safe',
        name: 'Safe Wallet',
        provider: (window) => (window as any)?.safe,
      },
    }),
    injected({
      target: 'metaMask',
    }),
  ],
  transports: {
    [sepolia.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
