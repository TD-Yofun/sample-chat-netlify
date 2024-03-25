import type { ChatConfigModel } from "@/model/ChatConfig";

const KEY = "__industries_kirin__";

export function get(): ChatConfigModel | null {
  const value = localStorage.getItem(KEY) || "";
  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
}

export function save(value: ChatConfigModel) {
  localStorage.setItem(KEY, JSON.stringify(value));
}
