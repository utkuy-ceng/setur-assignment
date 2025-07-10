import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function RootPage() {
  // Check if user has a language preference stored in cookies
  const cookieStore = cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE");

  // If user has a preferred locale, redirect to that locale
  // Otherwise, redirect to the default locale (en)
  const preferredLocale = localeCookie?.value || "en";

  redirect(`/${preferredLocale}`);
}
