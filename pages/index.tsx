"use client"

import { useEffect, useState } from 'react';

export default function Home() {
    const [idea, setIdea] = useState<string>('✨ Weaving tales from the threads of imagination...');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('/api')
            .then(res => res.text())
            .then(data => {
                setIdea(data);
                setIsLoading(false);
            })
            .catch(err => {
                setIdea('✗ A shadow blocked the tale: ' + err.message);
                setIsLoading(false);
            });
    }, []);

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Decorative stars */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-10 left-10 text-2xl opacity-40 animate-pulse">✦</div>
                <div className="absolute top-32 right-16 text-xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}>✧</div>
                <div className="absolute bottom-32 left-20 text-2xl opacity-40 animate-pulse" style={{animationDelay: '1s'}}>✦</div>
                <div className="absolute bottom-16 right-12 text-xl opacity-30 animate-pulse" style={{animationDelay: '3s'}}>✧</div>
            </div>

            <div className="w-full max-w-3xl z-10">
                {/* Title with magical styling */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#e8d5c4] to-[#8b5a8f] tracking-wider">
                        ✦ STORY GENERATOR ✦
                    </h1>
                    <div className="h-1 w-24 mx-auto bg-gradient-to-r from-[#8b5a8f] to-[#d4af37] rounded-full mb-4"></div>
                    <p className="text-[#d4af37] text-sm md:text-base italic">Where Magic Meets Imagination</p>
                </div>

                {/* Story box with fantasy styling */}
                <div className="relative">
                    {/* Outer glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#8b5a8f] to-[#d4af37] rounded-lg opacity-20 blur-xl"></div>
                    
                    {/* Main story container */}
                    <div className="relative bg-gradient-to-br from-[#1a0d1f] via-[#2d1750] to-[#1a0d1f] border-2 border-[#8b5a8f] rounded-lg p-8 md:p-10 shadow-2xl backdrop-blur-sm">
                        {/* Top decoration */}
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#8b5a8f]/30">
                            <span className="text-[#d4af37] text-2xl">◆</span>
                            <span className="text-[#d4af37] text-xs tracking-widest italic">TALE UNFOLDS</span>
                            <span className="text-[#d4af37] text-2xl">◆</span>
                        </div>

                        {/* Story text */}
                        <p className={`text-[#e8d5c4] text-lg leading-relaxed whitespace-pre-wrap font-serif transition-opacity duration-500 ${
                            isLoading ? 'opacity-60 animate-pulse' : 'opacity-100'
                        }`}>
                            {idea}
                        </p>

                        {/* Bottom decoration */}
                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#8b5a8f]/30">
                            <span className="text-[#d4af37] text-sm">✦</span>
                            <span className="text-[#d4af37] text-xs tracking-widest">━━━━━</span>
                            <span className="text-[#d4af37] text-sm">✦</span>
                        </div>
                    </div>
                </div>

                {/* Footer text */}
                <div className="text-center mt-8">
                    <p className="text-[#8b5a8f] text-sm italic">
                        {isLoading ? 'The spirits are writing...' : 'Tale written by ancient magic'}
                    </p>
                </div>
            </div>
        </main>
    );
}
