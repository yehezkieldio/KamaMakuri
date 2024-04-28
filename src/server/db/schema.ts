import { generatePublicId } from "@/lib/nanoid";
import { relations, sql } from "drizzle-orm";
import {
    boolean,
    index,
    integer,
    json,
    numeric,
    pgEnum,
    pgTableCreator,
    primaryKey,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

export const createTable = pgTableCreator((name) => `kama-makuri_${name}`);

/* -------------------------------------------------------------------------- */
/*                                    USER                                    */
/* -------------------------------------------------------------------------- */

export const roles = pgEnum("role", ["user", "admin"]);

export const users = createTable(
    "user",
    {
        id: varchar("id", { length: 255 }).notNull().primaryKey(),
        // public id for user
        uid: varchar("uid", { length: 14 }).default(generatePublicId()),
        name: varchar("name", { length: 255 }),
        pity: integer("pity").default(0),
        role: roles("role").default("user"),
        email: varchar("email", { length: 255 }).notNull(),
        emailVerified: timestamp("emailVerified", {
            mode: "date",
        }).default(sql`CURRENT_TIMESTAMP`),
        image: varchar("image", { length: 255 }),
    },
    (user) => ({
        uidIdx: index("user_uid_idx").on(user.uid),
        emailIdx: index("user_email_idx").on(user.email),
    })
);

export const economies = createTable(
    "economy",
    {
        userId: varchar("userId", { length: 255 })
            .notNull()
            .references(() => users.id, {
                onDelete: "cascade",
                onUpdate: "cascade",
            }),
        crystals: integer("crystals").default(0),
        fates: integer("fates").default(0),
    },
    (economy) => ({
        userIdIdx: index("economy_userId_idx").on(economy.userId),
    })
);

export const progressions = createTable(
    "progression",
    {
        userId: varchar("userId", { length: 255 })
            .notNull()
            .references(() => users.id, {
                onDelete: "cascade",
                onUpdate: "cascade",
            }),
        level: integer("level").default(1),
        exp: integer("exp").default(0),
    },
    (progression) => ({
        userIdIdx: index("progression_userId_idx").on(progression.userId),
    })
);

export const userRelations = relations(users, ({ one, many }) => ({
    accounts: one(accounts, {
        fields: [users.id],
        references: [accounts.userId],
    }),
    economies: one(economies, {
        fields: [users.id],
        references: [economies.userId],
    }),
    progressions: one(progressions, {
        fields: [users.id],
        references: [progressions.userId],
    }),
    cards: many(userCards),
    decks: many(decks),
    wishHistories: many(wishHistories),
}));

/* -------------------------------------------------------------------------- */
/*                                    AUTH                                    */
/* -------------------------------------------------------------------------- */

export const accounts = createTable(
    "account",
    {
        userId: varchar("userId", { length: 255 })
            .notNull()
            .references(() => users.id),
        type: varchar("type", { length: 255 }).$type<AdapterAccount["type"]>().notNull(),
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
    })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
    "session",
    {
        sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
        userId: varchar("userId", { length: 255 })
            .notNull()
            .references(() => users.id),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (session) => ({
        userIdIdx: index("session_userId_idx").on(session.userId),
    })
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
    })
);

/* -------------------------------------------------------------------------- */
/*                                    CARD                                    */
/* -------------------------------------------------------------------------- */

export const cardSeries = createTable(
    "cardSeries",
    {
        id: varchar("id", { length: 255 }).notNull().primaryKey(),
        name: varchar("name", { length: 255 }).notNull(),
    },
    (series) => ({
        nameIdx: index("card_series_name_idx").on(series.name),
    })
);

export const elementTypeEnum = pgEnum("element_type", ["fire", "water", "earth", "wind", "light", "dark"]);

// base standard un-owned cards
export const cards = createTable(
    "card",
    {
        id: varchar("id", { length: 255 }).notNull().primaryKey(),
        name: varchar("name", { length: 255 }).notNull(),
        stock: integer("stock").default(0),
        element: elementTypeEnum("element").notNull(),
        seriesId: varchar("seriesId", { length: 255 })
            .notNull()
            .references(() => cardSeries.id),
    },
    (card) => ({
        nameIdx: index("card_name_idx").on(card.name),
    })
);

export const cardBaseStats = createTable(
    "cardBaseStats",
    {
        cardId: varchar("cardId", { length: 255 })
            .notNull()
            .references(() => cards.id),
        hp: integer("hp").notNull(),
        atk: integer("atk").notNull(),
        def: integer("def").notNull(),
        spd: integer("spd").notNull(),
        mana: integer("mana").notNull(),
    },
    (cardBaseStats) => ({
        cardIdIdx: index("cardBaseStats_cardId_idx").on(cardBaseStats.cardId),
    })
);

export const cardRelations = relations(cards, ({ one, many }) => ({
    baseStats: one(cardBaseStats, {
        fields: [cards.id],
        references: [cardBaseStats.cardId],
    }),
    rarities: many(rarityCards),
    userCards: many(userCards),
    wishes: many(wishHistories),
    wishHistories: many(wishHistories),
    series: one(cardSeries, {
        fields: [cards.seriesId],
        references: [cardSeries.id],
    }),
}));

/* -------------------------------------------------------------------------- */
/*                                   RARITY                                   */
/* -------------------------------------------------------------------------- */

