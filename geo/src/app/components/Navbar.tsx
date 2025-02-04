"use client";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";

const Navbar = () => {
    const score = useQuery(api.scores.get);
    // Debug log
    console.log("Scores data:", score);

    if (!score) {
        return (
            <nav className="bg-black p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-xl font-bold">
                        GeoGuesser India
                    </div>
                    <div className="text-white">Loading scores...</div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="bg-black p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">
                    GeoGuesser India
                </div>
                <div className="flex space-x-4">
                    <button className="text-white hover:text-gray-300">
                        New Game
                    </button>
                    {score?.map((score)=>(
                        <div key={score._id.toString()} >
                            <span className="p-4">{score.name}</span>
                            <span>{score.score}</span>
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;