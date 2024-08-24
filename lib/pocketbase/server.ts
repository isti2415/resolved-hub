import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import PocketBase from "pocketbase";

export async function initPocketBaseServer() {
  const pocketbase: PocketBase = new PocketBase(
    process.env.NEXT_PUBLIC_POCKETBASE_URL
  );

  let response = NextResponse.next();

  const authCookie = cookies().get("pb_auth");

  if (authCookie) {
    pocketbase.authStore.loadFromCookie(
      `${authCookie.name}=${authCookie.value}`
    );

    try {
      if (pocketbase.authStore.isValid) {
        await pocketbase.collection("users").authRefresh();
      }
    } catch (error) {
      pocketbase.authStore.clear();
    }
  }

  pocketbase.authStore.onChange(() => {
    response?.headers.set("set-cookie", pocketbase.authStore.exportToCookie());
  });

  return pocketbase;
}
