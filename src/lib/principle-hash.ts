export type PrincipleHashSnapshot = Readonly<{
  hash: string;
  id: string | null;
}>;

export const SERVER_PRINCIPLE_HASH_SNAPSHOT: PrincipleHashSnapshot = {
  hash: "",
  id: null,
};

let cachedSnapshot: PrincipleHashSnapshot | undefined;

export function principleIdFromHash(hash: string): string | null {
  const id = hash.replace(/^#/, "");
  return id && id !== "all" ? id : null;
}

export function getPrincipleHashSnapshot(): PrincipleHashSnapshot {
  const hash = window.location.hash;
  if (cachedSnapshot?.hash === hash) return cachedSnapshot;

  cachedSnapshot = {
    hash,
    id: principleIdFromHash(hash),
  };
  return cachedSnapshot;
}

export function subscribeToHashChange(onStoreChange: () => void) {
  window.addEventListener("hashchange", onStoreChange);
  return () => window.removeEventListener("hashchange", onStoreChange);
}
