import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD?.replace(/\s/g, ""),
  },
});

export const sendOtpEmail = async (to: string, otp: string, name?: string): Promise<void> => {
  const displayName = name ? ` ${name}` : "";

  const otpBoxes = otp.split("").map(
    (digit) =>
      `<div style="width: 40px; height: 50px; display: flex; align-items: center; justify-content: center; background: #f0f4ff; border: 2px solid #6a11cb; border-radius: 8px; font-size: 24px; font-weight: bold; color: #6a11cb;">${digit}</div>`
  ).join("");

  const html = `
    <div style="font-family: 'Segoe UI', sans-serif; padding: 24px; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 10px; max-width: 520px; margin: auto;">
      <h2 style="color: #6a11cb; margin-bottom: 10px;">BlockStore OTP Verification</h2>
      <p style="font-size: 16px;">Hello${displayName},</p>
      <p style="font-size: 15px;">Use the following OTP to reset your password:</p>

      <div style="display: flex; justify-content: space-between; margin: 24px 0; gap: 10px;">
        ${otpBoxes}
      </div>

      <p style="font-size: 14px; color: #555;">This OTP is valid for 10 minutes.</p>
      <p style="font-size: 14px; color: #555;">If you didn’t request this, please ignore this email.</p>

      <hr style="margin: 30px 0;" />

      <p style="font-size: 13px; color: #888;">BlockStore - Decentralized Storage Platform</p>
      <p style="font-size: 13px; color: #6a11cb;">
        <a href="https://jayychaniyara.github.io/BlockStore/" target="_blank">
          Visit our website
        </a>
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"BlockStore" <${process.env.SMTP_EMAIL}>`,
    to,
    subject: "BlockStore OTP Verification",
    html,
  });
};
