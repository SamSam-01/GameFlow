import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameModal = ({ game, onClose }) => {
    const navigate = useNavigate();

    if (!game) return null;

    const handleDownloadRules = () => {
        // Mock download logic
        alert(`Downloading rules for ${game.game_name}...`);
        // In real app: window.open(game.rules_url, '_blank');
    };

    const handleStartChat = () => {
        navigate(`/chat/${game.slug}`);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-surface border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl transform transition-all scale-100">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                        <span className="text-4xl text-white font-bold">{game.game_name.charAt(0)}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">{game.game_name}</h2>
                    <p className="text-gray-400 text-sm">
                        Description of {game.game_name}
                    </p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={handleDownloadRules}
                        className="w-full bg-surface border border-white/10 hover:bg-white/5 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-not-allowed opacity-70"

                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Download Rules (PDF)
                    </button>

                    <button
                        onClick={handleStartChat}
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-indigo-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/25"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                        </svg>
                        Start the Chat
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameModal;
