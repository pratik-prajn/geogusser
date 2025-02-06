"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { FaTrophy } from 'react-icons/fa';

import Link from 'next/link';
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  const topScores = useQuery(api.scores.getTopScores);

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">GeoGuesser India</h1>
          <UserButton />
        </div>
      </nav>

      <main className="container mx-auto corner-blur flex flex-col items-center justify-center min-h-[80vh] text-center px-4 max-w-7xl">
        <h1 className="text-6xl font-bold mb-12">
          Explore India
        </h1>
        <div className="space-y-8 w-full">
          <Link 
            href="/game"
            className="bg-white text-black px-12 py-6 rounded-lg text-2xl font-bold hover:bg-gray-200 transition-colors inline-block"
          >
            Start Game
          </Link>
          <div className="grid grid-cols-1 place-items-center w-full">
            {/* Leaderboard Container */}
            <div className="bg-gray-900 p-6 rounded-xl w-1/3">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 justify-center">
                <FaTrophy className="text-yellow-500" />
                Top Explorers
              </h2>
              <div className="space-y-3">
                {topScores?.map((score, index) => (
                  <div 
                    key={score._id.toString()} 
                    className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FaTrophy className={`text-xl ${
                        index === 0 ? 'text-yellow-500' : 
                        index === 1 ? 'text-gray-400' : 
                        'text-yellow-800'
                      }`} />
                      <span className="font-medium text-lg">{score.name}</span>
                    </div>
                    <span className="text-lg">{score.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden mt-16">
          <div className="slider-track">
            <div className="animate-scroll">
              {[...Array(4)].flatMap(() => [
                "Adventure", "Discovery", "Heritage", "Culture", "Landmarks",
                "Temples", "Palaces", "Mountains", "Rivers", "Traditions"
              ]).map((word, index) => (
                <span 
                  key={index} 
                  className="inline-block px-8 text-2xl font-medium text-gray-300"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
