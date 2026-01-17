import { d as db, v as verificationTokens } from './index_ChiojulR.mjs';
import { v4 } from 'uuid';
import { eq } from 'drizzle-orm';
import { Resend } from 'resend';

const generateVerificationToken = async (email) => {
  const token = v4();
  const expires = new Date((/* @__PURE__ */ new Date()).getTime() + 3600 * 1e3);
  const existingToken = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.identifier, email)
  });
  if (existingToken) {
    await db.delete(verificationTokens).where(eq(verificationTokens.identifier, email));
  }
  const [verificationToken] = await db.insert(verificationTokens).values({
    identifier: email,
    token,
    expires
  }).returning();
  return verificationToken;
};
const generatePasswordResetToken = async (email) => {
  const token = v4();
  const expires = new Date((/* @__PURE__ */ new Date()).getTime() + 3600 * 1e3);
  const [passwordResetToken] = await db.insert(verificationTokens).values({
    identifier: `reset:${email}`,
    token,
    expires
  }).returning();
  return passwordResetToken;
};

const resend = new Resend("re_2jcEUM9f_4Hp5ddTwhjPwYwTiNNGcdGNt");
const sendVerificationEmail = async (email, token) => {
  const confirmLink = `${"http://localhost:4321"}/auth/verify-email?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #1a202c;">Confirm your email</h2>
        <p style="color: #4a5568;">Click the link below to verify your email address and join the AI Multi-Agent Studio.</p>
        <a href="${confirmLink}" style="display: inline-block; background-color: #3182ce; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px;">Verify Email</a>
        <p style="color: #a0aec0; font-size: 12px; margin-top: 30px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `
  });
};
const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `${"http://localhost:4321"}/auth/reset-password?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #1a202c;">Reset your password</h2>
        <p style="color: #4a5568;">Click the link below to reset your password for the AI Multi-Agent Studio.</p>
        <a href="${resetLink}" style="display: inline-block; background-color: #3182ce; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px;">Reset Password</a>
        <p style="color: #a0aec0; font-size: 12px; margin-top: 30px;">If you didn't request a password reset, you can safely ignore this email.</p>
      </div>
    `
  });
};

export { generateVerificationToken as a, sendVerificationEmail as b, generatePasswordResetToken as g, sendPasswordResetEmail as s };
