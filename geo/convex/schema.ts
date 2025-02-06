import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    scores: defineTable({
        userId: v.string(),
        name: v.string(),
        score: v.number(),
        creationTime: v.number(),
        timeLeft: v.optional(v.number()), // remaining time when guess made
        roundComplete: v.optional(v.boolean()),
        bonusScore: v.optional(v.number()), // additional points for quick guesses
        totalScore: v.optional(v.number()), // combined score with bonus
    }),
});