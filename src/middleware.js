import { NextResponse, NextRequest } from "next/server";
export function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/dokter")) {
    if (request.cookies.get("myCookieName") === undefined) {
      return console.log("oke");
    }
  }
}
