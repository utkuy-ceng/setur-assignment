import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "tr"],
  defaultLocale: "en",
  localePrefix: "always",
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - files with extensions (static files)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
