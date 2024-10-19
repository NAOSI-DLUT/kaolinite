import { model, Schema } from "mongoose";

export interface User {
  username: string;
  password: string;
  admin: boolean;
}

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true },
});

const UserModel = model<User>("User", userSchema);

export { UserModel };
