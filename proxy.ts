import { NextResponse, type NextRequest } from "next/server";

// Arabic is the default and is served without a prefix ("/prices" renders app/[lang=ar]/prices).
// English lives under "/en". A "/ar/..." URL redirects to its unprefixed form so each page has one address.
// If a visitor chose English with the toggle (th-lang cookie), unprefixed URLs send them to the English page.

const LANG_COOKIE = "th-lang";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) return NextResponse.next();

  if (pathname === "/ar" || pathname.startsWith("/ar/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url);
  }

  if (request.cookies.get(LANG_COOKIE)?.value === "en") {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
    url.search = search;
    return NextResponse.redirect(url);
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/ar" : `/ar${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals and any file with an extension (images, icons, robots.txt, sitemap.xml).
  matcher: ["/((?!_next/|.*\\.[^/]+$).*)"],
};
