import jwt from "jsonwebtoken";

const generateToken = (payload: any) =>
  jwt.sign(payload, process.env.JWT_SECRET as string);

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    return false;
  }
};

export { generateToken, verifyToken };
