export interface ChatConfigModel {
  region: "US" | "EU" | "CA";
  environment: "STG" | "QA" | "PROD";
  touchpoint_id: string;
}

export enum Environment {
  STG = "STG",
  QA = "QA",
  PROD = "PROD",
}

export enum Region {
  US = "US",
  EU = "EU",
  CA = "CA",
}

export interface Configuration {
  environment: Environment;
  region: Region;
  touchpoint_id: string;
}
