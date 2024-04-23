import mongoose from "mongoose";

// Mongoose のスキーマを作成
const userSchema = new mongoose.Schema({
  username: {
    type: String, // 型を指定する
    required: true, // 必須カラムかどうか
    unique: true, // 一意かどうか
  },
  password: {
    type: String, // 型を指定する
    required: true, // 必須カラムかどうか
  },
});

// モデルを作成
module.exports = mongoose.model("User", userSchema);
