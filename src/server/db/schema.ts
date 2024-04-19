import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `kama-makuri_${name}`);

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts),
  economies: one(economies, {
    fields: [users.id],
    references: [economies.userId],
  }),
  progressions: one(progressions, {
    fields: [users.id],
    references: [progressions.userId],
  }),
}));

export const economies = createTable("economy", {
  userId: varchar("userId", {
    length: 255,
  })
    .notNull()
    .references(() => users.id),
  crystals: integer("crystals").default(0),
  fates: integer("fates").default(0),
});

export const progressions = createTable("progression", {
  userId: varchar("userId", {
    length: 255,
  })
    .notNull()
    .references(() => users.id),
  level: integer("level").default(1),
  exp: integer("exp").default(0),
});

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const elementTypeEnum = pgEnum("element_type", [
  "fire",
  "water",
  "earth",
  "wind",
  "light",
  "dark",
]);

export const cards = createTable(
  "card",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    stock: integer("stock").default(0),
    element: elementTypeEnum("element_type").notNull(),
  },
  (card) => ({
    nameIdx: index("card_name_idx").on(card.name),
  }),
);

export const cardsBaseStats = createTable("card_base_stat", {
  cardId: varchar("cardId", { length: 255 })
    .notNull()
    .references(() => cards.id),
  hp: integer("hp").notNull(),
  atk: integer("atk").notNull(),
  def: integer("def").notNull(),
  spd: integer("spd").notNull(),
  mana: integer("mana").notNull(),
});

export const rarityTypeEnum = pgEnum("rarity_type", [
  "D",
  "C",
  "B",
  "A",
  "S",
  "SS",
  "SSR",
]);

export const rarities = createTable("rarity", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: rarityTypeEnum("rarity_type").notNull(),
  probability: integer("probability").notNull(),
});

export const rarityCards = createTable(
  "rarity_card",
  {
    rarityId: varchar("rarityId", { length: 255 })
      .notNull()
      .references(() => rarities.id),
    cardId: varchar("cardId", { length: 255 })
      .notNull()
      .references(() => cards.id),
  },
  (rc) => ({
    compoundKey: primaryKey({
      columns: [rc.rarityId, rc.cardId],
    }),
    rarityIdIdx: index("rarity_card_rarityId_idx").on(rc.rarityId),
    cardIdIdx: index("rarity_card_cardId_idx").on(rc.cardId),
  }),
);

export const cardRelations = relations(cards, ({ many, one }) => ({
  baseStats: one(cardsBaseStats, {
    fields: [cards.id],
    references: [cardsBaseStats.cardId],
  }),
  rarityCards: many(rarityCards),
}));
