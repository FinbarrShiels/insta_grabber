interface Window {
  dataLayer: Array<Record<string, unknown>>;
  gtag: (command: string, ...args: unknown[]) => void;
} 