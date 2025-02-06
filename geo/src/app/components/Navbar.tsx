"use client";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import {UserButton, useUser} from "@clerk/nextjs";
import Link from 'next/link';
import { FaHome, FaGamepad, FaTrophy } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface TimerProps {
    initialTime?: number;
    isActive?: boolean;
}

const Navbar = ({ initialTime = 45, isActive = false }: TimerProps) => {
    const { user } = useUser();
    const score = useQuery(api.scores.get, { 
        userId: user?.id || "" 
    });
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [timeLeft, isActive]);

    const handlePlayGame = (e: React.MouseEvent) => {
        e.preventDefault();
        window.location.reload();
        router.push('/game');
    };

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
        <nav className="bg-black p-2 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">
                    GeoGuesser India
                </div>
                <div className="flex-1 flex justify-center items-center space-x-8">
                    <Link href="/">
                        <div className="flex items-center gap-2 text-white hover:text-gray-300">
                            <FaHome className="text-xl" />
                            <span>Home</span>
                        </div>
                    </Link>
                    
                    {isActive && (
                        <div className={`bg-gray-800 px-4 py-2 rounded-lg transition-colors ${
                            timeLeft <= 10 ? 'animate-pulse bg-red-900' : ''
                        }`}>
                            <span className={`text-xl font-bold ${
                                timeLeft <= 10 ? 'text-red-500' : 'text-white'
                            }`}>
                                {timeLeft}s
                            </span>
                        </div>
                    )}

                    <Link href="/game" onClick={handlePlayGame}>
                        <div className="flex items-center gap-2 text-white hover:text-gray-300">
                            <FaGamepad className="text-xl" />
                            <span>Play Game</span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-2 text-white">
                        <FaTrophy className="text-xl text-yellow-500" />
                        <span>{score?.[0]?.score || 0}</span>
                    </div>
                </div>
                <div className="flex-none">
                    <UserButton />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;