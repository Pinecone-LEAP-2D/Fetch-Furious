import jsonwebtoken from "jsonwebtoken";
import 'dotenv/config'
export const authenticationJWT = (req, res, next) => {
  const token = req.headers.authorization 


  if (!token) return res.status(401).send("Access"); 
  try {    
    const decoded = jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET_KEY);
    req.userId = decoded.userId;
    console.log(decoded);
    if (!decoded.userId) {
      return res.status(500)
    }
     
    next();
  } catch (error) {
    res.status(401).send({ error: "Invalid token" });
  }
};