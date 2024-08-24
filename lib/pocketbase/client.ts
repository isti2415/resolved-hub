import PocketBase from "pocketbase";

export async function initPocketBaseClient() {
  const pocketbase: PocketBase = new PocketBase(
    process.env.NEXT_PUBLIC_POCKETBASE_URL
  );

  pocketbase.authStore.loadFromCookie(document.cookie);

  pocketbase.authStore.onChange(() => {
    document.cookie = pocketbase.authStore.exportToCookie({
      httpOnly: false,
    });
  });

  return pocketbase;
}