import { d as db, u as users } from '../../../chunks/index_ChiojulR.mjs';
import { eq } from 'drizzle-orm';
import { g as generatePasswordResetToken, s as sendPasswordResetEmail } from '../../../chunks/mail_D2ls9M2F.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const { email } = await request.json();
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (user) {
      const token = await generatePasswordResetToken(email);
      await sendPasswordResetEmail(email, token.token);
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Forgot Password API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
