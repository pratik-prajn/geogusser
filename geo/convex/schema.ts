import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// @snippet start schema
export default defineSchema({
    scores: defineTable({
        userId: v.string(),
      name: v.string(),
      score: v.number(),
      creationTime:v.number(),
    }),
  });