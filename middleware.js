import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";  No porque da error The edge runtime does not support Node.js buffer module. https://nextjs.org/docs/messages/node-module-in-edge-runtime
import { jwtVerify } from "jose";

export async function middleware(request) {
  const jwt = request.cookies.get("myTokenName");

  //console.log(`middleware en ${request.url}`);

  if (!jwt) return NextResponse.redirect(new URL("/login", request.url));

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
    console.log(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/private/:path*"], // :path* para todas las subrutas
};
