/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: string;
  readonly VITE_APP_LIB_URL: string;
}

interface Window {
  env: Record<string, string>;
}
