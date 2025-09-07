import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secretkey = process.env.JWT_SECRET;
    // console.log(secretkey);
    // console.log("Verifying token:", token);
    console.log("🔍 Token received:", token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    console.log("Decoded token:", decoded);
    req.user = decoded; // you can access req.user.id and req.user.role
    next();
  } catch (error) {
    // console.error("Token verification error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default verifyToken;
