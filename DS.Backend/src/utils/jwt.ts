// ✅ Updated JWT Utility - Still Useful for clean separation
// 📄 src/utils/jwt.ts
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export function generateToken(payload: object): string {
    return jwt.sign(payload, JWT_SECRET); 
}

export function verifyJwtToken(token: string): any {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}
