import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';

const users = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  password: text("password"),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image")
});
const accounts = sqliteTable(
  "account",
  {
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state")
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId]
    })
  })
);
const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull()
});
const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull()
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
  })
);

const schema = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    accounts,
    sessions,
    users,
    verificationTokens
}, Symbol.toStringTag, { value: 'Module' }));

const client = createClient({
  url: "libsql://dev-multi-tools-nigarumovum.aws-us-east-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Njg1MzY5NjMsImlkIjoiNTBlYWQ3NzUtNmQxZi00MGM4LWFjMDYtMDQ3ZTk1NjUxMzM2IiwicmlkIjoiMGZjZDg3NTQtODI3Yy00YTdmLTlmNzUtYzE4NzI4ZTEzZDdhIn0.k4GKhwvEAQo_IzW67X6u_mrwD9FWTOHE72eHxKfR2VXiwGRb_2UEwL5K6FZmPEF0bQ1rhOlHKrU2aa7y-RW8DA"
});
const db = drizzle(client, { schema });

export { db as d, users as u, verificationTokens as v };
