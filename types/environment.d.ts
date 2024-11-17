export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BSKY_USERNAME: string;
      BSKY_PASSWORD: string;
    }
  }
}
