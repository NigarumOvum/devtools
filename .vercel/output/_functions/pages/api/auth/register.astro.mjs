import { d as db, u as users } from '../../../chunks/index_ChiojulR.mjs';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import { a as generateVerificationToken, b as sendVerificationEmail } from '../../../chunks/mail_D2ls9M2F.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const { name, email, password } = await request.json();
    const [existingUser] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already in use" }), { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = v4();
    await db.insert(users).values({
      id: userId,
      name,
      email,
      password: hashedPassword
    });
    const token = await generateVerificationToken(email);
    await sendVerificationEmail(email, token.token);
    return new Response(JSON.stringify({ success: true, message: "User registered. Please check your email for verification." }), { status: 201 });
  } catch (error) {
    console.error("Registration API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
