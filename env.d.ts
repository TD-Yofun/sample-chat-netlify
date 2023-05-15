/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: string;
}

interface Window {
  env: Record<string, string>;
}
