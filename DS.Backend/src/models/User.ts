import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password?: string;
  lastLogin: Date;
  avatar?: string;
  googleId?: string;
  authProvider: "local" | "google";
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function (this: IUser) {
      return this.authProvider === "local";
    },
    minlength: [6, "Password must be at least 6 characters long."]
  },
  lastLogin: {
    type: Date,
    default: null
  },
  avatar: { type: String },
  googleId: { type: String },
  authProvider: { type: String, enum: ["local", "google"], default: "local" }
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
