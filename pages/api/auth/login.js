import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default function loginHandler(req, res) {

  //console.log(req.body);
  
  const { email, password } = req.body;

  // consultar en la base de datos si el usuario existe
  if (email === "admin@local.local" && password === "admin") {
    // expire in 30 days
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30), // 30 days
        email,
        username: "admin",
      },
      process.env.SECRET
    );

    const serialized = serialize("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only send cookie over https in production
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);

    return res.status(200).json({
      message: "Login successful",
    });
  }

  return res.status(401).json({ error: "Invalid credentials" });
}
