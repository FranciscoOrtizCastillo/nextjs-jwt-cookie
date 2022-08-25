import jwt from "jsonwebtoken";

import { csrf } from '../../src/csrf/csrf';

function profileHandler(req, res) {
  const { accessToken } = req.cookies;
  
  if (!accessToken) {
    return res.status(401).json({ error: "Not logged in" });
  }

  //const data = jwt.verify(accessToken, process.env.SECRET);
  //console.log(data)
  try {
    const { email, username } = jwt.verify(accessToken, process.env.SECRET);  
    return res.status(200).json({ email, username });
  }
  catch (error) {
    return res.status(401).json({ error: "Not authorised!" });
  }
}

export default csrf(profileHandler)
