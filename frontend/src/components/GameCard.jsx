import React from 'react';

const GameCard = ({ game }) => {
    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg cursor-pointer group">
            <div className="h-40 bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
                <span className="text-4xl">
                    {game.game_name.charAt(0)}
                </span>
            </div>
            <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">{game.game_name}</h3>
                <p className="text-gray-300 text-sm">Tap to play</p>
            </div>
        </div>
    );
};

export default GameCard;
