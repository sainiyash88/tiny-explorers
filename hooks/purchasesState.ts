let configured = false;

export function setPurchasesConfigured(value: boolean) {
  configured = value;
}

export function isPurchasesConfigured() {
  return configured;
}
