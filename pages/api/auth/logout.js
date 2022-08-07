import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

export default function logoutHandler(req, res) {
  const { myTokenName } = req.cookies;

  if (!myTokenName) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    verify(myTokenName, process.env.SECRET);
    const serialized = serialize("myTokenName", null, {
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
