/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROXY_API_HOST: tring;
  readonly VITE_APP_API_ROOT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
