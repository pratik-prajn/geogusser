"use client";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const GameComponent = () => {
    const { user } = useUser();
    const createScore = useMutation(api.scores.createUserScore);

    const saveScore = async (score: number) => {
        if (user) {
            await createScore({
                name: user.firstName || user.username || 'Anonymous',
                score: score
            });
        }
    };

    return (
        <div>
            {/* Add your game UI components here */}
        </div>
    );
};