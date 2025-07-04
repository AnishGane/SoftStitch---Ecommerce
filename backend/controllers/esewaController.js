import crypto from "crypto";

export const generateEsewaSignature = (req, res) => {
  const { total_amount, transaction_uuid, product_code } = req.body;
  const secretKey = process.env.ESEWA_SECRET_KEY;
  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(message);
  const signature = hmac.digest("base64");
  res.json({ signature });
};
