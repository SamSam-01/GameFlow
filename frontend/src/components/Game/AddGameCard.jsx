import React from 'react';

const AddGameCard = ({ onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white/5 backdrop-blur-md border border-dashed border-white/20 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 shadow-lg cursor-pointer group flex flex-col items-center justify-center min-h-[160px] h-full"
        >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Add Game</h3>
            <p className="text-gray-400 text-sm">Add to Library</p>
        </div>
    );
};

export default AddGameCard;
