import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import HttpStatusCodes from "../helpers/status_code_helper";
export interface AuthRequest extends Request {
  user?: {
    _id: Types.ObjectId;
  };
}

interface JWTUserPayload extends JwtPayload {
  userId: string;
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json(HttpStatusCodes.UNAUTHENTICATED("No token provided"));
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JWTUserPayload;
    req.user = { _id: new Types.ObjectId(decoded.userId) };
    next();
  } catch (error) {
    return res
      .status(403)
      .json(HttpStatusCodes.PERMISSION_DENIED("Invalid token"));
  }
};
