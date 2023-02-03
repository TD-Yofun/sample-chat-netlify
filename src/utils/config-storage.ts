import type { ChatConfigModel } from "../model/ChatConfig";

const CHAT_CONFIG_SRC_KEY = "CHAT_CONFIG_SRC_KEY";
const CAHT_FLOW_ID_KEY = "CAHT_FLOW_ID_KEY";

export function get(): ChatConfigModel {
  const src = localStorage.getItem(CHAT_CONFIG_SRC_KEY);
  const flow_id = localStorage.getItem(CAHT_FLOW_ID_KEY);
  return { src, flow_id };
}

export function save(src: string, flow_id: string) {
  localStorage.setItem(CHAT_CONFIG_SRC_KEY, src);
  localStorage.setItem(CAHT_FLOW_ID_KEY, flow_id);
}
