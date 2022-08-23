import { verify } from "jsonwebtoken";
import { serialize } from "cookie";
import { csrf } from '../../../src/csrf/csrf';

function logoutHandler(req, res) {
  
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    verify(accessToken, process.env.SECRET);
    const serialized = serialize("accessToken", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json({message: "Logout successful"});

  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export default csrf(logoutHandler)