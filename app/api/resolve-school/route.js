import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  const host = req.headers.get("host") || "";
  const subdomain = host.split(".")[0];
  url.pathname = `/${subdomain}`;
  return NextResponse.redirect(url.toString());
}
