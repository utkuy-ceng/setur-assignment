import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware({
    locales: ["en", "tr"],
    defaultLocale: "en",
  });
  const response = handleI18nRouting(request);
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(tr|en)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
