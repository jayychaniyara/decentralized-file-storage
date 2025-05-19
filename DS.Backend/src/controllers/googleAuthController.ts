import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User";
import { generateToken } from "../utils/jwt";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuthLogin = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Google token is missing." });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({ error: "Invalid Google token" });
    }

    const { email, name, picture, sub: googleId } = payload;

    if (!email) {
      return res
        .status(400)
        .json({ error: "Google account email is required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        name,
        avatar: picture,
        googleId,
        authProvider: "google",
        lastLogin: new Date()
      });
      await user.save();
    } else {
      user.lastLogin = new Date();
      user.googleId = googleId;
      user.avatar = picture;
      await user.save();
    }

    const jwtToken = generateToken({
      id: user._id,
      email: user.email
    });

    return res.status(200).json({
      message: "Google login successful",
      token: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        lastLogin: user.lastLogin
      }
    });
  } catch (error: any) {
    console.error("Google login error:", error);
    return res.status(401).json({ error: "Failed to login with Google" });
  }
};
