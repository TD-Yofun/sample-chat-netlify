import type { ChatConfigModel } from "@/model/ChatConfig";
import type { get } from "./storage";

export const REGION: Record<ChatConfigModel["region"], string> = {
  US: "td-us-1",
  EU: "td-eu-1",
  CA: "td-ca-1",
};

export const ENVIRONMENT = {
  STG: "https://talkdeskchatsdk.svc.talkdeskstg.com/talkdeskchatsdk.js",
  QA: "https://talkdeskchatsdk.svc.talkdeskqa.com/talkdeskchatsdk.js",
  PROD: "https://talkdeskchatsdk.talkdeskapp.com/talkdeskchatsdk.js",
};

export function isValid(config: ReturnType<typeof get>) {
  return (
    config &&
    Object.keys(ENVIRONMENT).includes(config.environment) &&
    Object.keys(REGION).includes(config.region) &&
    config.touchpoint_id
  );
}

export function getURLParams(): ChatConfigModel | null {
  const urlParams = new URLSearchParams(window.location.search);
  const region = urlParams.get("region");
  const environment = urlParams.get("environment");
  const touchpoint_id = urlParams.get("touchpoint_id");

  const config = { region, environment, touchpoint_id } as ChatConfigModel;
  if (isValid(config)) {
    return config;
  }
  return null;
}
