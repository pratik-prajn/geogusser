"use client";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import {UserButton, useUser} from "@clerk/nextjs";
import Link from 'next/link';
import { FaHome, FaGamepad, FaTrophy } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const { user } = useUser();
    const score = useQuery(api.scores.get, { 
        userId: user?.id || "" 
    });
    const router = useRouter();
    
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
                <div className="flex space-x-4 mr-8">
                    <Link 
                        href="/"
                        className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                    >
                        <FaHome className="text-xl" />
                        <span>Home</span>
                    </Link>
                    <Link 
                        href="/game"
                        onClick={handlePlayGame}
                        className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                    >
                        <FaGamepad className="text-xl" />
                        <span>Play Game</span>
                    </Link>
                    <div className="flex items-center gap-2 text-white">
                        <FaTrophy className="text-xl text-yellow-500" />
                        <span>{score?.[0]?.score || 0}</span>
                    </div>
                </div>
                <div className="text-white flex flex-col items-center gap-1 mr-5">
                    <UserButton />
                    <span className="text-sm">{user?.firstName}</span>
                </div>
                
            </div>
            
        </nav>
    );
};

export default Navbar;