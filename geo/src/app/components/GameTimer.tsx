"use client";
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ROUND_TIME = 45;
const BONUS_MULTIPLIER = 10;

interface GameTimerProps {
    isActive: boolean;
    onTimeUp: () => void;
    onScoreUpdate: (timeLeft: number) => void;
}

const GameTimer = ({ isActive, onTimeUp, onScoreUpdate }: GameTimerProps) => {
    const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
    const [showBonus] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            onTimeUp();
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [timeLeft, isActive, onTimeUp]);

    const calculateBonus = (remainingTime: number) => {
        return Math.round(remainingTime * BONUS_MULTIPLIER);
    };

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold text-white">
                    {timeLeft}s
                </div>
                <AnimatePresence>
                    {showBonus && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-green-400 font-bold"
                        >
                            +{calculateBonus(timeLeft)}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};



export default GameTimer;