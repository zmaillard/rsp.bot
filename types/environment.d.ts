export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BSKY_USERNAME: string;
      BSKY_PASSWORD: string;
      AUTO_POST_CRON_SCHEDULE?: string;
    }
  }
}