export const raritiesEnum = ["D", "C", "B", "A", "S", "SS", "SSR"] as const;
export const rarityTypeEnum = pgEnum("rarity_type", raritiesEnum);

export const rarities = createTable("rarity", {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: rarityTypeEnum("name").notNull(),
    probability: numeric("probability").notNull(),
});

// attach rarities to cards
export const rarityCards = createTable(
    "rarityCard",
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
    })
);

export const rarityCardRelations = relations(rarityCards, ({ one }) => ({
    rarity: one(rarities, {
        fields: [rarityCards.rarityId],
        references: [rarities.id],
    }),
    card: one(cards, { fields: [rarityCards.cardId], references: [cards.id] }),
}));

/* -------------------------------------------------------------------------- */
/*                                    DECK                                    */
/* -------------------------------------------------------------------------- */

export const decks = createTable(
    "deck",
    {
        id: varchar("id", { length: 255 }).notNull().primaryKey(),
        userId: varchar("userId", { length: 255 })
            .notNull()
            .references(() => users.id),
    },
    (deck) => ({
        userIdIdx: index("deck_userId_idx").on(deck.userId),
    })
);

export const deckRelations = relations(decks, ({ one, many }) => ({
    user: one(users, { fields: [decks.userId], references: [users.id] }),
    cards: many(cardDecks),
}));

// attach cards to decks with position
export const cardDecks = createTable(
    "cardDeck",
    {
        userCardId: varchar("userCardId", { length: 255 })
            .notNull()
            .references(() => rarityUserCards.id),
        deckId: varchar("deckId", { length: 255 })
            .notNull()
            .references(() => decks.id),
        position: integer("position").notNull(),
    },
    (cd) => ({
        compoundKey: primaryKey({
            columns: [cd.userCardId, cd.deckId],
        }),
        userCardIdx: index("card_deck_userCardId_idx").on(cd.userCardId),
        deckIdIdx: index("card_deck_deckId_idx").on(cd.deckId),
    })
);

export const cardDeckRelations = relations(cardDecks, ({ one }) => ({
    userCard: one(rarityUserCards, {
        fields: [cardDecks.userCardId],
        references: [rarityUserCards.id],
    }),
    deck: one(decks, {
        fields: [cardDecks.deckId],
        references: [decks.id],
    }),
}));

/* -------------------------------------------------------------------------- */
/*                                  USER CARD                                 */
/* -------------------------------------------------------------------------- */

// owned cards collection
export const userCards = createTable(
    "userCard",
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
    })
);

export const userCardRelations = relations(userCards, ({ one, many }) => ({
    card: one(cards, { fields: [userCards.cardId], references: [cards.id] }),
    user: one(users, { fields: [userCards.userId], references: [users.id] }),
    rarities: many(rarityUserCards),
}));

// owned cards with rarity, stats, and progression
export const rarityUserCards = createTable(
    "rarityUserCard",
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
    })
);

export const rarityUserCardRelations = relations(rarityUserCards, ({ one, many }) => ({
    userCard: one(userCards, {
        fields: [rarityUserCards.userCardId],
        references: [userCards.id],
    }),
    rarity: one(rarities, {
        fields: [rarityUserCards.rarityId],
        references: [rarities.id],
    }),
    stats: one(userCardStats),
    progression: one(userCardProgressions),
    decks: many(cardDecks),
}));

export const userCardStats = createTable(
    "userCardStats",
    {
        userCardId: varchar("userCardId", { length: 255 })
            .notNull()
            .references(() => userCards.id),
        hp: integer("hp").notNull(),
        atk: integer("atk").notNull(),
        def: integer("def").notNull(),
        spd: integer("spd").notNull(),
        mana: integer("mana").notNull(),
    },
    (ucs) => ({
        userCardIdIdx: index("user_card_stats_userCardId_idx").on(ucs.userCardId),
    })
);

export const userCardProgressions = createTable(
    "userCardProgression",
    {
        userCardId: varchar("userCardId", { length: 255 })
            .notNull()
            .references(() => userCards.id),
        level: integer("level").notNull(),
        exp: integer("exp").notNull(),
    },
    (ucp) => ({
        userCardIdIdx: index("user_card_progression_userCardId_idx").on(ucp.userCardId),
    })
);

/* -------------------------------------------------------------------------- */
/*                                    WISH                                    */
/* -------------------------------------------------------------------------- */

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
    })
);

export const wishRelations = relations(wishes, ({ many }) => ({
    histories: many(wishHistories),
    cards: many(cards),
}));

export const wishHistories = createTable(
    "wishHistory",
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
        createdAt: timestamp("createdAt", { mode: "date" }).default(sql`CURRENT_TIMESTAMP`),
        updatedAt: timestamp("updatedAt", { mode: "date" }).default(sql`CURRENT_TIMESTAMP`),
    },
    (wh) => ({
        userIdIdx: index("wish_history_userId_idx").on(wh.userId),
        wishIdIdx: index("wish_history_wishId_idx").on(wh.wishId),
    })
);

export const wishHistoryRelations = relations(wishHistories, ({ one }) => ({
    user: one(users, { fields: [wishHistories.userId], references: [users.id] }),
    wish: one(wishes, {
        fields: [wishHistories.wishId],
        references: [wishes.id],
    }),
    card: one(cards, { fields: [wishHistories.cardId], references: [cards.id] }),
}));
