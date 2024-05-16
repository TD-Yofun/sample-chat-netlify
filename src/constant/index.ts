import { Environment, Region } from "@/model/ChatConfig";

type IConfigurations = Record<Region, Partial<Record<Environment, string>>>;

export const CONFIGURATIONS: IConfigurations = {
  [Region.US]: {
    [Environment.STG]:
      "https://talkdeskchatsdk.svc.talkdeskstg.com/talkdeskchatsdk.js",
    [Environment.QA]:
      "https://talkdeskchatsdk.svc.talkdeskqa.com/talkdeskchatsdk.js",
    [Environment.PROD]:
      "https://talkdeskchatsdk.talkdeskapp.com/talkdeskchatsdk.js",
  },
  [Region.EU]: {
    [Environment.STG]:
      "https://talkdeskchatsdk.svc.talkdeskstg.com/talkdeskchatsdk.js",
    [Environment.QA]:
      "https://talkdeskchatsdk.svc.talkdeskqa.com/talkdeskchatsdk.js",
    [Environment.PROD]:
      "https://talkdeskchatsdk.talkdeskapp.com/talkdeskchatsdk.js",
  },
  [Region.CA]: {
    [Environment.STG]:
      "https://talkdeskchatsdk.svc.talkdeskstg.com/talkdeskchatsdk.js",
    [Environment.QA]:
      "https://talkdeskchatsdk.svc.talkdeskqa.com/talkdeskchatsdk.js",
    [Environment.PROD]:
      "https://talkdeskchatsdk.talkdeskapp.com/talkdeskchatsdk.js",
  },
};
