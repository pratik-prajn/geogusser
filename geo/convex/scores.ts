import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("scores")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
  },
});

export const createUserScore = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    score: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("scores", {
        userId: args.userId,
      name: args.name,
      score: args.score,
      creationTime: Date.now(),
    });
  },
});

export const saveScore = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    distance: v.number(),
  },
  handler: async (ctx, args) => {
    const calculatedScore = Math.tan(1 / args.distance) * 100; // Multiply by 100 for readable numbers
    
    await ctx.db.insert("scores", {
      userId: args.userId,
      name: args.name,
      score: Math.round(calculatedScore),
      creationTime: Date.now(),
    });
  },
});

export const getUserScore = query({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const userScore = await ctx.db
      .query("scores")
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();
    return userScore;
  },
});

export const updateScore = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    distance: v.float64(),
  },
  handler: async (ctx, args) => {
    const { userId, name, distance } = args;
    const existingScore = await ctx.db
      .query("scores")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    const newScore = Math.tan(1 / distance) * 100;
    const totalScore = existingScore ? existingScore.score + newScore : newScore;

    if (existingScore) {
      await ctx.db.patch(existingScore._id, { score: Math.round(totalScore) });
    } else {
      await ctx.db.insert("scores", {
        userId,
        name,
        score: Math.round(totalScore),
        creationTime: Date.now(),
      });
    }
  },
});

export const getTopScores = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("scores")
      .order("asc", (q) => q.field("score"))
      .take(3);
  },
});