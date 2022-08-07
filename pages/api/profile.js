import jwt from "jsonwebtoken";

export default function profileHandler(req, res) {
  const { myTokenName } = req.cookies;
  
  if (!myTokenName) {
    return res.status(401).json({ error: "Not logged in" });
  }

  //const data = jwt.verify(myTokenName, process.env.SECRET);
  //console.log(data)
  try {
    const { email, username } = jwt.verify(myTokenName, process.env.SECRET);  
    return res.status(200).json({ email, username });
  }
  catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
