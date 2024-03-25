import type { get } from "./storage";

export const ENVIRONMENT = {
  STG: "https://talkdeskchatsdk.svc.talkdeskstg.com/talkdeskchatsdk.js",
  QA: "https://talkdeskchatsdk.svc.talkdeskqa.com/talkdeskchatsdk.js",
  PROD: "https://talkdeskchatsdk.talkdeskapp.com/talkdeskchatsdk.js",
};

export function isValid(config: ReturnType<typeof get>) {
  return (
    config &&
    config.environment &&
    ENVIRONMENT[config.environment] &&
    config.flow_id
  );
}
