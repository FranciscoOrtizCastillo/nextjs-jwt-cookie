import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";  No porque da error The edge runtime does not support Node.js buffer module. https://nextjs.org/docs/messages/node-module-in-edge-runtime
import { jwtVerify } from "jose";

import logger from './src/logger/loggerS'

export async function middleware(request) {
  const jwt = request.cookies.get("accessToken");
  logger.info(`middleware en ${request.url}`,jwt);

  if (!jwt) {
    if (request.url.includes('/api/')) return NextResponse.redirect(new URL('/api/auth/unauthorized', request.url));
    else return NextResponse.redirect(new URL("/login", request.url));
  }

  // this condition avoid to show the login page if the user is logged in
  // if (jwt) {
  //   if (request.nextUrl.pathname.includes("/login")) {
  //     try {
  //       await jwtVerify(jwt, new TextEncoder().encode("secret"));
  //       return NextResponse.redirect(new URL("/dashboard", request.url));
  //     } catch (error) {
  //       return NextResponse.next();
  //     }
  //   }
  // }

  try {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode(process.env.SECRET)
    );
    //console.log({ payload });
    return NextResponse.next();
  } catch (error) {
    if (request.url.includes('/api/')) return NextResponse.redirect(new URL('/api/auth/unauthorized', request.url));
    else return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/private/:path*","/api/private/:path*"], // :path* para todas las subrutas
};
