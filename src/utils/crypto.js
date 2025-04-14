import crypto from "crypto";

export default (text) => crypto
  .createHash("md5")
  .update(text)
  .digest("hex");
