import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// @snippet start schema
export default defineSchema({
    scores: defineTable({
      name: v.string(),
      score: v.number(),
    }),
  });