import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const subdomain = host.split(".")[0];

  if (subdomain === "card") {
    return NextResponse.rewrite(new URL("/card", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};