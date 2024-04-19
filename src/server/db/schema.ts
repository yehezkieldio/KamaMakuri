import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  json,
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
  userCards: many(userCards),
  wishHistories: many(wishHistories),
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

export const userCards = createTable(
  "user_card",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    cardId: varchar("cardId", { length: 255 })
      .notNull()
      .references(() => cards.id),
  },
  (uc) => ({
    userIdIdx: index("user_card_userId_idx").on(uc.userId),
    cardIdIdx: index("user_card_cardId_idx").on(uc.cardId),
  }),
);

export const rarityUserCards = createTable(
  "rarity_user_card",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    quantity: integer("quantity").notNull(),
    userCardId: varchar("userCardId", { length: 255 })
      .notNull()
      .references(() => userCards.id),
    rarityId: varchar("rarityId", { length: 255 })
      .notNull()
      .references(() => rarities.id),
  },
  (ruc) => ({
    userCardIdIdx: index("rarity_user_card_userCardId_idx").on(ruc.userCardId),
    rarityIdIdx: index("rarity_user_card_rarityId_idx").on(ruc.rarityId),
  }),
);

export const userCardStats = createTable(
  "user_card_stat",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    userCardId: varchar("userCardId", { length: 255 })
      .notNull()
      .references(() => userCards.id),
    level: integer("level").notNull(),
    exp: integer("exp").notNull(),
    hp: integer("hp").notNull(),
    atk: integer("atk").notNull(),
    def: integer("def").notNull(),
    spd: integer("spd").notNull(),
    mana: integer("mana").notNull(),
    rarityId: varchar("rarityId", { length: 255 })
      .notNull()
      .references(() => rarities.id),
  },
  (ucs) => ({
    userCardIdIdx: index("user_card_stat_userCardId_idx").on(ucs.userCardId),
    rarityIdIdx: index("user_card_stat_rarityId_idx").on(ucs.rarityId),
  }),
);

export const wishes = createTable(
  "wish",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    rarityWeight: json("rarity_weight").default({
      D: 100,
      C: 50,
      B: 25,
      A: 10,
      S: 5,
      SS: 2,
      SSR: 1,
    }),
    cost: integer("cost").notNull(),
  },
  (wish) => ({
    nameIdx: index("wish_name_idx").on(wish.name),
  }),
);

export const wishHistories = createTable(
  "wish_history",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    rarity: rarityTypeEnum("rarity_type").notNull(),
    isSoftPity: boolean("isSoftPity").default(false),
    isHardPity: boolean("isHardPity").default(false),
    cardId: varchar("cardId", { length: 255 }).notNull(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    wishId: varchar("wishId", { length: 255 })
      .notNull()
      .references(() => wishes.id),
    createdAt: timestamp("createdAt", { mode: "date" }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
  },
  (wh) => ({
    userIdIdx: index("wish_history_userId_idx").on(wh.userId),
    wishIdIdx: index("wish_history_wishId_idx").on(wh.wishId),
  }),
);

export const wishesRelations = relations(wishes, ({ many }) => ({
  cards: many(cards),
  wishHistories: many(wishHistories),
}));

export const userCardsRelations = relations(userCards, ({ one }) => ({
  user: one(users, { fields: [userCards.userId], references: [users.id] }),
  card: one(cards, { fields: [userCards.cardId], references: [cards.id] }),
  userCardStats: one(userCardStats, {
    fields: [userCards.id],
    references: [userCardStats.userCardId],
  }),
}));

export const rarityUserCardRelations = relations(
  rarityUserCards,
  ({ one }) => ({
    userCard: one(userCards, {
      fields: [rarityUserCards.userCardId],
      references: [userCards.id],
    }),
    rarity: one(rarities, {
      fields: [rarityUserCards.rarityId],
      references: [rarities.id],
    }),
    userCardStats: one(userCardStats, {
      fields: [rarityUserCards.userCardId],
      references: [userCardStats.userCardId],
    }),
  }),
);

export const cardRelations = relations(cards, ({ many, one }) => ({
  baseStats: one(cardsBaseStats, {
    fields: [cards.id],
    references: [cardsBaseStats.cardId],
  }),
  rarityCards: many(rarityCards),
  userCards: many(userCards),
  wishes: many(wishes),
  wishHistories: many(wishHistories),
}));
