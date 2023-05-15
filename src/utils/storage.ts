const CAHT_FLOW_ID_KEY = "CAHT_FLOW_ID_KEY";

export function get(): string {
  return localStorage.getItem(CAHT_FLOW_ID_KEY) || "";
}

export function save(flow_id: string) {
  localStorage.setItem(CAHT_FLOW_ID_KEY, flow_id);
}
